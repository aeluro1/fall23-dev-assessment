import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext";
import UserPanel from "./UserPanel";

export default function EditUser() {
  const { id } = useParams();
  const [ user, setUser ] = useState({});
  const { editUser } = useContext(UsersContext);

  const formHandler = (vals) => {
    editUser(id, {
      ...user,
      ...vals
    })
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bog/users/${id}`)
    .then(response => {
      setUser(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <UserPanel
      onSubmit={formHandler}
      initUser={user}
    />
  );
}