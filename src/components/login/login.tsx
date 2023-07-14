import "./login.scss";

import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../core/requests";

import DhruvSocial4 from "../../assets/blobs/dhruv_social4.png";
import DhruvSocial5 from "../../assets/blobs/dhruv_social5.png";

import ErrorNotification from "../error/error";

interface ILoginProps {}

const Login: FC<ILoginProps> = ({}) => {
  let username = useRef(null);
  let password = useRef(null);

  let [loginError, setLoginError] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <main className="DHS__Login">
      {loginError ? (
        <ErrorNotification
          error="Error logging in"
          description="The username or passowrd you provided was incorrect"
        />
      ) : null}

      <img className="DHS__Login__Top" src={DhruvSocial5} alt="" />
      <img className="DHS__Login__Bottom" src={DhruvSocial4} alt="" />

      <h1>Welcome Back</h1>

      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
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
