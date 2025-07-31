import { useState, useEffect } from "react";

export default function useWeeklyChallenge(workoutStats) {
  const [challenge, setChallenge] = useState(null); // null means not loaded yet
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchChallenge() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/generateChallenge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workoutStats: workoutStats || {} }),
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setChallenge(data.challenge || null);
      } catch (err) {
        setError(err.message || "Failed to fetch challenge");
        setChallenge(null);
      } finally {
        setLoading(false);
      }
    }

    fetchChallenge();
  }, []);

  return { challenge, loading, error };
}
