import "./login.scss";

import { FC } from "react";

import DhruvSocial4 from "../../assets/blobs/dhruv_social4.png";
import DhruvSocial5 from "../../assets/blobs/dhruv_social5.png";

interface ILoginProps {}

const Login: FC<ILoginProps> = ({}) => {
  return (
    <main className="DHS__Login">
      <img className="DHS__Login__Top" src={DhruvSocial5} alt="" />
      <img className="DHS__Login__Bottom" src={DhruvSocial4} alt="" />

      <h1>Welcome Back</h1>

      <form action="" onSubmit={() => {}}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
        </div>

        <div>
          <label htmlFor="username">Password</label>
          <input type="text" name="username" />
        </div>

        <input className="DHS__Login__Submit" type="submit" value="Login" />
      </form>
    </main>
  );
};

export default Login;
