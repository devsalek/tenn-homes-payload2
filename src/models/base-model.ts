/**
 * @fileoverview Base ActiveRecord implementation for Payload CMS collections
 *
 * This file provides an ActiveRecord pattern implementation for Payload CMS,
 * allowing for object-oriented database operations with type safety and
 * automatic casting of common field types.
 */

import { CollectionSlug, getPayload, PaginatedDocs, SelectType, Where } from "payload"
import config from "@payload-config"
import { cache } from "react"
import { Options } from "node_modules/payload/dist/collections/operations/local/find"
import { notFound } from "next/navigation"

/**
 * Type for functions that cast values from database to JavaScript types
 * @template V - The input value type
 */
export type CastFunction<V> = (value: V) => any

/**
 * Type for data input that excludes auto-generated fields
 * @template T - The document type
 */
export type DataInput<T> = Omit<T, "id" | "updatedAt" | "createdAt">

/**
 * Base interface for all documents with required fields
 */
interface BaseDocument {
  id: string | number
  createdAt?: string | Date
  updatedAt?: string | Date
}

/**
 * Casts string dates to Date objects
 * @param value - The string date value
 * @returns Date object
 */
function castDate(value: string) {
  return new Date(value)
}

/**
 * Abstract base class implementing the ActiveRecord pattern for Payload CMS collections
 *
 * Provides CRUD operations, attribute management, and type casting for collection documents.
 * Extends this class to create model classes for specific Payload collections.
 *
 * @template T - The document type extending BaseDocument
 *
 * @example
 * ```typescript
 * export class PropertyModel extends ActiveRecord<Property> {
 *   override collection: CollectionSlug = "properties"
 *
 *   get url() {
 *     return `/property/${this.get('id')}`
 *   }
 * }
 * ```
 */
export abstract class ActiveRecord<T extends BaseDocument = BaseDocument> {
  /** The Payload collection slug this model represents */
  abstract collection: CollectionSlug

  /** Field casting configuration for automatic type conversion */
  protected casts: Record<string, CastFunction<any>> = {
    createdAt: castDate,
    updatedAt: castDate,
  }

  /** Internal storage for document attributes */
  private attributes: T | null = null

  /** Tracks which fields have been modified */
  private dirtyFields: Record<string, boolean> = {}

  // =====================
  // ATTRIBUTE MANAGEMENT
  // =====================

  /**
   * Sets the document attributes and applies type casting
   * @param data - The document data from Payload
   * @returns This instance for method chaining
   */
  setAttributes(data: T): typeof this {
    this.attributes = data
    this.castAttributes()

    return this
  }

  /**
   * Gets the raw document attributes
   * @returns The document attributes
   * @throws Error if attributes haven't been set
   */
  getAttributes(): NonNullable<T> {
    return this.attributes as T
  }

  /**
   * Gets a specific attribute value
   * @param key - The attribute key
   * @returns The attribute value or null
   * @throws Error if attributes haven't been set
   */
  get<K extends keyof T>(key: K): T[K] {
    if (!this.attributes) {
      throw new Error("attributes have not been set")
    }
    return this.attributes[key]
  }

  /**
   * Sets a specific attribute value and marks it as dirty
   * @param key - The attribute key
   * @param value - The new value
   * @throws Error if attributes haven't been set
   */
  set<K extends keyof T>(key: K, value: NonNullable<T>[K]) {
    if (!this.attributes) {
      throw new Error("attributes have not been set")
    }
    const oldValue = this.attributes[key]
    if (oldValue === value) return
    this.dirtyFields[key as string] = true
    this.attributes[key] = value
  }

  /**
   * Applies configured type casting to document attributes
   * Automatically converts database values to appropriate JavaScript types
   */
  async castAttributes() {
    if (!this.attributes) return
    if (this.casts === null) return
    Object.keys(this.attributes!).map((key) => {
      if (!this.casts![key] || !this.attributes) return
      const value = this.get(key as keyof T)
      this.attributes[key as keyof T] = this.casts![key](value)
    })
  }

  // =====================
  // QUERY METHODS
  // =====================

  /**
   * Finds a document by ID
   * @param id - The document ID
   * @param options - Query options (depth, select, etc.)
   * @returns Promise resolving to a new instance with the found document
   */
  async find(
    id: string | number,
    options: Omit<Options<CollectionSlug, SelectType>, "collection"> = { depth: 2 },
  ): Promise<this> {
    const client = await this.getClient()
    const result = (await client.findByID({
      collection: this.collection,
      id,
      ...options,
    })) as T

    const clone = this.clone()
    clone.setAttributes(result)

    return clone
  }

  /**
   * Finds a document by ID or throws a 404 error
   * @param id - The document ID
   * @param options - Query options (depth, select, etc.)
   * @returns Promise resolving to this instance with the found document
   * @throws Calls Next.js notFound() if document doesn't exist
   */
  async findOrFail(
    id: BaseDocument["id"],
    options: Omit<Options<CollectionSlug, SelectType>, "collection"> = { depth: 2 },
  ): Promise<this> {
    const client = await this.getClient()
    try {
      const result = (await client.findByID({
        collection: this.collection,
        id,
        depth: 0,
        ...options,
      })) as T

      this.setAttributes(result)

      return this
    } catch (error) {
      notFound()
    }
  }

  /**
   * Finds multiple documents with caching
   * @param options - Query options (where, limit, sort, etc.)
   * @returns Promise resolving to paginated results with hydrated documents
   */
  findMany = cache(
    async (options: Omit<Options<CollectionSlug, SelectType>, "collection"> = {}) => {
      const client = await this.getClient()
      const results = (await client.find({
        ...options,
        collection: this.collection,
      })) as PaginatedDocs<T>

      return {
        ...results,
        docs: new RecordCollection(results.docs).hydrate(this),
      }
    },
  )

  /**
   * Finds an existing document or creates a new one
   * @param data - The document data to create if not found
   * @param field - The field to search by
   * @returns Promise resolving to existing or newly created document
   */
  findOrCreate = async (data: DataInput<T>, field: keyof DataInput<T>) => {
    const contacts = await this.findMany({
      where: { [field]: { equals: data[field] } },
    })

    if (contacts.docs.count() > 0) {
      return contacts.docs.first()
    } else {
      return await this.create(data as DataInput<T>)
    }
  }

  // =====================
  // CRUD OPERATIONS
  // =====================

  /**
   * Creates a new document in the collection
   * @param data - The document data (excluding auto-generated fields)
   * @returns Promise resolving to a new instance with the created document
   */
  async create(data: DataInput<T>): Promise<this> {
    const client = await this.getClient()
    const createdData = (await client.create({
      collection: this.collection,
      data,
    })) as T

    const clone = this.clone()
    clone.setAttributes(createdData)

    return clone
  }

  /**
   * Updates the current document with new data
   * @param updates - The fields to update
   * @returns Promise resolving to a new instance with updated data
   */
  async save(updates: DataInput<T>) {
    if (this.attributes === null) return this
    console.log(`Saving the ${this.collection} collection...`)
    const client = await this.getClient()
    const rawData = await this.find(this.attributes.id, { depth: 0 })
    const data = { ...rawData, ...updates } as DataInput<T>
    const updatedData = (await client.update({
      collection: this.collection,
      id: this.attributes.id,
      data,
    })) as T

    const clone = this.clone()
    clone.setAttributes(updatedData)

    return clone
  }

  // =====================
  // UTILITY METHODS
  // =====================

  /**
   * Creates a new instance of this model class
   * @returns A new instance of the same type
   */
  clone(): this {
    return new (this.constructor as { new (): ActiveRecord<T> })() as this
  }

  /**
   * Gets the Payload client instance
   * @private
   * @returns Promise resolving to Payload client
   */
  private async getClient() {
    return await getPayload({ config })
  }
}

/**
 * Collection wrapper for managing multiple ActiveRecord instances
 *
 * Provides array-like operations and utilities for working with
 * collections of documents returned from Payload queries.
 *
 * @template T - The document type extending BaseDocument
 */
class RecordCollection<T extends BaseDocument = BaseDocument> {
  /** Array of hydrated ActiveRecord instances */
  records: ActiveRecord<T>[] = []

  /**
   * Creates a new RecordCollection
   * @param docs - Raw document data from Payload
   */
  constructor(private docs: T[]) {}

  /**
   * Converts raw documents to ActiveRecord instances
   * @param instance - Model instance to use as template for cloning
   * @returns This collection for method chaining
   */
  hydrate(instance: ActiveRecord<T>): typeof this {
    this.records = this.docs.map((d: T) => {
      const clone = new (instance.constructor as { new (): ActiveRecord<T> })()
      clone.setAttributes(d)
      return clone
    })
    return this
  }

  /**
   * Converts collection to array of raw document data
   * @returns Array of document attributes
   */
  toArray(): T[] {
    return [...(this.records.map((r) => r.getAttributes()) as T[])]
  }

  /**
   * Converts collection to JSON string
   * @returns JSON representation of the records
   */
  toJson(): string {
    return JSON.stringify(this.records, null, 2)
  }

  /**
   * Gets the first record in the collection
   * @returns The first ActiveRecord instance
   */
  first(): ActiveRecord<T> {
    return this.records.at(0) as ActiveRecord<T>
  }

  /**
   * Gets the number of records in the collection
   * @returns The record count
   */
  count(): number {
    return this.records.length
  }

  /**
   * Iterates over each record in the collection
   * @param callbackfn - Function to call for each record
   */
  each(callbackfn: (value: ActiveRecord<T>, index: number, array: ActiveRecord<T>[]) => void) {
    return this.records.forEach(callbackfn)
  }

  /**
   * Makes the collection iterable
   * @returns Iterator over ActiveRecord instances
   */
  *[Symbol.iterator](): Iterator<ActiveRecord<T>> {
    for (const key in this.records) {
      if (this.records && this.records.hasOwnProperty(key)) {
        yield this.records[key] as ActiveRecord<T>
      }
    }
  }
}
