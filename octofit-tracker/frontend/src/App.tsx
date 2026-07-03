import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiTarget = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  return (
    <div className="app-shell">
      <header>
        <h1>OctoFit Tracker</h1>
        <p>
          Frontend uses{' '}
          <strong>{codespaceName ? 'Codespaces API routing' : 'localhost fallback'}</strong>.
        </p>
        <p className="warning">
          {codespaceName
            ? `API base URL: ${apiTarget}`
            : 'VITE_CODESPACE_NAME is not defined. Define it in .env.local to use Codespaces URL format.'}
        </p>
        <nav>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>

      <footer>
        <p>
          Use <code>import.meta.env.VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URL support.
        </p>
      </footer>
    </div>
  )
}

export default App
