import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image, Pagination, Paper, createStyles } from "@mantine/core";
import { useContext, useState } from "react";
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
    gap: theme.spacing.sm,
    "button": {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      padding: "0",
      cursor: "pointer"
    },
    "a": {
      color: "inherit"
    }
  }
}));

export default function UserTable() {
  const { classes } = useStyles();
  const { users, delUser, incView } = useContext(UsersContext);
  const [page, setPage] = useState(1);

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
              {users.slice((page - 1) * 10, page * 10).map((user) => (
                <tr key={user.name}>
                  <td>{user.name}</td>
                  <td>
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={50}
                      height={50}
                      radius="md"
                      m="auto"
                      fit="contain"
                      withPlaceholder={!user.avatar}
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
                      <button onClick={() => incView(user.id)}>
                        <Link to={`/view/${user.id}`} target="_blank" rel="noopener noreferrer">
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </button>
                      <button>
                        <Link to={`/edit/${user.id}`}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </button>
                      <button onClick={() => delUser(user.id)}>
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
      <Pagination
        value={page}
        onChange={setPage}
        total={Math.ceil(users.length / 10)}
      />
    </div>
  );
}