import { SearchHeader } from "@/components/search/search-header"
import { SearchResults } from "@/components/search/search-results"
import { SearchResultsMap } from "@/components/search/search-results-map"
import { local } from "@/repository"
import { PaginatedDocs } from "payload"
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
  const results = await local.property.getAll({}, searchCriteria.options)

  const initialData = {
    ...results,
    docs: results?.docs.map((d) => d.original),
  } as PaginatedDocs<Property>

  return (
    <SearchResultsProvider initialData={initialData} searchCriteria={searchCriteria}>
      <div className="h-auto lg:h-screen grid grid-cols-12 grid-rows-[auto_1fr] w-full overflow-hidden">
        <div className="col-span-12 h-36">
          <Header />
          <SearchHeader />
        </div>
        <div className="col-span-12 lg:col-span-4 relative border-t">
          <div className="relative lg:absolute top-0 bg-white overflow-y-auto h-full">
            <SearchResults />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 bg-gray-300">
          <SearchResultsMap />
        </div>
      </div>
    </SearchResultsProvider>
  )
}
