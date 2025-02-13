import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Image, Pagination, Paper, TextInput, createStyles } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
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
  },
  filters: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.md
  }
}));

/**
 * Component for displaying all users
 * @returns Component for displaying all users
 */
export default function UserTable() {
  const { classes } = useStyles();
  const { users, delUser, incView } = useContext(UsersContext);

  // Track pagination across sessions
  const [page, setPage] = useState(parseInt(localStorage.getItem("page")) || 1);
  const updatePage = (p) => {
    setPage(p);
    localStorage.setItem("page", p.toString());
  }

  // Filter/sort list of users if required
  const [ sortProj, setSortProj ] = useState(false);
  const [ filter, setFilter ] = useState("");
  let filtered = users;
  if (filter !== "") {
    filtered = filtered.filter((user) => user.hero_project.includes(filter));
  }
  if (sortProj) {
    filtered = filtered.toSorted((a, b) => {
      if (a.hero_project > b.hero_project) {
        return 1;
      } else if (a.hero_project < b.hero_project) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  // If filtering, reset page to 1 to avoid invalid pages
  useEffect(() => {
    if (filter !== "") {
      updatePage(1);
    }
  }, [filter]);

  // Clamp page number if user is deleted
  const delHandler = (id) => {
    delUser(id);
    updatePage(Math.min(page, Math.ceil((filtered.length - 1) / 10)));
  };

  // Check if route has admin permissions
  const isAdmin = useMatch("/admin/*");

  return (
    <div className={classes.container}>
      {isAdmin ? (
        <Link to="add"><Button>Add User</Button></Link>
      ) : (
        null
      )}
      <div className={classes.filters}>
        <Checkbox
          label="Sort projects"
          labelPosition="left"
          onChange={(e) => setSortProj(e.currentTarget.checked)}
        />
        <TextInput
          placeholder="Filter projects"
          value={filter}
          onChange={(e) => setFilter(e.currentTarget.value)}
        />
      </div>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice((page - 1) * 10, page * 10).map((user) => (
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
                        <Link to={`view/${user.id}`} target="_blank" rel="noopener noreferrer">
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </button>
                      {isAdmin ? (
                        <>
                          <button>
                            <Link to={`edit/${user.id}`}>
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                          </button>
                          <button onClick={() => delHandler(user.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </>
                      ) : (
                        null
                      )}
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
        onChange={updatePage}
        total={Math.ceil(filtered.length / 10)}
      />
    </div>
  );
}