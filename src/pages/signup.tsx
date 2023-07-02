import { FC } from "react";

import Navbar from "../components/navbar/navbar";
import Signup from "../components/signup/signup";

interface ISignUpPageProps {}

const SignupPage: FC<ISignUpPageProps> = ({}) => {
  return (
    <>
      <Navbar />
      <Signup />
    </>
  );
};

export default SignupPage;
