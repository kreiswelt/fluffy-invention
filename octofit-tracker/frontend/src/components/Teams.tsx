import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeListResponse } from '../api';

interface Team {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  captainId?: { name?: string } | string;
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = `${getApiBaseUrl()}/teams/`;

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch(apiUrl);
        const payload = await response.json();
        setTeams(normalizeListResponse<Team>(payload));
      } catch (err) {
        setError('Unable to load teams.');
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, [apiUrl]);

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading teams…</p>
      ) : (
        <ul>
          {teams.map((team, index) => (
            <li key={team._id ?? team.id ?? index}>
              <strong>{team.name}</strong> — {team.description}
              <div>Captain: {typeof team.captainId === 'string' ? team.captainId : team.captainId?.name ?? 'Unknown'}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
