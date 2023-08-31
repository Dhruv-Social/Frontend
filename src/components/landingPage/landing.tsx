import "./landing.scss";

// Imports
import { FC } from "react";
import { useNavigate } from "react-router-dom";

// Interface for function component
interface ILandingProps {}

// Functional Component
const Landing: FC<ILandingProps> = ({}) => {
  const navigate = useNavigate(); // Redirect variable to redirect the user

  // Functions to change the page Endpoint
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

  // Return JSX
  return (
    <main className="DHS__Landing">
      <div className="DHS__Landing__Left"></div>
      <div className="DHS__Landing__Right">
        <h1>Dhruv's Happening?</h1>
        <h2>Join Dhruv Social Today</h2>
        <button
          className="DHS__Landing__Right__JoinUs"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            // If the user clicks the Join Us button, then we call the "handleSignUpButton" and change then URL
            handleSignUpButton(event);
          }}
        >
          Join Us
        </button>
        <button
          className="DHS__Landing__Right__LogIn"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            // If the user clicks the Log in button, then we call the "handleLogInButton" and change the URL
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
