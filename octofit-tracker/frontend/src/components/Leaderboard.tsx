import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeListResponse } from '../api';

interface LeaderboardEntry {
  _id?: string;
  id?: string;
  rank: number;
  score: number;
  category?: string;
  userId?: { name?: string } | string;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = `${getApiBaseUrl()}/leaderboard/`;

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch(apiUrl);
        const payload = await response.json();
        setEntries(normalizeListResponse<LeaderboardEntry>(payload));
      } catch (err) {
        setError('Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [apiUrl]);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading leaderboard…</p>
      ) : (
        <ol>
          {entries.map((entry, index) => (
            <li key={entry._id ?? entry.id ?? index}>
              #{entry.rank} {typeof entry.userId === 'string' ? entry.userId : entry.userId?.name ?? 'Unknown'} — {entry.score} pts{' '}
              {entry.category ? `(${entry.category})` : ''}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
