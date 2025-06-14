import { SearchHeader } from "@/components/search/search-header"
import { SearchResults } from "@/components/search/search-results"
import { SearchResultsMap } from "@/components/search/search-results-map"
import { local } from "@/repository"
import { PaginatedDocs, Where } from "payload"
import { Property } from "@/payload-types"
import { parseUrlToSearchCriteria } from "@/lib/search-utils"
import { SearchResultsProvider } from "../../search-results-provider"
import { Header } from "@/app/(frontend)/_layouts/header"

interface SearchPageProps {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { slug } = await params
  const queryParams = await searchParams

  const searchCriteria = parseUrlToSearchCriteria(slug, queryParams)
  console.log("Search Criteria:", searchCriteria)

  const where: Where = {}
  where.listingStatus = { equals: searchCriteria.filters["property-status"] || "forsale" }

  if (searchCriteria.filters.city) {
    where["location.city_slug"] = { equals: searchCriteria.filters.city }
  }
  if (searchCriteria.filters.zip) {
    where["location.zip"] = { equals: searchCriteria.filters.zip }
  }
  if (searchCriteria.filters["min-price"] || searchCriteria.filters["max-price"]) {
    where.price = {
      greater_than_equal: searchCriteria.filters["min-price"] || 0,
      less_than_equal: searchCriteria.filters["max-price"] || 10000000,
    }
  }
  if (searchCriteria.filters["min-beds"]) {
    where["details.bedrooms"] = {
      greater_than_equal: searchCriteria.filters["min-beds"] || 6,
    }
  }
  if (searchCriteria.filters["min-baths"]) {
    where["details.bathrooms"] = {
      greater_than_equal: searchCriteria.filters["min-baths"] || 6,
    }
  }
  if (searchCriteria.filters["property-type"]) {
    where["details.propertyType"] = {
      equals: searchCriteria.filters["property-type"] || "house",
    }
  }

  const results = await local.property.getAll(where, searchCriteria.options)

  const initialData = {
    ...results,
    docs: results?.docs.map((d) => d.original),
  } as PaginatedDocs<Property>

  return (
    <SearchResultsProvider initialData={initialData} searchCriteria={searchCriteria}>
      <div className="h-auto lg:h-screen grid grid-cols-12 grid-rows-[auto_1fr] w-full overflow-hidden">
        <div className="col-span-12 h-36 bg-white">
          <Header />
          <SearchHeader />
        </div>
        <div className="flex col-span-12">
          <div className="w-full lg:w-1/3 lg:min-w-[570px] relative border-t">
            <div className="relative lg:absolute top-0 w-full bg-white overflow-y-auto h-full">
              <SearchResults />
            </div>
          </div>
          <div className="hidden lg:flex flex-1 w-full lg:w-2/3 bg-gray-300">
            <SearchResultsMap />
          </div>
        </div>
      </div>
    </SearchResultsProvider>
  )
}
