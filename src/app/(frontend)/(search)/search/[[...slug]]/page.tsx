import { parseUrlToSearchCriteria } from "@/lib/search-utils"
import { SearchParams } from "next/dist/server/request/search-params"

interface SearchPageProps {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<SearchParams>
}

export default async function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const { slug } = await params
  const queryParams = await searchParams

  const searchCriteria = parseUrlToSearchCriteria(slug, queryParams)
  return <pre>{JSON.stringify({ searchCriteria }, null, 2)}</pre>
}
