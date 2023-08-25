import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserPanel from "./UserPanel";

export default function ViewUser() {
  const { id } = useParams();
  const [ user, setUser ] = useState({});

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
      onSubmit={null}
      initUser={user}
    />
  );
}