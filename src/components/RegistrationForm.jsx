import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../redux/auth/operations";
import css from "./RegistrationForm.module.css";
import toast from "react-hot-toast";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(7, "Too Short!").required("Required"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={RegistrationSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(register(values))
          .unwrap()
          .then(() => {
            toast.success("Registration successful!", {
              duration: 2500,
              position: "top-center",
            });
          })
          .catch(() => {
            toast.error("Registration failed. Please try again or try login.", {
              duration: 2500,
              position: "top-center",
            });
          });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.registrationForm}>
          <Field
            type="text"
            name="name"
            placeholder="Name"
            className={css.inputField}
          />
          <ErrorMessage
            name="name"
            component="div"
            className={css.errorMessage}
          />

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
            Signup
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
