const devURL = "http://localhost:3000";

import { NavigateFunction } from "react-router-dom";

const handleLogin = (
  username: string,
  password: string,
  setLoginError: (item: boolean) => void,
  navigate: NavigateFunction
) => {
  let userLoginData = {
    username: username,
    password: password,
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
        setLoginError(true);
        setTimeout(() => setLoginError(false), 5000);
        return console.log("Incorrent Login");
      }

      sessionStorage.setItem("refreshToken", result.refreshToken);
      navigate("/home");
    })
    .catch((error) => console.log("error", error));
};

export { devURL, handleLogin };
