import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UsersContext = createContext();

export default function UsersContextProvider(props) {
  const [ users, setUsers ] = useState([]);

  const delUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  }

  const editUser = (id, newUser) => {
    setUsers(users.map((user) => user.id === id ? newUser : user));
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/bog/users")
    .then((response) => {
      setUsers(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <UsersContext.Provider value={{ users, delUser, editUser }}>
      {props.children}
    </UsersContext.Provider>
  );
}