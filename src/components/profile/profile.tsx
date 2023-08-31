import "./profile.scss";

// Imports
import { FC, useEffect, useState } from "react";
import {
  getAccessToken,
  getProfileData,
  getUserPosts,
  unLikePostEndpoint,
  likePostEndpoint,
  fetchIfLikedPost,
} from "../../core/requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { User, Post } from "../../core/interfaces";

// Interface for function component
interface IProfileProps {}

// Functional Component
const Profile: FC<IProfileProps> = ({}) => {
  // Refresh token from sessionStorage
  let refreshToken = sessionStorage.getItem("refreshToken");

  // State for the current user profile data and their posts
  let [profileData, setProfileData] = useState<User | null>(null);
  let [posts, setPosts] = useState<Post[] | null>(null);

  // useEffect hook to get the self profileData as well as their posts
  useEffect(() => {
    if (refreshToken === null) return alert("bruh");

    getAccessToken(refreshToken).then((token) => {
      getProfileData(token).then((profileData) => {
        setProfileData(profileData);
      });
      getUserPosts(token).then((posts) => {
        setPosts(posts);
      });
    });

    // Empty dependency array beacuse we only want this to be called on compoennt mount
  }, []);

  // Return JSX
  return (
    <main className="DHS__Profile">
      {/* CONDITIONAL RENDERING: If the posts or user data are NULL, then we know the API has not returned the data yet so we just return "Loading" */}
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

// Interface for function component
interface _IProfileTopProps {
  profilePicture: string;
  banner: string;
}
// Functional Component
const _ProfileTop: FC<_IProfileTopProps> = ({ profilePicture, banner }) => {
  // Return JSX
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

// Interface for function component
interface _IProfileBottonProps {
  displayName: string;
  username: string;
  description: string;
  location: string;
  followers: number;
  following: number;
}

// Functional Component
const _ProfileBotton: FC<_IProfileBottonProps> = ({
  displayName,
  username,
  description,
  location,
  followers,
  following,
}) => {
  // Return JSX
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

// Interface for function component
interface _IProfilePostsProps {
  posts: Post[];
}

// Functional Component
const _ProfilePosts: FC<_IProfilePostsProps> = ({ posts }) => {
  return (
    <div className="DHS__Profile__Posts">
      <h2>Posts</h2>
      {/* CONDITIONAL RENDERING: If the posts have a length of 0, then the user does not have any posts */}
      {posts.length !== 0 ? (
        posts.map((post) => {
          return <__ProfilePostsPost post={post} key={crypto.randomUUID()} />;
        })
      ) : (
        <h1>This person has no posts</h1>
      )}
    </div>
  );
};

// Interface for function component
interface __ProfilePostsPostProps {
  post: Post;
}

// Functional Component
const __ProfilePostsPost: FC<__ProfilePostsPostProps> = ({ post }) => {
  // Optimum State
  let [haveILikedPost, setHaveILikedPost] = useState<boolean>(false);
  // Refresh token from sessionStorage
  let refreshToken = sessionStorage.getItem("refreshToken");

  useEffect(() => {
    // If the token is null, then we know they should not be on this route.
    if (refreshToken === null) {
      return alert("Bruh");
    }

    getAccessToken(refreshToken).then((token) => {
      fetchIfLikedPost(token, post.post_uuid).then((jsonData) => {
        setHaveILikedPost(jsonData.success);
      });
    });
  }, [haveILikedPost]);

  // Handeler to like the post if they click the like button
  const likePost = () => {
    if (refreshToken === null) {
      return alert("bruh");
    }

    getAccessToken(refreshToken).then((token) => {
      likePostEndpoint(token, post.post_uuid).then((jsonReturn) => {
        if (!jsonReturn.success) {
          return alert("Oopsie daisy, try again later");
        }

        setHaveILikedPost((like) => !like);
        return;
      });
    });
  };

  // Handeler to unlike the post if they click the like button
  const unLikePost = () => {
    if (refreshToken === null) {
      return alert("bruh");
    }

    getAccessToken(refreshToken).then((token) => {
      unLikePostEndpoint(token, post.post_uuid).then((jsonReturn) => {
        if (!jsonReturn.success) {
          return alert("Oopsie daisy, try again later");
        }

        setHaveILikedPost((like) => !like);
        return;
      });
    });
  };

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

        {/* RENDERING: to map or transform each child in the children data structure */}
        {post.media.map((media) => {
          // Checking for "null" edge case because the API returns "null" if the image is null.
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
          <FontAwesomeIcon
            icon={faHeart}
            style={haveILikedPost ? { color: "red" } : { color: "white" }}
            onClick={() => {
              if (haveILikedPost) {
                unLikePost();
                setHaveILikedPost((like) => !like);
                return;
              }

              likePost();
              setHaveILikedPost((like) => !like);
            }}
          />
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

export { __ProfilePostsPost };
export default Profile;
