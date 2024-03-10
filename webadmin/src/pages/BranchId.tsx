import { useParams } from "react-router-dom";

export default function BranchId() {
  const { id } = useParams();
  return <div>{id}</div>;
}
