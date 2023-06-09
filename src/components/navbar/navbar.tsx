import "./navbar.scss";

import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DhruvSocial from "../../assets/icon/dhruv_social.png";

interface INavbarProps {}

const Navbar: FC<INavbarProps> = ({}) => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    sessionStorage.getItem("token") === null
      ? setUserLoggedIn(false)
      : setUserLoggedIn(true);
  }, [userLoggedIn]);

  return <>{userLoggedIn ? <_NavbarLoggedIn /> : <_NavbarNotLoggedIn />}</>;
};

interface _INavbarLoggedIn {}

const _NavbarLoggedIn: FC<_INavbarLoggedIn> = ({}) => {
  const navigate = useNavigate();

  const handleHomeButton = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    navigate("/home");
  };

  return (
    <nav className="DHS__Navbar__LoggedIn">
      <img
        src={DhruvSocial}
        alt=""
        onClick={(event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
          handleHomeButton(event);
        }}
      />

      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
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
