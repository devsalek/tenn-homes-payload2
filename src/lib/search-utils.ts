import { FindOptions, SearchCriteria } from "@/types"

export type ParseUrlOutput = {
  query: string
  filters: Record<string, any>
  options: FindOptions
}

export function parseUrlToSearchCriteria(
  pathSegments: string[] = [],
  urlQueryParams: Record<string, string | string[] | undefined>,
): ParseUrlOutput {
  // Extract location from path if present
  const query = pathSegments[0] || ""
  const propertyType = pathSegments[1] || undefined

  // Parse query parameters
  const filters: Record<string, any> = {}

  // Handle property type
  if (propertyType) {
    filters["property-type"] = propertyType
  } else if (urlQueryParams["property-type"]) {
    filters["property-type"] = urlQueryParams["property-type"]
  }

  // Handle price range
  if (urlQueryParams["min-price"]) {
    filters["min-price"] = parseInt(urlQueryParams["min-price"] as string) || undefined
  }
  if (urlQueryParams["max-price"]) {
    filters["max-price"] = parseInt(urlQueryParams["max-price"] as string) || undefined
  }

  // Handle bedrooms
  if (urlQueryParams["min-beds"]) {
    filters["min-beds"] = parseInt(urlQueryParams["min-beds"] as string) || undefined
  }
  if (urlQueryParams["max-beds"]) {
    filters["max-beds"] = parseInt(urlQueryParams["max-beds"] as string) || undefined
  }

  // Handle bathrooms
  if (urlQueryParams["min-baths"]) {
    filters["min-baths"] = parseFloat(urlQueryParams["min-baths"] as string) || undefined
  }

  // Clean up undefined values
  Object.keys(filters).forEach((key) => {
    if (filters[key] === undefined) {
      delete filters[key]
    }
  })

  return {
    query,
    filters,
    options: {
      sort: (urlQueryParams.sort as string) || "relevance",
      page: parseInt((urlQueryParams.page as string) || "1"),
      limit: parseInt((urlQueryParams.limit as string) || "12"),
    },
  }
}

export function buildSearchUrl(searchCriteria: Partial<SearchCriteria>): string {
  const { query = "", filters = {}, sort, page, limit } = searchCriteria

  // Build path segments
  const pathSegments = ["/search"]

  if (query) {
    pathSegments.push(encodeURIComponent(query.toLowerCase().replace(/\s+/g, "-")))
  }

  if (filters["property-type"]) {
    pathSegments.push(filters["property-type"])
  }

  const path = pathSegments.join("/")

  // Build query parameters
  const params = new URLSearchParams()

  // Add filters as query params (except property-type which is in path)
  Object.entries(filters).forEach(([key, value]) => {
    if (key !== "property-type" && value !== undefined) {
      params.set(key, value.toString())
    }
  })

  // Add other parameters
  if (sort && sort !== "relevance") {
    params.set("sort", sort)
  }

  if (page && page > 1) {
    params.set("page", page.toString())
  }

  if (limit && limit !== 12) {
    params.set("limit", limit.toString())
  }

  const queryString = params.toString()
  return queryString ? `${path}?${queryString}` : path
}
