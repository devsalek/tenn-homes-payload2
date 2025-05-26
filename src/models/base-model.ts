import { getPayloadClient } from "@/db/client"
import { CollectionSlug, Where } from "payload"
import { cache } from "react"
import { notFound } from "next/navigation"

// Define a base document type that matches Payload's requirements
interface BaseDocument {
  id: string | number
  createdAt?: string | Date
  updatedAt?: string | Date
  [key: string]: any
}

interface BaseInstance<T, D> {
  new (data: T): BaseModel<BaseDocument, D>
  collectionSlug: CollectionSlug
  decoratorClass: new (data: T) => D
}

interface BaseDecorator<T> {
  new (data: T): any
}

export abstract class BaseModel<T extends BaseDocument = BaseDocument, D = BaseDecorator<T>> {
  static collectionSlug: CollectionSlug
  static decoratorClass: new (data: any) => any
  data: T

  constructor(data: T) {
    this.data = data
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

    return data.docs.map((item) => new self.decoratorClass(item))
  })

  static async create<T extends BaseDocument = any, D = any>(
    this: BaseInstance<T, D>,
    data: Omit<T, "id" | "updatedAt" | "createdAt">,
  ): Promise<D> {
    const client = await BaseModel.client()
    const createdData = (await client.create({
      collection: this.collectionSlug,
      data,
    })) as T

    // Return decorated instance if decorator class exists
    return new this.decoratorClass(createdData) as D
  }

  static async find<T extends BaseDocument = any, D = any>(
    this: {
      new (data: T): BaseModel<T, D>
      collectionSlug: CollectionSlug
      decoratorClass: new (data: T) => D
    },
    id: string,
  ): Promise<D | null> {
    try {
      const data = await BaseModel._findById(this, id)
      return new this.decoratorClass(data as T) as D
    } catch (error) {
      // Handle error if needed
      return null
    }
  }

  /**
   *
   * @param this
   * @param id
   * @returns T or throws a 404 error if not found
   */
  static async findOrFail<T extends BaseDocument = any, D = any>(
    this: BaseInstance<T, D>,
    id: string,
  ): Promise<D> {
    try {
      const data = await BaseModel._findById(this, id)
      return new this.decoratorClass(data as T) as D
    } catch (error) {
      // Handle error if needed
      notFound()
    }
  }

  static async where<T extends BaseDocument = any, D = any>(
    this: BaseInstance<T, D>,
    where: Where = {},
  ): Promise<D[]> {
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

  toString(): string {
    return JSON.stringify(this.data, null, 2)
  }
}
