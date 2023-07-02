import { FC } from "react";

import Navbar from "../components/navbar/navbar";
import Login from "../components/login/login";

interface ILoginPageProps {}

const LoginPage: FC<ILoginPageProps> = ({}) => {
  return (
    <>
      <Navbar />
      <Login />
    </>
  );
};

export default LoginPage;
