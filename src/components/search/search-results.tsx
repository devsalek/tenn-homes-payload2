"use client"
import { PropertySearchCard } from "./property-search-card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { SearchResultsFooter } from "./search-results-footer"

export const SearchResults = () => {
  const { searchCriteria, searchResults, updateSearch } = useSearchResults()
  console.log("SearchParams:", searchCriteria)

  if (searchResults === null) {
    return <div className="p-4">No properties found.</div>
  }

  const currentPage = searchResults.page || 1
  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-4 border-b">
        <p className="text-sm text-muted-foreground">
          {searchResults.limit} of {searchResults.totalDocs} homes
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {searchResults.docs.map((property) => (
            <PropertySearchCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 p-4 border-t bg-white">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={updateSearch({ page: searchResults.prevPage ?? 1 })}
                className={!searchResults.hasPrevPage ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: searchResults.totalPages }, (_, i) => i + 1).map((pageNumber) => {
              const isCurrentPage = pageNumber === searchResults.page
              const showPage =
                pageNumber === 1 ||
                pageNumber === searchResults.totalPages ||
                Math.abs(pageNumber - currentPage) <= 2

              if (!showPage) {
                if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
                return null
              }

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={updateSearch({ page: pageNumber })}
                    isActive={isCurrentPage}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem>
              <PaginationNext
                href={updateSearch({ page: searchResults.nextPage ?? searchResults.totalPages })}
                className={!searchResults.hasNextPage ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <SearchResultsFooter />
    </div>
  )
}
