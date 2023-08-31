import "./home.scss";

// Imports
import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAccessToken,
  getProfileData,
  getForYouPosts,
} from "../../core/requests";
import { __ProfilePostsPost } from "../profile/profile";
import { User, Post } from "../../core/interfaces";

// Interface for function component
interface IHomeProps {}

// Functional Component
const Home: FC<IHomeProps> = ({}) => {
  // Getting the refresh token from session storage
  const refreshToken = sessionStorage.getItem("refreshToken");
  let navigate = useNavigate();

  // State for profile data and the posts for you
  let [profileData, setProfileData] = useState<User | null>(null);
  let [forYouPosts, setForYouPosts] = useState<Post[] | null>(null);

  // On page load we get the access token, which we then use to get posts and the current logged in user profile data
  useEffect(() => {
    if (refreshToken === null) {
      return navigate("/");
    }

    // Get access token
    getAccessToken(refreshToken).then((token) => {
      // Get the profile user data and save it to state
      getProfileData(token).then((profileData) => {
        setProfileData(profileData);
      });
      // Get the for you posts ad save it to state
      getForYouPosts(token).then((forYouPosts) => {
        setForYouPosts(forYouPosts);
      });
    });
    // empty dependency array to make it run once on component mount
  }, []);

  // Return JSX
  return (
    <main className="DHS__Home">
      {/* CONDITIONAL RENDERING: When we first load the page, we check if the data is null then we return "loading", else we return the API data */}
      {profileData !== null && forYouPosts !== null ? (
        <>
          <_HomeCreatePost
            profilePicture={profileData.profilePicture}
            displayName={profileData.display_name}
          />
          <hr />
          <_HomeForYouPosts posts={forYouPosts} />
        </>
      ) : (
        <h3>Loading</h3>
      )}
    </main>
  );
};

// Interface for function post component
interface _IHomeCreatePost {
  profilePicture: string;
  displayName: string;
}

// Function component
const _HomeCreatePost: FC<_IHomeCreatePost> = ({
  profilePicture,
  displayName,
}) => {
  // Return JSX
  return (
    <div className="DHS__Home__CreatePost">
      <div className="DHS__Home__CreatePost__UserData">
        <div
          className="DHS__Home__CreatePost__UserData__Image"
          style={{
            backgroundImage: `url("${"data:image/jpeg;base64,"}${profilePicture}")`,
          }}
        ></div>
        <h3 className="DHS__Home__CreatePost__UserData__DispayName">
          {displayName}
        </h3>
      </div>
      <div className="DHS__Home__CreatePost__Input">
        <input type="text" placeholder="Say Something Awesome..." />
      </div>
      <div className="DHS__Home__CreatePost__FileInput">
        <input type="file" accept="image/*" multiple={true} />
      </div>
    </div>
  );
};

// Interface for function component
interface _IHomeForYouPosts {
  posts: Post[];
}

// Function component
const _HomeForYouPosts: FC<_IHomeForYouPosts> = ({ posts }) => {
  // Return JSX
  return (
    <div className="DHS__Home__ForYou">
      <h2>Posts</h2>

      {/* CONFITIONAL RENDERING: if the posts[] have a length of 0, then we know they do not have any posts */}
      {posts.length !== 0 ? (
        // Loop over all the posts and return them one by one to the user
        posts.map((post) => {
          return <__ProfilePostsPost key={crypto.randomUUID()} post={post} />;
        })
      ) : (
        <h1>Nothing going on here</h1>
      )}
    </div>
  );
};

export default Home;
