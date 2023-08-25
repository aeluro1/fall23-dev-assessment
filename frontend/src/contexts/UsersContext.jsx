import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const UsersContext = createContext();

export default function UsersContextProvider(props) {
  const [ users, setUsers ] = useState(JSON.parse(localStorage.getItem("users")) || []);

  const delUser = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    axios.delete(`http://localhost:5000/api/bog/users/${id}`)
    .then((res) => {
      setUsers(newUsers);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const editUser = (id, newUser) => {
    const newUsers = users.map((user) => user.id === id ? newUser : user);
    axios.put(`http://localhost:5000/api/bog/users/${id}`, newUser)
    .then((res) => {
      setUsers(newUsers);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const addUser = (newUser) => {
    newUser.id = uuidv4()
    const newUsers = [
      ...users,
      newUser
    ];
    axios.post(`http://localhost:5000/api/bog/users`, newUser)
    .then((res) => {
      setUsers(newUsers);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const incView = (id) => {
    setUsers(users.map((user) => user.id === id ? (
      {
        ...user,
        views: user.views ? user.views + 1 : 1
      }
    ) : (
      user
    )));
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/bog/users")
    .then((res) => {
      setUsers(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <UsersContext.Provider value={{ users, delUser, editUser, addUser, incView }}>
      {props.children}
    </UsersContext.Provider>
  );
}