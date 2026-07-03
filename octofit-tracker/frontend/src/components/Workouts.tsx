import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeListResponse } from '../api';

interface Workout {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  durationMinutes: number;
  difficulty?: string;
  exercises?: string[];
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = `${getApiBaseUrl()}/workouts/`;

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const response = await fetch(apiUrl);
        const payload = await response.json();
        setWorkouts(normalizeListResponse<Workout>(payload));
      } catch (err) {
        setError('Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, [apiUrl]);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading workouts…</p>
      ) : (
        <ul>
          {workouts.map((workout, index) => (
            <li key={workout._id ?? workout.id ?? index}>
              <strong>{workout.name}</strong> — {workout.description}
              <div>
                {workout.durationMinutes} minutes · {workout.difficulty}
              </div>
              {workout.exercises?.length ? (
                <div>Exercises: {workout.exercises.join(', ')}</div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
