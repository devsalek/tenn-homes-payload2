export class BaseDecorator<T> {
  constructor(private data: T) {}

  // Access to raw data
  get original(): T {
    return this.data
  }

  // Alternative method-based approach
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

  get url(): string {
    return ""
  }
}
