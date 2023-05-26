import React from "react";
import styles from "./Login.module.scss";
// mui
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
// custom hooks
import { useForm } from "react-hook-form";
// router
import { Navigate } from "react-router-dom";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "user@example.com", // mock
      password: "Qwerty12345", 
    },
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    try {
      if (!data.payload) {
        throw new Error();
      }

      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
    } catch (err) {
      alert("Cannot auth");
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Type your email" })}
          fullWidth
        />
        <TextField
          type="password"
          className={styles.field}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Type your password" })}
          label="Password"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Sign In
        </Button>
      </form>
    </Paper>
  );
};
