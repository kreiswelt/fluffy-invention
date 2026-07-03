export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';
};

export const normalizeListResponse = <T>(payload: unknown): T[] => {
  if (!payload) {
    return [];
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  if (typeof payload === 'object' && payload !== null) {
    const record = payload as Record<string, unknown>;

    if (Array.isArray(record.data)) {
      return record.data as T[];
    }

    const collectionKeys = ['users', 'activities', 'teams', 'leaderboard', 'workouts'];
    for (const key of collectionKeys) {
      if (Array.isArray(record[key])) {
        return record[key] as T[];
      }
    }

    const firstArray = Object.values(record).find((value) => Array.isArray(value));
    if (Array.isArray(firstArray)) {
      return firstArray as T[];
    }
  }

  return [];
};
