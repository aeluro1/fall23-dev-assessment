import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const UsersContext = createContext();

export default function UsersContextProvider(props) {
  const [ users, setUsers ] = useState([]);

  const delUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUser = (id, newUser) => {
    setUsers(users.map((user) => user.id === id ? newUser : user));
  };

  const addUser = (newUser) => {
    setUsers([
      ...users,
      {
        ...newUser,
        id: uuidv4()
      }
    ]);
  };

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
    <UsersContext.Provider value={{ users, delUser, editUser, addUser }}>
      {props.children}
    </UsersContext.Provider>
  );
}