import "./login.scss";

import { FC, useRef } from "react";

import DhruvSocial4 from "../../assets/blobs/dhruv_social4.png";
import DhruvSocial5 from "../../assets/blobs/dhruv_social5.png";

interface ILoginProps {}

const Login: FC<ILoginProps> = ({}) => {
  let username = useRef(null);
  let password = useRef(null);

  let handleLogin = () => {
    let userLoginData = {
      username: (username.current! as any).value,
      password: (password.current! as any).value,
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: userLoginData.username,
      password: userLoginData.password,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/dhruvsocial/auth/loginAuth", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === false) {
          return console.log("Incorrent Login");
        }

        sessionStorage.setItem("token", result.accessToken);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <main className="DHS__Login">
      <img className="DHS__Login__Top" src={DhruvSocial5} alt="" />
      <img className="DHS__Login__Bottom" src={DhruvSocial4} alt="" />

      <h1>Welcome Back</h1>

      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleLogin();
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
