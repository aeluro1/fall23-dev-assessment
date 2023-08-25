import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext";
import UserPanel from "./UserPanel";

/**
 * Component for user modification form
 * @returns Component for user modification form
 */
export default function EditUser() {
  const { id } = useParams();
  const { users, editUser } = useContext(UsersContext);

  const formHandler = (vals) => {
    editUser(id, {
      ...users.find((user) => user.id === id),
      ...vals
    });
  };

  return (
    <UserPanel
      onSubmit={formHandler}
      id={id}
      edit
    />
  );
}