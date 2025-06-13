// components/search/SearchResultsProvider.tsx
"use client"

import { buildSearchUrl, ParseUrlOutput } from "@/lib/search-utils"
import { Property } from "@/payload-types"
import { PropertyDecorator } from "@/repository/property/property-decorator"
import { SearchCriteria } from "@/types"
import { PaginatedDocs } from "payload"
import { createContext, useContext, ReactNode } from "react"

interface SearchResultsContextType {
  searchCriteria: ParseUrlOutput
  searchResults: PaginatedDocs<Property>
  isLoading: boolean
}

const SearchResultsContext = createContext<SearchResultsContextType | undefined>(undefined)

interface SearchResultsProviderProps {
  children: ReactNode
  initialData: PaginatedDocs<Property>
  searchCriteria: ParseUrlOutput
}

export function SearchResultsProvider({
  children,
  initialData,
  searchCriteria,
}: SearchResultsProviderProps) {
  const value: SearchResultsContextType = {
    searchCriteria,
    searchResults: initialData,
    isLoading: false, // You might want to add loading state management
  }

  return <SearchResultsContext.Provider value={value}>{children}</SearchResultsContext.Provider>
}

// Custom hook to use the search results context
export function useSearchResults() {
  const updateSearch = (updates: Partial<SearchCriteria>) => {
    const currentCriteria = getCurrentSearchCriteria() // Get from context
    const newCriteria = { ...currentCriteria, ...updates }
    const newUrl = buildSearchUrl(newCriteria)
    return newUrl
  }
  const context = useContext(SearchResultsContext)

  if (context === undefined) {
    throw new Error("useSearchResults must be used within a SearchResultsProvider")
  }

  // decorate search results
  const docs = context.searchResults.docs.map((doc) => new PropertyDecorator(doc))

  return { ...context, updateSearch, searchResults: { ...context.searchResults, docs } }
}

// Helper function to get current search criteria (this was the missing function)
export function getCurrentSearchCriteria(): ParseUrlOutput {
  const { searchCriteria } = useSearchResults()
  return searchCriteria
}
