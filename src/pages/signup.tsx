import { FC } from "react";

import Navbar from "../components/navbar/navbar";
import Signup from "../components/signup/signup";

interface ISignUpPageProps {}

const SignupPage: FC<ISignUpPageProps> = ({}) => {
  return (
    <>
      <Navbar loggedIn={false} />
      <Signup />
    </>
  );
};

export default SignupPage;
