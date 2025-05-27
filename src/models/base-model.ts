import { getPayloadClient } from "@/db/client"
import { CollectionSlug, Where } from "payload"
import { cache } from "react"
import { notFound } from "next/navigation"

interface BaseDocument {
  id: string | number
  createdAt?: string | Date
  updatedAt?: string | Date
}

interface BaseInstance<T, M> {
  new (data: T): M
  collectionSlug: CollectionSlug
}

export abstract class BaseModel<T extends BaseDocument = BaseDocument> {
  static collectionSlug: CollectionSlug
  data: T

  constructor(data: T) {
    this.data = data
  }

  get id(): string | number {
    return this.data.id
  }

  static client = async () => {
    return getPayloadClient()
  }

  private static _findById = cache(async (self: BaseInstance<any, any>, id: string) => {
    const client = await BaseModel.client()
    return await client.findByID({
      collection: self.collectionSlug,
      id,
    })
  })

  private static _find = cache(async (self: BaseInstance<any, any>, where: Where = {}) => {
    const client = await BaseModel.client()
    const data = await client.find({
      collection: self.collectionSlug,
      where,
      limit: 100,
      pagination: false,
      sort: "-createdAt",
    })

    return data.docs.map((item) => new self(item))
  })

  static async create<T extends BaseDocument = BaseDocument, M extends BaseModel<T> = BaseModel<T>>(
    this: BaseInstance<T, M>,
    data: Omit<T, "id" | "updatedAt" | "createdAt">,
  ): Promise<M> {
    const client = await BaseModel.client()
    const createdData = (await client.create({
      collection: this.collectionSlug,
      data,
    })) as T

    // Return model instance
    return new this(createdData)
  }

  static async find<T extends BaseDocument = BaseDocument, M extends BaseModel<T> = BaseModel<T>>(
    this: BaseInstance<T, M>,
    id: string,
  ): Promise<M | null> {
    try {
      const data = await BaseModel._findById(this, id)
      return new this(data as T)
    } catch (error) {
      // Handle error if needed
      return null
    }
  }

  static async findOrFail<
    T extends BaseDocument = BaseDocument,
    M extends BaseModel<T> = BaseModel<T>,
  >(this: BaseInstance<T, M>, id: string): Promise<M> {
    try {
      const data = await BaseModel._findById(this, id)
      return new this(data as T)
    } catch (error) {
      // Handle error if needed
      notFound()
    }
  }

  static async where<T extends BaseDocument = BaseDocument, M extends BaseModel<T> = BaseModel<T>>(
    this: BaseInstance<T, M>,
    where: Where = {},
  ): Promise<M[]> {
    return await BaseModel._find(this, where)
  }

  async save(): Promise<this> {
    const client = await BaseModel.client()

    // Update existing record
    const result = await client.update({
      collection: (this.constructor as any).collectionSlug,
      id: this.data.id,
      data: this.data,
    })

    // Extract the updated document from the result
    this.data = result.doc as T

    return this
  }

  // Bulk update method
  update(updates: Partial<T>): this {
    Object.assign(this.data, updates)
    return this
  }

  set<K extends keyof T>(key: K, value: T[K]): this {
    this.data[key] = value
    return this
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.data[key]
  }

  toString(): string {
    return JSON.stringify(this.data, null, 2)
  }
}
