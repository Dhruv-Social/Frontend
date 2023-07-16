import "./profileOther.scss";

import { FC, useEffect, useState } from "react";
import {
  getAccessToken,
  getOtherUser,
  getIfFollowing,
  getOtherUserPosts,
} from "../../core/requests";
import { useSearchParams } from "react-router-dom";
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
  username: string;
  display_name: string;
  description: string;
  location: string;
  followers: string[];
  following: string[];
  posts: string[];
  profilePicture: string;
  banner: string;
}

interface IProfileOtherProps {}

const ProfileOther: FC<IProfileOtherProps> = ({}) => {
  let refreshToken = sessionStorage.getItem("refreshToken");

  const [searchParams] = useSearchParams();

  let [profileData, setProfileData] = useState<User | null>(null);
  let [posts, setPosts] = useState<Post[] | null>(null);
  let [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  useEffect(() => {
    if (refreshToken === null) return alert("bruh");

    if (profileData === null || posts === null) {
      getAccessToken(refreshToken).then((token) => {
        let userUUID = searchParams.get("uuid");

        if (userUUID === null) return alert("bruh");

        getOtherUser(token, userUUID).then((userData) => {
          setProfileData(userData);
        });
        getIfFollowing(token, userUUID).then((isFollowingJson) => {
          setIsFollowing(isFollowingJson.detail);
        });
        getOtherUserPosts(token, userUUID).then((posts) => {
          setPosts(posts);
        });
      });
    }
  });

  return (
    <main className="DHS__Profile">
      {profileData !== null && isFollowing !== null && posts !== null ? (
        <>
          <_ProfileOtherTop
            profilePicture={profileData.profilePicture}
            banner={profileData.banner}
          />
          <_ProfileOtherBotton
            displayName={profileData.display_name}
            username={profileData.username}
            description={profileData.description}
            location={profileData.location}
            followers={profileData.followers.length}
            following={profileData.following.length}
            isFollowing={isFollowing}
          />
          <_ProfileOtherPosts posts={posts} />
        </>
      ) : (
        <h3>Loading</h3>
      )}
    </main>
  );
};

interface _IProfileOtherTopTopProps {
  profilePicture: string;
  banner: string;
}

const _ProfileOtherTop: FC<_IProfileOtherTopTopProps> = ({
  profilePicture,
  banner,
}) => {
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

interface _IProfileOtherBottonProps {
  displayName: string;
  username: string;
  description: string;
  location: string;
  followers: number;
  following: number;
  isFollowing: boolean;
}

const _ProfileOtherBotton: FC<_IProfileOtherBottonProps> = ({
  displayName,
  username,
  description,
  location,
  followers,
  following,
  isFollowing,
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
      {isFollowing ? <button>Unfollow</button> : <button>Follow</button>}
    </div>
  );
};

interface _IProfileOtherPostsProps {
  posts: Post[];
}

const _ProfileOtherPosts: FC<_IProfileOtherPostsProps> = ({ posts }) => {
  return (
    <div className="DHS__Profile__Posts">
      <h2>Posts</h2>
      {posts.length !== 0 ? (
        posts.map((post) => {
          return (
            <__ProfileOtherPostsPost post={post} key={crypto.randomUUID()} />
          );
        })
      ) : (
        <h1>This person has no posts AND NO BITCHES</h1>
      )}
    </div>
  );
};

interface __IProfileOtherPostsPostProps {
  post: Post;
}

const __ProfileOtherPostsPost: FC<__IProfileOtherPostsPostProps> = ({
  post,
}) => {
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

export default ProfileOther;
