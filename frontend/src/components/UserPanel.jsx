import { Button, Checkbox, Image, Paper, Text, TextInput, Textarea, createStyles } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext";

const useStyles = createStyles((theme) => ({
  form: {
    width: "min(80vw, 650px)",
    display: "flex",
    gap: theme.spacing.xl,
    justifyContent: "center",
    alignItems: "center"
  },
  formLeft: {
    alignSelf: "start",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    gap: theme.spacing.xs
  },
  formRight: {
    flexGrow: "1",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center"
  },
  fields: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
    gap: theme.spacing.xs,
    justifyContent: "center",
    alignItems: "center"
  },
  submit: {
    display: "flex",
    flexFlow: "row nowrap",
    gap: theme.spacing.xl,
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.lg
  },
  notes: {
    gridColumn: "1 / -1"
  }
}));

/**
 * Component for displaying and editing user information
 * @param {*} props
 * @returns Component for displaying and editing user information
 */
export default function UserPanel({ onSubmit, id, edit }) {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      rating: "",
      hero_project: "",
      status: 0,
      notes: ""
    }
  });

  // Fetch and display user data if an ID is provided
  const { users } = useContext(UsersContext);
  const [ user, setUser ] = useState({});
  useEffect(() => {
    if (id) {
      const user = users.find((user) => user.id === id);
      console.log({ user });
      form.setValues({
        name: user.name,
        phone: user.phone,
        email: user.email,
        rating: user.rating,
        hero_project: user.hero_project,
        status: user.status,
        notes: user.notes
      });
      setUser(user);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  const navigate = useNavigate();
  const formHandler = (vals) => {
    onSubmit(vals);
    navigate("/");
  };

  return (
    <Paper shadow="md" p="sm">
      <form
        onSubmit={form.onSubmit((vals) => formHandler(vals))}
        className={classes.form}
      >
        <div className={classes.formLeft}>
          <Image
            src={id ? user.avatar : ""}
            alt={id ? user.name : "Placeholder"}
            width={100}
            height={100}
            radius="md"
            m="auto"
            fit="contain"
            withPlaceholder={!id}
          />
          {!edit ? (
            <Text fz="sm">Visits: {user.views}</Text>
          ) : (
            null
          )}
        </div>
        <div className={classes.formRight}>
          <div className={classes.fields}>
            <TextInput
              label="Name"
              {...form.getInputProps("name")}
              readOnly={!edit}
            />
            <TextInput
              label="Phone"
              {...form.getInputProps("phone")}
              readOnly={!edit}
            />
            <TextInput
              label="Email"
              {...form.getInputProps("email")}
              readOnly={!edit}
            />
            <TextInput
              label="Rating"
              {...form.getInputProps("rating")}
              readOnly={!edit}
            />
            <TextInput
              label="Project"
              {...form.getInputProps("hero_project")}
              readOnly={!edit}
            />
            <Textarea
              label="Notes"
              {...form.getInputProps("notes")}
              autosize
              minRows={2}
              maxRows={5}
              className={classes.notes}
              readOnly={!edit}
            />
          </div>
          <div className={classes.submit}>
            <Checkbox
              label="Active"
              labelPosition="left"
              {...form.getInputProps("status", { type: "checkbox" })}
              disabled={!edit}
            />
            {edit ? (
              <Button type="submit">OK</Button>
            ) : (
              null
            )}
          </div>
        </div>
      </form>
    </Paper>
  );
}