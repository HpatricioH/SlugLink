'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce'

interface SearchProps {
  pathname: string
}

export default function SearchLinks({ pathname }: SearchProps) {
  const searchParams = useSearchParams()
  const replacePath = useRouter()

  const handleSearch = useDebouncedCallback((e: string) => {
    const params = new URLSearchParams(searchParams)

    if (e) {
      params.set('query', e)
    } else {
      params.delete('query')
    }
    replacePath.replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <form >
      <input
        className='input'
        placeholder="Search..."
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
      />
    </form>
  )
}