import LoginForm from "../components/LoginForm";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={css.container}>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
