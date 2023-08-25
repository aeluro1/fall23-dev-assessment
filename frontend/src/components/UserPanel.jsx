import { Button, Checkbox, Image, Paper, TextInput, Textarea, createStyles } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  form: {
    width: "min(80vw, 650px)",
    display: "flex",
    gap: theme.spacing.xl,
    justifyContent: "center",
    alignItems: "center"
  },
  pic: {
    alignSelf: "start"
  },
  inputs: {
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

export default function UserPanel({ onSubmit, initUser, edit }) {
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
  useEffect(() => {
    if (initUser) {
      form.setValues({
        name: initUser.name,
        phone: initUser.phone,
        email: initUser.email,
        rating: initUser.rating,
        hero_project: initUser.hero_project,
        status: initUser.status,
        notes: initUser.notes
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initUser]);
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
        <div className={classes.pic}>
          <Image
            src={initUser ? initUser.avatar : ""}
            alt={initUser ? initUser.name : "Placeholder"}
            width={100}
            height={100}
            radius="md"
            m="auto"
            fit="contain"
            withPlaceholder={!initUser}
          />
        </div>
        <div className={classes.inputs}>
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