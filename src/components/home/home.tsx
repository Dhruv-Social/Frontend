import "./home.scss";

import { FC, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAccessToken,
  getProfileData,
  getForYouPosts,
} from "../../core/requests";
import { __ProfilePostsPost } from "../profile/profile";

interface IHomeProps {}

interface User {
  uuid: string;
  username: string;
  display_name: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  password: string;
  description: string;
  location: string;
  followers: string[];
  following: string[];
  verified: boolean;
  posts: string[];
  profilePicture: string;
  banner: string;
  creationDate: string;
}

interface Post {
  post_uuid: string;
  author_uuid: string;
  author_display_name: string;
  author_username: string;
  author_profile_picture: string;
  likes: string[];
  comments: {
    commentUuid: string;
    authorUuid: string;
    text: string;
    likes: number;
  }[];
  text: string;
  media: string[];
}

const Home: FC<IHomeProps> = ({}) => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  let navigate = useNavigate();

  let [profileData, setProfileData] = useState<User | null>(null);
  let [forYouPosts, setForYouPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (refreshToken === null) {
      return navigate("/");
    }

    getAccessToken(refreshToken).then((token) => {
      getProfileData(token).then((profileData) => {
        setProfileData(profileData);
      });
      getForYouPosts(token).then((forYouPosts) => {
        setForYouPosts(forYouPosts);
      });
    });
  }, []);

  return (
    <main className="DHS__Home">
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

interface _IHomeCreatePost {
  profilePicture: string;
  displayName: string;
}

const _HomeCreatePost: FC<_IHomeCreatePost> = ({
  profilePicture,
  displayName,
}) => {
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

interface _IHomeForYouPosts {
  posts: Post[];
}

const _HomeForYouPosts: FC<_IHomeForYouPosts> = ({ posts }) => {
  return (
    <div className="DHS__Home__ForYou">
      <h2>Posts</h2>

      {posts.length !== 0 ? (
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
