import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Paper, createStyles } from "@mantine/core";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    gap: theme.spacing.lg
  },
  tableContainer: {
    overflowX: "auto",
    width: "min(80vw, 1000px)"
  },
  table: {
    minWidth: "100%",
    margin: "0 auto",
    borderCollapse: "collapse",
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
      width: "fit-content",
      overflowWrap: "break-word",
      [theme.fn.smallerThan("sm")]: {
        maxWidth: "120px"
      }
    },
    
  },
  pic: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "20%"
  },
  mods: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.sm
  },
  modBtn: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    padding: "0",
    cursor: "pointer"
  }
}));

export default function UserTable() {
  const { classes } = useStyles();
  const { users, delUser } = useContext(UsersContext);

  const delUserHandler = (id) => {
    delUser(id);
  };

  return (
    <div className={classes.container}>
      <Link to="/add"><Button>Add User</Button></Link>
      <Paper shadow="md" p="sm">
        <div className={classes.tableContainer}>
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
                <th>Modify</th>
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
                  <td>
                    <div className={classes.mods}>
                      <button className={classes.modBtn}>
                        <Link to={`/edit/${user.id}`} style={{ color: "inherit" }}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </button>
                      <button onClick={() => delUserHandler(user.id)} className={classes.modBtn}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Paper>
    </div>
  );
}