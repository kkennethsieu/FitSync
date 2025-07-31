import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

export function useExerciseCatalog() {
  const [catalog, setCatalog] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      const [{ data: catalogData }, { data: typeData }] = await Promise.all([
        supabase.from("exercise_catalog").select("*"),
        supabase.from("exerciseType").select("*"),
      ]);

      if (catalogData) setCatalog(catalogData);
      if (typeData) setTypes(typeData);
      setLoading(false);
    };

    fetchCatalog();
  }, []);

  return { catalog, types, loading };
}
