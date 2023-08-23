import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UsersContext = createContext();

export default function UsersContextProvider(props) {
  const [ users, setUsers ] = useState([]);

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
    <UsersContext.Provider value={{ users }}>
      {props.children}
    </UsersContext.Provider>
  );
}