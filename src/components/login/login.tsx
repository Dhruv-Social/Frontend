import "./login.scss";

// Imports
import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../core/requests";

// Importing Imagess
import DhruvSocial4 from "../../assets/blobs/dhruv_social4.png";
import DhruvSocial5 from "../../assets/blobs/dhruv_social5.png";

// Import component
import ErrorNotification from "../error/error";

// Interface for function component
interface ILoginProps {}

// Functional compoenent
const Login: FC<ILoginProps> = ({}) => {
  // Refs to the input fields
  let username = useRef(null);
  let password = useRef(null);

  // State for any log in error
  let [loginError, setLoginError] = useState<boolean>(false);

  // Redirect Variable
  const navigate = useNavigate();

  // Return JSX
  return (
    <main className="DHS__Login">
      {/* CONDITIONAL RENDERING: if ther was a login error, then we return the component else we return null */}
      {loginError ? (
        <ErrorNotification
          error="Error logging in"
          description="The username or password you provided was incorrect"
        />
      ) : null}

      {/* Images on the sides of the Log in page */}
      <img className="DHS__Login__Top" src={DhruvSocial5} alt="" />
      <img className="DHS__Login__Bottom" src={DhruvSocial4} alt="" />

      <h1>Welcome Back</h1>

      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          // On log button clicked (FORM SUBMIT) we call the Handle Log in function
          handleLogin(
            (username.current! as any).value,
            (password.current! as any).value,
            setLoginError,
            navigate
          );
        }}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" ref={username} />
        </div>

        <div>
          <label htmlFor="username">Password</label>
          <input type="password" name="username" ref={password} />
        </div>

        <input className="DHS__Login__Submit" type="submit" value="Login" />
      </form>
    </main>
  );
};

export default Login;
