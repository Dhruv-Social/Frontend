import "./navbar.scss";

// Imports
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMagnifyingGlass,
  faMessage,
  faFilm,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

// Import Images
import DhruvSocial from "../../assets/icon/dhruv_social.png";

// Interface for function component
interface INavbarProps {}

// Functional Component
const Navbar: FC<INavbarProps> = ({}) => {
  // Getting the refreshToken from the session storage
  const refreshToken = sessionStorage.getItem("refreshToken");
  // State for if the user is logged in or now
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  // On state change, if the refreshToken is NOT null, then we know the user is logged in, else we set the state to false
  useEffect(() => {
    refreshToken !== null ? setUserLoggedIn(true) : setUserLoggedIn(false);
  }, [userLoggedIn]);

  // Conitional rendering, if the user is logged in , then we show them the logged in navbar, else we show them the not logged in navbar
  return <>{userLoggedIn ? <_NavbarLoggedIn /> : <_NavbarNotLoggedIn />}</>;
};

// Interface for function component
interface _INavbarLoggedIn {}

// Functional Component
const _NavbarLoggedIn: FC<_INavbarLoggedIn> = ({}) => {
  const navigate = useNavigate();

  // State for if the navbar is open
  const [navOpen, setNavOpen] = useState<boolean>(false);

  // Function to handle clicking the home button
  const handleHomeButton = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    navigate("/home");
  };

  // Function to handle log out
  const logOut = () => {
    sessionStorage.removeItem("refreshToken");
    navigate("/");
  };

  // Return JSX
  return (
    <>
      <nav className="DHS__Navbar__LoggedIn">
        {/* Dhruv Social Logo */}
        <img
          src={DhruvSocial}
          alt=""
          onClick={(event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
            handleHomeButton(event);
          }}
        />

        <div
          onClick={() => {
            // This event is when the user clicks the button to open the navbar
            let entireNav = document.getElementById(
              "DHS__Navbar__LoggedIn__Nav"
            );

            // Get dom references
            let bar1 = document.getElementById("DHS__Navbar__LoggedIn__Bar1");
            let bar2 = document.getElementById("DHS__Navbar__LoggedIn__Bar2");
            let bar3 = document.getElementById("DHS__Navbar__LoggedIn__Bar3");

            // If the navbar is currently open, then we close it
            if (navOpen) {
              entireNav!.style.width = "0vw";

              // Bar 1
              bar1!.style.transform = "rotate(0deg)";
              bar1!.style.top = "0rem";

              // Bar 2
              bar2!.style.width = "90%";

              // Bar 3
              bar3!.style.transform = "rotate(0deg)";
              bar3!.style.bottom = "0rem";

              setNavOpen((navOpen) => !navOpen);
            } else {
              // else we open it
              entireNav!.style.width = "100vw";

              // Bar 1
              bar1!.style.transform = "rotate(-45deg)";
              bar1!.style.top = "1.1rem";

              // Bar 2
              bar2!.style.width = "0%";

              // Bar 3
              bar3!.style.transform = "rotate(45deg)";
              bar3!.style.bottom = "1.1rem";

              setNavOpen((navOpen) => !navOpen);
            }
          }}
        >
          <div id="DHS__Navbar__LoggedIn__Bar1"></div>
          <div id="DHS__Navbar__LoggedIn__Bar2"></div>
          <div id="DHS__Navbar__LoggedIn__Bar3"></div>
        </div>
      </nav>

      {/* Navbar links */}
      <div id="DHS__Navbar__LoggedIn__Nav">
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} /> Profile
        </Link>
        <Link to="/search">
          <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
        </Link>
        <Link to="/messages">
          <FontAwesomeIcon icon={faMessage} /> Messages
        </Link>
        <Link to="/reels">
          <FontAwesomeIcon icon={faFilm} /> Reels
        </Link>
        <Link
          to="/"
          onClick={() => {
            // When the user clicks the log out button, we call the handeler to log them out.
            logOut();
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} /> Logout
        </Link>
      </div>
    </>
  );
};

// Interface for function component
interface _INavbarNotLoggedIn {}

// Functional Component
const _NavbarNotLoggedIn: FC<_INavbarNotLoggedIn> = ({}) => {
  const navigate = useNavigate();

  // Handeler to handle home button click
  const handleHomeButton = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    navigate("/");
  };

  // Return JSX
  return (
    <nav className="DHS__Navbar__NotLoggedIn">
      <img
        src={DhruvSocial}
        alt=""
        onClick={(event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
          // When the user clicks the home button, we call the event handeler.
          handleHomeButton(event);
        }}
      />
    </nav>
  );
};

export default Navbar;
