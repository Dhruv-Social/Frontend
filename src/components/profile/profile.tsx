import "./profile.scss";

import { FC, useEffect, useState } from "react";
import {
  getAccessToken,
  getProfileData,
  getUserPosts,
} from "../../core/requests";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

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

interface IProfileProps {}

const Profile: FC<IProfileProps> = ({}) => {
  let refreshToken = sessionStorage.getItem("refreshToken");

  let [profileData, setProfileData] = useState<User | null>(null);
  let [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (refreshToken === null) return alert("bruh");

    if (profileData === null || posts === null) {
      getAccessToken(refreshToken).then((token) => {
        getProfileData(token).then((profileData) => {
          setProfileData(profileData);
        });
        getUserPosts(token).then((posts) => {
          setPosts(posts);
        });
      });
    }
  });

  return (
    <main className="DHS__Profile">
      {profileData !== null && posts !== null ? (
        <>
          <_ProfileTop
            profilePicture={profileData.profilePicture}
            banner={profileData.banner}
          />
          <_ProfileBotton
            displayName={profileData.display_name}
            username={profileData.username}
            description={profileData.description}
            location={profileData.location}
            followers={profileData.followers.length}
            following={profileData.following.length}
          />
          <_ProfilePosts posts={posts} />
        </>
      ) : (
        <h3>Loading</h3>
      )}
    </main>
  );
};

interface _IProfileTopProps {
  profilePicture: string;
  banner: string;
}

const _ProfileTop: FC<_IProfileTopProps> = ({ profilePicture, banner }) => {
  return (
    <div className="DHS__Profile__Top">
      <div className="DHS__Profile__Top__Images">
        <div
          className="DHS__Profile__Top__Images__Banner"
          style={{
            backgroundImage: `url("${"data:image/jpeg;base64,"}${banner}")`,
          }}
        ></div>
        <div
          className="DHS__Profile__Top__Images__ProfilePicture"
          style={{
            backgroundImage: `url("${"data:image/jpeg;base64,"}${profilePicture}")`,
          }}
        ></div>
      </div>
    </div>
  );
};

interface _IProfileBottonProps {
  displayName: string;
  username: string;
  description: string;
  location: string;
  followers: number;
  following: number;
}

const _ProfileBotton: FC<_IProfileBottonProps> = ({
  displayName,
  username,
  description,
  location,
  followers,
  following,
}) => {
  return (
    <div className="DHS__Profile__Bottom">
      <h2>{displayName}</h2>
      <h3>@{username}</h3>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <section>
        <p>
          <strong>Following: </strong> {following}
        </p>
        <p>
          <strong>Followers: </strong> {followers}
        </p>
      </section>
    </div>
  );
};

interface _IProfilePostsProps {
  posts: Post[];
}

const _ProfilePosts: FC<_IProfilePostsProps> = ({ posts }) => {
  return (
    <div className="DHS__Profile__Posts">
      <h2>Posts</h2>
      {posts.length !== 0 ? (
        posts.map((post) => {
          return <__IProfilePostsPost post={post} key={crypto.randomUUID()} />;
        })
      ) : (
        <h1>This person has no posts AND NO BITCHES</h1>
      )}
    </div>
  );
};

interface __ProfilePostsPostProps {
  post: Post;
}

const __IProfilePostsPost: FC<__ProfilePostsPostProps> = ({ post }) => {
  return (
    <div className="DHS__Profile__Posts__Post">
      <section className="DHS__Profile__Posts__Post__Profile">
        <div
          style={{
            backgroundImage: `url("${"data:image/jpeg;base64,"}${
              post.author_profile_picture
            }")`,
          }}
        ></div>

        <h3>{post.author_display_name}</h3>
      </section>

      <section className="DHS__Profile__Posts__Post__Text__Images">
        <p>{post.text}</p>

        {post.media.map((media) => {
          if (media === "null") {
            return null;
          }

          return (
            <img
              src={`${"data:image/jpeg;base64,"}${media}`}
              alt="image from user post"
              key={crypto.randomUUID()}
            />
          );
        })}
      </section>

      <section className="DHS__Profile__Posts__Post__Reactions">
        <div className="DHS__Profile__Posts__Post__Reactions__Likes">
          <FontAwesomeIcon icon={faHeart} />
          <p>{`${post.likes.length}`}</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faComment} />
          <p>{`${post.comments.length}`}</p>
        </div>
      </section>
    </div>
  );
};

export default Profile;
