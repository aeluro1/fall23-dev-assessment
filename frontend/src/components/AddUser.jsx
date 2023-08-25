import { useContext } from "react";
import UserPanel from "./UserPanel";
import { UsersContext } from "../contexts/UsersContext";

/**
 * Component for user creation form
 * @returns Component for user creation form
 */
export default function AddUser() {
  const { addUser } = useContext(UsersContext);

  const formHandler = (vals) => {
    const newUser = {
      avatar: "",
      notes: "",
      ...vals
    };
    addUser(newUser);
  };

  return (
    <UserPanel
      onSubmit={formHandler}
      edit
    />
  );
}