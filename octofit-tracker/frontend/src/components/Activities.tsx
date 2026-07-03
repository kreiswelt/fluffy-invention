import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeListResponse } from '../api';

interface Activity {
  _id?: string;
  id?: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  notes?: string;
  completedAt?: string;
  userId?: { name?: string } | string;
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = `${getApiBaseUrl()}/activities/`;

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch(apiUrl);
        const payload = await response.json();
        setActivities(normalizeListResponse<Activity>(payload));
      } catch (err) {
        setError('Unable to load activities.');
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [apiUrl]);

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading activities…</p>
      ) : (
        <ul>
          {activities.map((activity, index) => (
            <li key={activity._id ?? activity.id ?? index}>
              <strong>{activity.type}</strong> for {activity.durationMinutes} minutes,{' '}
              {activity.caloriesBurned} calories
              {activity.distanceKm ? `, ${activity.distanceKm} km` : ''}
              <div>
                User: {typeof activity.userId === 'string' ? activity.userId : activity.userId?.name ?? 'Unknown'}
              </div>
              {activity.notes && <div>Notes: {activity.notes}</div>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
