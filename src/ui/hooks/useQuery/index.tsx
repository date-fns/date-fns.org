import { useRef, useState } from 'preact/hooks'

export function useQuery() {
  const searchRef = useRef<HTMLInputElement>(null)
  const [query, setQueryState] = useState('')

  function setQuery(str: string) {
    setQueryState(str)
    searchRef.current?.focus()
  }

  return { query, setQuery, searchRef }
}
