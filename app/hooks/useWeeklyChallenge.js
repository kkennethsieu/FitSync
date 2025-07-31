import { useState, useEffect } from "react";

export default function useWeeklyChallenge(workoutStats) {
  const [challenge, setChallenge] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Always fetch challenge, pass empty object if workoutStats missing
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
        setChallenge(data.challenge || "");
      } catch (err) {
        setError(err.message || "Failed to fetch challenge");
      } finally {
        setLoading(false);
      }
    }

    fetchChallenge();
  }, []);

  return { challenge, loading, error };
}
