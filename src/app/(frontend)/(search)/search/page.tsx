import { SearchHeader } from "@/components/search/search-header"
import { SearchResults } from "@/components/search/search-results"
import { SearchResultsMap } from "@/components/search/search-results-map"

export default async function SearchPage() {
  return (
    <div className="h-screen bg-background flex flex-col border-t">
      <SearchHeader />

      <div className="flex-1 flex">
        <div className="w-full lg:w-1/3 bg-white border-r">
          <SearchResults />
        </div>

        <div className="hidden lg:block lg:w-2/3">
          <SearchResultsMap />
        </div>
      </div>
    </div>
  )
}
