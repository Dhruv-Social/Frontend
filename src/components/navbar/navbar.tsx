import "./navbar.scss";

import { FC, useEffect, useState, useContext } from "react";
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
import { TokenContext } from "../../App";

import DhruvSocial from "../../assets/icon/dhruv_social.png";

interface INavbarProps {}

const Navbar: FC<INavbarProps> = ({}) => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const refreshToken = useContext(TokenContext);

  useEffect(() => {
    refreshToken !== null ? setUserLoggedIn(true) : setUserLoggedIn(false);
  }, [userLoggedIn]);

  return <>{userLoggedIn ? <_NavbarLoggedIn /> : <_NavbarNotLoggedIn />}</>;
};

interface _INavbarLoggedIn {}

const _NavbarLoggedIn: FC<_INavbarLoggedIn> = ({}) => {
  const navigate = useNavigate();
  let [navOpen, setNavOpen] = useState<boolean>(false);

  const handleHomeButton = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    navigate("/home");
  };

  const logOut = () => {
    sessionStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <>
      <nav className="DHS__Navbar__LoggedIn">
        <img
          src={DhruvSocial}
          alt=""
          onClick={(event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
            handleHomeButton(event);
          }}
        />

        <div
          onClick={() => {
            let entireNav = document.getElementById(
              "DHS__Navbar__LoggedIn__Nav"
            );

            let bar1 = document.getElementById("DHS__Navbar__LoggedIn__Bar1");
            let bar2 = document.getElementById("DHS__Navbar__LoggedIn__Bar2");
            let bar3 = document.getElementById("DHS__Navbar__LoggedIn__Bar3");

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

      <div id="DHS__Navbar__LoggedIn__Nav">
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} /> Profile
        </Link>
        <Link to="/search">
          <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
        </Link>
        <Link to="/">
          <FontAwesomeIcon icon={faMessage} /> Messages
        </Link>
        <Link to="/reels">
          <FontAwesomeIcon icon={faFilm} /> Reels
        </Link>
        <Link
          to="/"
          onClick={() => {
            logOut();
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} /> Logout
        </Link>
      </div>
    </>
  );
};

interface _INavbarNotLoggedIn {}

const _NavbarNotLoggedIn: FC<_INavbarNotLoggedIn> = ({}) => {
  const navigate = useNavigate();

  const handleHomeButton = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    navigate("/");
  };

  return (
    <nav className="DHS__Navbar__NotLoggedIn">
      <img
        src={DhruvSocial}
        alt=""
        onClick={(event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
          handleHomeButton(event);
        }}
      />
    </nav>
  );
};

export default Navbar;
