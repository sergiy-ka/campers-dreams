import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/operations";
import css from "./LoginForm.module.css";
import toast from "react-hot-toast";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(login(values))
          .unwrap()
          .then(() => {
            toast.success("Login successful!", {
              duration: 2500,
              position: "top-center",
            });
          })
          .catch(() => {
            toast.error("Login failed. Please check your credentials.", {
              duration: 2500,
              position: "top-center",
            });
          });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.loginForm}>
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className={css.inputField}
          />
          <ErrorMessage
            name="email"
            component="div"
            className={css.errorMessage}
          />

          <Field
            type="password"
            name="password"
            placeholder="Password"
            className={css.inputField}
          />
          <ErrorMessage
            name="password"
            component="div"
            className={css.errorMessage}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={css.submitButton}
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
