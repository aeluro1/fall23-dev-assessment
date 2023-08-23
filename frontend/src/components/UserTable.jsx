import { Paper, Space, Title, createStyles } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  container: {
    boxSizing: "border-box",
    minHeight: "100vh",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.gray[0],
    padding: "50px 0"
  },
  title: {
    marginTop: "0",
    marginBottom: theme.spacing.lg
  },
  paper: {
  },
  table: {
    display: "block",
    width: "min(80vw, 1000px)",
    margin: "0 auto",
    borderCollapse: "collapse",
    overflowX: "auto",
    "tr": {
      borderBottom: `1px solid ${theme.colors.gray[3]}`,
      textAlign: "center"
    },
    "tbody tr:last-child": {
      borderBottom: "none"
    },
    "tbody tr:hover": {
      backgroundColor: theme.colors.gray[0]
    },
    "th, td": {
      padding: theme.spacing.xs,
      // whiteSpace: "nowrap",
      width: "fit-content",
      hyphens: "auto",
      overflowWrap: "break-word",
      [theme.fn.smallerThan("sm")]: {
        maxWidth: "100px"
      }
    },
    
  },
  pic: {
    width: "50px",
    height: "50px",
    display: "block",
    objectFit: "cover",
    borderRadius: "20%"
  }
}));

export default function UserTable() {
  const { classes } = useStyles();
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

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/bog/users/" + id)
  //   .then(response => {
  //     console.log(response.data);
  //     setData(response.data)
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   });
  // }, [users]);


  return (
    <div className={classes.container}>
      <Title order={1} className={classes.title}>Volunteers</Title>
      <Paper shadow="md" p="sm" className={classes.paper}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Volunteer</th>
              <th>Picture</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Project</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.name}>
                <td>{user.name}</td>
                <td>
                  <img
                      src={user.avatar}
                      alt={user.name} 
                      className={classes.pic}
                  />
                </td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.rating}</td>
                {user.status ? (
                  <td style={{ color: "green" }}>Active</td>
                ) : (
                  <td style={{ color: "red" }}>Inactive</td>
                )}
                <td>{user.hero_project}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </div>
  );
}