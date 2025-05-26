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

  // You can add more methods here that operate on the data
  // For example, a method to convert the data to a specific format
  toJSON(): string {
    return JSON.stringify(this.data, null, 2)
  }
}
