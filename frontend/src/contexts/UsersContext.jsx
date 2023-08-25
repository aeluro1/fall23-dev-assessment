import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const UsersContext = createContext();

/**
 * Context provider for propagating user data across components
 * @param {*} props 
 * @returns ContextProvider
 */
export default function UsersContextProvider(props) {
  // Fetch session data
  const [ users, setUsers ] = useState(JSON.parse(localStorage.getItem("users")) || []);

  /**
   * Delete user by ID via database DELETE request
   * @param {*} id 
   */
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

  /**
   * Edit user by ID via database PUT request
   * @param {*} id 
   * @param {*} newUser 
   */
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

  /**
   * Add user via database POST request, assigning new ID
   * @param {*} newUser 
   */
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

  /**
   * Increments the number of client-side views accumulated by a user
   * @param {*} id
   */
  const incView = (id) => {
    setUsers(users.map((user) => user.id === id ? (
      {
        ...user,
        views: user.views ? user.views + 1 : 1 // Initialize user.views if it DNE
      }
    ) : (
      user
    )));
  }

  // Load users from database into context provider upon website visit
  useEffect(() => {
    axios.get("http://localhost:5000/api/bog/users")
    .then((res) => {
      setUsers(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  // Save users in local storage upon changes to data
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <UsersContext.Provider value={{ users, delUser, editUser, addUser, incView }}>
      {props.children}
    </UsersContext.Provider>
  );
}