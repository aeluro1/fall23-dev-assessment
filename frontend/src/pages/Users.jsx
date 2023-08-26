import { Title, createStyles } from "@mantine/core";
import { Link, Outlet, useMatch } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "start",
    alignItems: "center",
    gap: theme.spacing.lg,
    backgroundColor: theme.colors.gray[0],
    padding: "50px 0"
  },
  title: {
    margin: "0"
  },
  link: {
    textDecoration: "inherit"
  }
}));

/**
 * Component for page displaying users
 * @returns Component for page displaying users
 */
export default function Users() {
  const { classes } = useStyles();
  const isAdmin = useMatch("/admin/*");

  return (
    <div className={classes.container}>
      <Title order={1} className={classes.title}>
        Volunteers (
          <Link to={isAdmin ? "/viewer" : "/admin"} className={classes.link}>
            {isAdmin ? "Admin" : "Viewer"}
          </Link>
        )
      </Title>
      <Outlet />
    </div>
  );
}