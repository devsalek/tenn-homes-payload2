// components/search/SearchResultsProvider.tsx
"use client"

import { buildSearchUrl, SearchCriteria, SearchFilterKeys } from "@/lib/search-utils"
import { Location, Property } from "@/payload-types"
import { PropertyDecorator } from "@/repository/property/property-decorator"
import { SearchCriteriaInput } from "@/types"
import { useRouter } from "next/navigation"
import { PaginatedDocs } from "payload"
import { createContext, useContext, ReactNode, useState } from "react"

interface SearchResultsContextType {
  searchCriteria: SearchCriteria
  searchResults: PaginatedDocs<Property>
  query?: Location
  isLoading: boolean
}

const SearchResultsContext = createContext<SearchResultsContextType | undefined>(undefined)

interface SearchResultsProviderProps {
  children: ReactNode
  initialData: PaginatedDocs<Property>
  searchCriteria: SearchCriteria
  query?: Location
}

export function SearchResultsProvider({
  children,
  initialData,
  searchCriteria,
  query,
}: SearchResultsProviderProps) {
  const value: SearchResultsContextType = {
    query,
    searchCriteria,
    searchResults: initialData,
    isLoading: false, // You might want to add loading state management
  }

  return <SearchResultsContext.Provider value={value}>{children}</SearchResultsContext.Provider>
}

// Custom hook to use the search results context
export function useSearchResults() {
  const context = useContext(SearchResultsContext)
  const router = useRouter()

  if (context === undefined) {
    throw new Error("useSearchResults must be used within a SearchResultsProvider")
  }

  const updateSearch =
    (context: SearchResultsContextType) => (updates: Partial<SearchCriteriaInput>) => {
      const currentCriteria = context.searchCriteria
      const newCriteria = { ...currentCriteria, ...updates }
      const newUrl = buildSearchUrl(newCriteria)
      return newUrl
    }

  const setFilters = (filters: Partial<Record<SearchFilterKeys, any>>) => {
    router.push(updateSearch(context)({ filters }))
  }

  // decorate search results
  const docs = (context.searchResults?.docs ?? []).map((doc) => new PropertyDecorator(doc))

  return {
    ...context,
    setFilters,
    updateSearch: updateSearch(context),
    searchResults: { ...context.searchResults, docs } as PaginatedDocs<PropertyDecorator>,
  }
}
