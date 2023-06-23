const devURL = "http://localhost:3000";

import { NavigateFunction } from "react-router-dom";

const handleLogin = (
  username: string,
  password: string,
  navigate: NavigateFunction
) => {
  let userLoginData = {
    username: username,
    password: username,
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: userLoginData.username,
    password: userLoginData.password,
  });

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${devURL}/dhruvsocial/auth/loginAuth`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.success === false) {
        return console.log("Incorrent Login");
      }

      sessionStorage.setItem("token", result.accessToken);
      navigate("/home");
    })
    .catch((error) => console.log("error", error));
};

export { devURL, handleLogin };
