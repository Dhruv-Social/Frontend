const devURL = "http://localhost:3000";

import { NavigateFunction } from "react-router-dom";
import { IUser } from "../components/signup/signupInterface";
import { generateKeys } from "./keyGeneration";

/**
 * Function to handle login and any errors that may come with it/
 * @param username String
 * @param password String
 * @param setLoginError State Variable
 * @param navigate Naigate Function
 */
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

/**
 * Function to get an access token from a refresh token
 * @param refreshToken String
 * @returns promise of the api return
 */
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

/**
 * Function to get the current logged in user profile data
 * @param accessToken String
 * @returns Promise of the API Return
 */
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

/**
 * Function to get the current logged in user posts
 * @param accessToken String
 * @returns Promise of the API return data
 */
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

/**
 * Function the get the posts for the home page
 * @param accessToken String
 * @returns Promise of the API return data
 */
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

/**
 * Function to get a reel
 * @param accessToken String
 * @returns Promise of the API return data
 */
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

/**
 * Function to search a user
 * @param accessToken String
 * @param search String
 * @returns Promise of the API return data
 */
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

/**
 * Function to get another user from theur UUID
 * @param accessToken String
 * @param uuid String
 * @returns Promise of the API return data
 */
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

/**
 * Function to check if the current logged in user is following another user
 * @param accessToken String
 * @param uuid String
 * @returns Promise of the API return data
 */
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

/**
 * Function to get another users posts
 * @param accessToken String
 * @param uuid String
 * @returns Promise of the API return data
 */
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

/**
 * Function to follow a user
 * @param accessToken String
 * @param uuid String
 * @returns Promise of the API return data
 */
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

/**
 * Function to unfollow a user
 * @param accessToken String
 * @param uuid String
 * @returns Promise of the API return data
 */
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

/**
 * Fetch if the current logged in user has already liked a post
 * @param accessToken String
 * @param postUuid String
 * @returns Promise of the API return data
 */
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

/**
 * Function to like a post
 * @param accessToken String
 * @param postUuid String
 * @returns Promise of the API return data
 */
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

/**
 * Function to unlike post
 * @param accessToken String
 * @param postUuid String
 * @returns Promise of the API return data
 */
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

/**
 * Function to post a user to the API
 * @param userData IUser
 * @param navigate Navigate Function
 * @returns Promise of the API return data
 */
const postUserEndpoint = (userData: IUser, navigate: NavigateFunction) => {
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

  (async () => {
    const { privateKey, publicKey } = await generateKeys();

    if (
      userData.username === null ||
      userData.displayName === null ||
      userData.firstname === null ||
      userData.lastname === null ||
      userData.password === null ||
      userData.email === null ||
      userData.phonenumber === null
    ) {
      return;
    }

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
      .then((response) => response.text())
      .then((result) => {
        if (result === "success") {
          alert("Please check your email for next steps on how to verify");
          navigate("/login");
        } else {
          alert(JSON.parse(result).details.reason);
        }
      })
      .catch((error) => console.log("error", error));
  })();
};

/**
 * Function the get the chat messages from a chat between 2 users
 * @param accessToken String
 * @param forUser String
 * @returns Promise of the API return data
 */
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
