import { getPayloadClient } from "@/db/client"
import { CollectionSlug, Where } from "payload"

// Define a base document type that matches Payload's requirements
interface BaseDocument {
  id: string | number
  createdAt?: string | Date
  updatedAt?: string | Date
  [key: string]: any
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
    // Return a proxy to intercept property access
    return new Proxy(this, {
      set(target, property, value) {
        // If the property exists on the data object, set it there
        if (typeof property === "string" && property in target.data) {
          ;(target.data as any)[property] = value
          return true
        }
        // Otherwise, set it on the instance itself
        ;(target as any)[property] = value
        return true
      },
      get(target, property) {
        // If accessing a data property, return it from data
        if (typeof property === "string" && property in target.data && !(property in target)) {
          return (target.data as any)[property]
        }
        // Otherwise return the property from the instance
        return (target as any)[property]
      },
    })
  }

  static client = async () => {
    return getPayloadClient()
  }

  static async create<T extends BaseDocument = any, D = any>(
    this: {
      new (data: T): BaseModel<T, D>
      collectionSlug: CollectionSlug
      decoratorClass: new (data: T) => D
    },
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
  ): Promise<D> {
    const client = await BaseModel.client()
    const data = await client.findByID({
      collection: this.collectionSlug,
      id,
    })

    // Return decorated instance if decorator class exists
    return new this.decoratorClass(data as T) as D
  }

  static async where<T extends BaseDocument = any, D = any>(
    this: {
      new (data: T): BaseModel<T, D>
      collectionSlug: CollectionSlug
      decoratorClass: new (data: T) => D
    },
    where: Where = {},
  ): Promise<D[]> {
    const client = await BaseModel.client()
    const data = await client.find({
      collection: this.collectionSlug,
      where,
      limit: 100,
      pagination: false,
      sort: "-createdAt",
    })

    return data.docs.map((item) => new this.decoratorClass!(item as T)) as D[]
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

  toJSON(): T {
    return this.data
  }
}
