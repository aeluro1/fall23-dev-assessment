import { Button, Checkbox, Paper, TextInput, createStyles } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/bog/users/${id}`)
    .then(response => {
      setUser(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }, [id]);

  return (
    <Paper shadow="md" p="sm">
      <div className={classes.form}>
        <div className={classes.pic}>
          <img src={user.avatar} alt={user.name} className={classes.pic} />
        </div>
        <div className={classes.inputs}>
          <div className={classes.fields}>
            <TextInput
              label="Name"
              value={user.name}
            />
            <TextInput
              label="Phone"
              value={user.phone}
            />
            <TextInput
              label="Email"
              value={user.email}
            />
            <TextInput
              label="Rating"
              value={user.rating}
            />
            <TextInput
              label="Project"
            />

          </div>
          <div className={classes.submit}>
            <Checkbox
                label="Active"
                labelPosition="left"
                checked={user.status}
              />
              <Button>OK</Button>
          </div>
        </div>
      </div>
    </Paper>
  );
}