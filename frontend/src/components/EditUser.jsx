import { Button, Checkbox, Paper, TextInput, createStyles } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext";

const useStyles = createStyles((theme) => ({
  form: {
    width: "min(80vw, 650px)",
    display: "flex",
    gap: theme.spacing.xl,
    justifyContent: "center",
    alignItems: "center"
  },
  pic: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "20%",
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
  }
}));

export default function EditUser() {
  const { classes } = useStyles();
  const { id } = useParams();
  const [ user, setUser ] = useState({});
  const { editUser } = useContext(UsersContext);
  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      rating: "",
      hero_project: "",
      status: 0
    }
  });
  const navigate = useNavigate();

  const formHandler = (vals) => {
    editUser(id, {
      ...user,
      ...vals
    });
    navigate("/");
  };
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/bog/users/${id}`)
    .then(response => {
      const data = response.data
      form.setValues({
        name: data.name,
        phone: data.phone,
        email: data.email,
        rating: data.rating,
        hero_project: data.hero_project,
        status: data.status
      })
      setUser(data)
    })
    .catch((error) => {
      console.log(error);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Paper shadow="md" p="sm">
      <form
        onSubmit={form.onSubmit((vals) => formHandler(vals))}
        className={classes.form}
      >
        <div className={classes.pic}>
          <img src={user.avatar} alt={user.name} className={classes.pic} />
        </div>
        <div className={classes.inputs}>
          <div className={classes.fields}>
            <TextInput
              label="Name"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Phone"
              {...form.getInputProps("phone")}
            />
            <TextInput
              label="Email"
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Rating"
              {...form.getInputProps("rating")}
            />
            <TextInput
              label="Project"
              {...form.getInputProps("hero_project")}
            />
          </div>
          <div className={classes.submit}>
            <Checkbox
                label="Active"
                labelPosition="left"
                {...form.getInputProps("status", { type: "checkbox" })}
              />
              <Button type="submit">OK</Button>
          </div>
        </div>
      </form>
    </Paper>
  );
}