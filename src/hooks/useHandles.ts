import { useState, useEffect, useCallback } from 'react';
import type { Handle } from '@/types';

export function useHandles() {
  const [handles, setHandles] = useState<Handle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHandles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/handles.json');
      if (!response.ok) {
        throw new Error('Failed to fetch handles');
      }
      const data = await response.json();
      setHandles(data.handles || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHandles();
  }, [fetchHandles]);

  return { handles, loading, error, refetch: fetchHandles };
}
