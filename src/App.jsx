import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfiles() {
      const { data, error } = await supabase
        .from('dummy_profiles')
        .select('username, bio, is_active')

      if (error) {
        console.error('Error fetching profiles:', error)
      } else {
        setProfiles(data)
      }
      setLoading(false)
    }

    fetchProfiles()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="App">
      <h1>Profiles</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Bio</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.username}>
              <td>{profile.username}</td>
              <td>{profile.bio}</td>
              <td>{profile.is_active ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
