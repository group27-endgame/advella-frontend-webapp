import { useParams } from "react-router-dom";

export default function Category() {
  const { categoryId } = useParams();
  return <>{categoryId}</>;
}
