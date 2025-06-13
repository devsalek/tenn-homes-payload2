import { SearchHeader } from "@/components/search/search-header"
import { SearchResults } from "@/components/search/search-results"
import { SearchResultsMap } from "@/components/search/search-results-map"
import { local } from "@/repository"
import { PaginatedDocs } from "payload"
import { Property } from "@/payload-types"
import { parseUrlToSearchCriteria } from "@/lib/search-utils"
import { SearchResultsProvider } from "../../search-results-provider"

interface SearchPageProps {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { slug } = await params
  const queryParams = await searchParams

  const searchCriteria = parseUrlToSearchCriteria(slug, queryParams)
  console.log("Search Criteria:", searchCriteria)
  const results = await local.property.getAll({}, searchCriteria.options)

  const initialData = {
    ...results,
    docs: results?.docs.map((d) => d.original),
  } as PaginatedDocs<Property>

  return (
    <SearchResultsProvider initialData={initialData} searchCriteria={searchCriteria}>
      <div className="h-screen bg-background flex flex-col border-t relative">
        <div className="w-full">
          <SearchHeader />
        </div>

        <div className="flex-1 flex">
          <div className="w-full lg:w-1/3 bg-white border-r min-w-lg">
            <SearchResults />
          </div>

          <div className="hidden lg:block lg:w-2/3">
            <SearchResultsMap />
          </div>
        </div>
      </div>
    </SearchResultsProvider>
  )
}
