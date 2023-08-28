const devURL = "http://localhost:3000";

import { NavigateFunction } from "react-router-dom";
import { IUser } from "../components/signup/signupInterface";
import { generateKeys } from "./keyGeneration";

const HTTP_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  CREATED: 201,
};

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

const getAccessToken = (refreshToken: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    token: refreshToken,
  });

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`${devURL}/dhruvsocial/auth/loginAuth/refresh`, requestOptions)
    .then((response) => response.json())
    .then((result) => result.accessToken)
    .catch((error) => console.log("error", error));
};

const getProfileData = (accessToken: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`${devURL}/dhruvsocial/get/fetchSelf`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const getUserPosts = (accessToken: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`${devURL}/dhruvsocial/get/fetchUsersPosts`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const getForYouPosts = (accessToken: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`${devURL}/dhruvsocial/get/forYouPosts`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const getReel = (accessToken: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`${devURL}/dhruvsocial/get/reels`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const searchUsers = (accessToken: string, search: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${devURL}/dhruvsocial/get/searchUser?user=${search}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const getOtherUser = (accessToken: string, uuid: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${devURL}/dhruvsocial/get/fetchOther?uuid=${uuid}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const getIfFollowing = (accessToken: string, uuid: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${devURL}/dhruvsocial/get/fetchIfFollowing?ifFollowingUuid=${uuid}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const getOtherUserPosts = (accessToken: string, uuid: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${devURL}/dhruvsocial/get/fetchOtherPosts?uuid=${uuid}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const followUserEndpoint = (accessToken: string, uuid: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${devURL}/dhruvsocial/put/followUser?uuidToFollow=${uuid}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const unFollowUserEndpoint = (accessToken: string, uuid: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${devURL}/dhruvsocial/put/unfollowUser?uuidToUnfollow=${uuid}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const fetchIfLikedPost = (accessToken: string, postUuid: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${devURL}/dhruvsocial/get/fetchIfPostLiked?postUuid=${postUuid}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const likePostEndpoint = (accessToken: string, postUuid: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${devURL}/dhruvsocial/put/likePost?postUuid=${postUuid}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const unLikePostEndpoint = (accessToken: string, postUuid: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${devURL}/dhruvsocial/get/unlikePost?postUuid=${postUuid}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const postUserEndpoint = (userData: IUser) => {
  var formdata = new FormData();

  if (
    userData.username === null ||
    userData.displayName === null ||
    userData.firstname === null ||
    userData.lastname === null ||
    userData.email === null ||
    userData.phonenumber === null ||
    userData.password === null
  ) {
    return false;
  }

  const { privateKey, publicKey } = generateKeys();
  localStorage.setItem("privateKey", privateKey);

  formdata.append("username", userData.username);
  formdata.append("display_name", userData.displayName);
  formdata.append("firstname", userData.firstname);
  formdata.append("lastname", userData.lastname);
  formdata.append("password", userData.password);
  formdata.append("description", "This is my description");
  formdata.append("location", "Auckland");
  formdata.append("email", userData.email);
  formdata.append("phonenumber", userData.phonenumber);
  formdata.append("publicKey", publicKey);

  var requestOptions: RequestInit = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${devURL}/dhruvsocial/post/postUser`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

const getChatMessages = (accessToken: string, forUser: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${devURL}/dhruvsocial/get/getChatMessages?userFor=${forUser}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

export {
  devURL,
  handleLogin,
  getAccessToken,
  getProfileData,
  getUserPosts,
  getForYouPosts,
  getReel,
  searchUsers,
  getOtherUser,
  getIfFollowing,
  getOtherUserPosts,
  followUserEndpoint,
  unFollowUserEndpoint,
  fetchIfLikedPost,
  likePostEndpoint,
  unLikePostEndpoint,
  postUserEndpoint,
  getChatMessages,
};
