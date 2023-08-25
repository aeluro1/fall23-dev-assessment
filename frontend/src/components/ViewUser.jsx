import { useParams } from "react-router-dom";
import UserPanel from "./UserPanel";

/**
 * Component for viewing user details
 * @returns Component for viewing user details
 */
export default function ViewUser() {
  const { id } = useParams();

  return (
    <UserPanel
      id={id}
    />
  );
}