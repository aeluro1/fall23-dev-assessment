import { useParams } from "react-router-dom";
import UserPanel from "./UserPanel";

export default function ViewUser() {
  const { id } = useParams();

  return (
    <UserPanel
      id={id}
    />
  );
}