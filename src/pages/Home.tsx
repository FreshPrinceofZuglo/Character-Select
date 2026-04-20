import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import type { Character, CharacterApiResponse } from '../types/character'
import styles from './Home.module.css'

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)
  const nameFromUrl = searchParams.get('name') || ''

  const [searchInput, setSearchInput] = useState<string>(nameFromUrl)
  const [characters, setCharacters] = useState<Character[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // wait until user stops typing before updating the URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput === nameFromUrl) return

      const newParams = new URLSearchParams(searchParams)
      if (searchInput) {
        newParams.set('name', searchInput)
      } else {
        newParams.delete('name')
      }
      newParams.delete('page')
      setSearchParams(newParams, { replace: true })
    }, 200)

    return () => clearTimeout(timer)
  }, [searchInput, nameFromUrl, searchParams, setSearchParams])

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        params.set('page', String(page))
        if (nameFromUrl) params.set('name', nameFromUrl)

        const response = await fetch(
          `https://rickandmortyapi.com/api/character?${params.toString()}`
        )

        // API returns 404 when a search has no matches
        if (response.status === 404) {
          setCharacters([])
          setTotalPages(1)
          return
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: CharacterApiResponse = await response.json()
        setCharacters(data.results)
        setTotalPages(data.info.pages)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setCharacters([])
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [page, nameFromUrl])

  function goToPage(newPage: number) {
    const newParams = new URLSearchParams(searchParams)
    if (newPage === 1) {
      newParams.delete('page')
    } else {
      newParams.set('page', String(newPage))
    }
    setSearchParams(newParams)
  }

  function getStatusClass(status: string) {
    if (status === 'Alive') return styles.statusAlive
    if (status === 'Dead') return styles.statusDead
    return styles.statusUnknown
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Character Information Panel</h1>
          <p className={styles.subtitle}>
            {totalPages > 1 ? `Page ${page} of ${totalPages}` : 'Browse the multiverse'}
          </p>
        </div>

        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {error && <p className={styles.state}>Error: {error}</p>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Avatar</th>
              <th>Name</th>
              <th>Species</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((character) => (
              <tr key={character.id}>
                <td>
                  <Link to={`/character/${character.id}`}>
                    <img src={character.image} alt={character.name} className={styles.avatar} />
                  </Link>
                </td>
                <td>
                  <Link to={`/character/${character.id}`} className={styles.nameLink}>
                    {character.name}
                  </Link>
                </td>
                <td>{character.species}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(character.status)}`}>
                    {character.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <p className={styles.state}>Loading...</p>}

        {!loading && characters.length === 0 && !error && (
          <p className={styles.state}>
            {nameFromUrl
              ? `No characters match "${nameFromUrl}"`
              : 'No characters found'}
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => goToPage(page - 1)}
            disabled={page === 1 || loading}
          >
            ‹ Previous
          </button>
          <span className={styles.pageIndicator}>
            Page {page} of {totalPages}
          </span>
          <button
            className={styles.pageButton}
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages || loading}
          >
            Next ›
          </button>
        </div>
      )}
    </div>
  )
}

export default Home