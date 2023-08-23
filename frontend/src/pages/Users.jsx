import { Title, createStyles } from "@mantine/core";
import { Outlet } from "react-router-dom";

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
  }
}));

export default function Users() {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <Title order={1} className={classes.title}>Volunteers</Title>
      <Outlet />
    </div>
  );
}