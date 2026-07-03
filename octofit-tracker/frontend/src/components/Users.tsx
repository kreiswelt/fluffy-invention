import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeListResponse } from '../api';

interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = `${getApiBaseUrl()}/users/`;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(apiUrl);
        const payload = await response.json();
        setUsers(normalizeListResponse<User>(payload));
      } catch (err) {
        setError('Unable to load users.');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [apiUrl]);

  return (
    <section>
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading users…</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={user._id ?? user.id ?? index}>
              <strong>{user.name}</strong> ({user.role}) — {user.email}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
