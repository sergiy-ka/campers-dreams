import RegistrationForm from "../components/RegistrationForm";
import css from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <div className={css.container}>
      <h1>Signup</h1>
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;
