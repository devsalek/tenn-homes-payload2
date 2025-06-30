import { SearchParams } from "next/dist/server/request/search-params"

export type SearchFilters = Record<
  SearchFilterKeys,
  string | number | string[] | number[] | null
>

export type FindOptions = {
  limit: number
  page: number
  sort: string
  depth: number
  pagination: boolean
}
export type SearchCriteria = {
  query: string
  filters: SearchFilters
  options: FindOptions
}

export type SearchQueryTypes = "city" | "zip"
export type SearchFilterKeys =
  | "city"
  | "zip"
  | "property-type"
  | "property-status"
  | "min-price"
  | "max-price"
  | "min-beds"
  | "min-baths"

export function parseUrlToSearchCriteria(
  pathSegments: string[] = [],
  urlQueryParams: SearchParams,
) {
  const [query, queryValue] = pathSegments as [
    SearchQueryTypes,
    string,
  ]

  const validQueries = ["city", "zip"]

  const filters: SearchFilters = {
    city: null,
    zip: null,
    "property-type": [],
    "property-status": "",
    "min-price": null,
    "max-price": null,
    "min-beds": null,
    "min-baths": null,
  }

  if (query && queryValue && validQueries.includes(query)) {
    filters[query] = queryValue
  }

  filters["property-type"] = getParameterValues(
    urlQueryParams["property-type"],
    null,
  )
  filters["property-status"] = getSingleParameterValue(
    urlQueryParams["property-status"],
    null,
  )

  filters["min-price"] = getSingleParameterValue(
    urlQueryParams["min-price"],
    null,
  )
  filters["max-price"] = getSingleParameterValue(
    urlQueryParams["max-price"],
    null,
  )
  filters["min-beds"] = getSingleParameterValue(
    urlQueryParams["min-beds"],
    null,
  )
  filters["min-baths"] = getSingleParameterValue(
    urlQueryParams["min-baths"],
    null,
  )

  Object.keys(filters).forEach((key) => {
    if (filters[key as SearchFilterKeys] === null) {
      delete filters[key as SearchFilterKeys]
    }
  })

  const options = {
    sort: getSingleParameterValue(
      urlQueryParams["sort"],
      "relevance",
    ) as string,
    page: getSingleParameterValue(
      urlQueryParams["page"],
      1,
    ) as number,
    limit: getSingleParameterValue(
      urlQueryParams["limit"],
      12,
    ) as number,
  }

  return {
    query,
    filters,
    options,
  }
}

function getParameterValues(
  param: string | string[] | undefined,
  defaultValue: string[] | null,
): string[] | null {
  if (Array.isArray(param)) {
    return param.length > 0 ? param : defaultValue
  }
  return typeof param === "string" ? [param] : defaultValue
}

function getSingleParameterValue(
  param: string | string[] | undefined,
  defaultValue: string | number | null,
): string | number | null {
  if (Array.isArray(param)) {
    return param.length > 0 ? param[0] : defaultValue
  }
  return typeof param === "string" ? param : defaultValue
}
