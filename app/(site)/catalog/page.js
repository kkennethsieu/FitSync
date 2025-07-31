// app/catalog/page.jsx
import CatalogClientPage from "./CatalogClientPage";
import { loadCatalogPageData } from "@/lib/loadCatalogPageData";
export default async function Page() {
  const { exerciseCatalog, exerciseType } = await loadCatalogPageData();
  return (
    <CatalogClientPage
      exerciseCatalog={exerciseCatalog}
      exerciseType={exerciseType}
    />
  );
}
