import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Character as CharacterType } from '../types/character'
import styles from './Character.module.css'

function Character() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [character, setCharacter] = useState<CharacterType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCharacter() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: CharacterType = await response.json()
        setCharacter(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCharacter()
  }, [id])

  function getStatusClass(status: string) {
    if (status === 'Alive') return styles.statusAlive
    if (status === 'Dead') return styles.statusDead
    return styles.statusUnknown
  }

  if (loading) return <p className={styles.state}>Loading character...</p>
  if (error) return <p className={styles.state}>Error: {error}</p>
  if (!character) return <p className={styles.state}>No character found.</p>

  return (
    <div>
      <button className={styles.backButton} onClick={() => navigate('/')}>
        ← Back to list
      </button>

      <div className={styles.card}>
        <img
          src={character.image}
          alt={character.name}
          className={styles.image}
        />
        <div className={styles.info}>
          <h1 className={styles.name}>{character.name}</h1>
          <p className={styles.subtitle}>Character #{character.id}</p>

          <table className={styles.details}>
            <tbody>
              <tr>
                <td className={styles.detailLabel}>Status</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(character.status)}`}>
                    {character.status}
                  </span>
                </td>
              </tr>
              <tr>
                <td className={styles.detailLabel}>Species</td>
                <td>{character.species}</td>
              </tr>
              <tr>
                <td className={styles.detailLabel}>Gender</td>
                <td>{character.gender}</td>
              </tr>
              <tr>
                <td className={styles.detailLabel}>Origin</td>
                <td>{character.origin.name}</td>
              </tr>
              <tr>
                <td className={styles.detailLabel}>Location</td>
                <td>{character.location.name}</td>
              </tr>
              <tr>
                <td className={styles.detailLabel}>Episodes</td>
                <td>{character.episode.length} appearance(s)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Character