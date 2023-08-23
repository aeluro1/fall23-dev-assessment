import { Paper, TextInput, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  form: {
    display: "flex"
  }
}));

export default function EditUser() {
  const { classes } = useStyles();
  return (
    <Paper shadow="md" p="sm">
      <div className={classes.form}>
        <TextInput
          label="Name"
        />
        <TextInput
          label="Phone"
        />
        <TextInput
          label="Email"
        />
        <TextInput
          label="Rating"
        />
        <TextInput
          label="Status"
        />
        <TextInput
          label="Project"
        />
      </div>
    </Paper>
  );
}