import "./landing.scss";

import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface ILandingProps {}

const Landing: FC<ILandingProps> = ({}) => {
  const navigate = useNavigate();

  const handleLogInButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    navigate("/login");
  };

  const handleSignUpButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    navigate("/signUp");
  };

  return (
    <main className="DHS__Landing">
      <div className="DHS__Landing__Left"></div>
      <div className="DHS__Landing__Right">
        <h1>Dhruv's Happening?</h1>
        <h2>Join Dhruv Social Today</h2>
        <button
          className="DHS__Landing__Right__JoinUs"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            handleSignUpButton(event);
          }}
        >
          Join Us
        </button>
        <button
          className="DHS__Landing__Right__LogIn"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            handleLogInButton(event);
          }}
        >
          Log In
        </button>
      </div>
    </main>
  );
};

export default Landing;
