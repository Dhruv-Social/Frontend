import "./home.scss";

import { FC, use } from "react";

import { devURL } from "../../core/requests";

interface IHomeProps {}

const Home: FC<IHomeProps> = ({}) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${sessionStorage.getItem("token")}`
  );

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const userLoginData = use(
    fetch(`${devURL}/dhruvsocial/get/fetchSelf`, requestOptions).then(
      (response) => response.json()
    )
  );

  return <main className="DHS__Home">{JSON.stringify(userLoginData)}</main>;
};

export default Home;
