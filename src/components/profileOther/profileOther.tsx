import "./profileOther.scss";

// Imports
import { FC, useEffect, useState } from "react";
import {
  getAccessToken,
  getOtherUser,
  getIfFollowing,
  getOtherUserPosts,
  followUserEndpoint,
  unFollowUserEndpoint,
  fetchIfLikedPost,
  likePostEndpoint,
  unLikePostEndpoint,
} from "../../core/requests";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import Sound from "../../assets/pip.mp3";
import { UserOther, Post } from "../../core/interfaces";

// Interface for function component
interface IProfileOtherProps {}

// Functional Component
const ProfileOther: FC<IProfileOtherProps> = ({}) => {
  // Refresh token from sessionStorage
  let refreshToken = sessionStorage.getItem("refreshToken");

  // UUID from the query parametres
  const [searchParams] = useSearchParams();
  let userUUID = searchParams.get("uuid");

  // Profile State for the searched user profile, their posts and if we are following them.
  let [profileData, setProfileData] = useState<UserOther | null>(null);
  let [posts, setPosts] = useState<Post[] | null>(null);
  let [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  let [doesUserExist, setDoesUserExist] = useState<boolean>(true);

  // UseEffect to get that users data
  useEffect(() => {
    // If token is null, then we know they should not be on this route
    if (refreshToken === null) return alert("bruh");

    getAccessToken(refreshToken).then((token) => {
      if (userUUID === null) return alert("bruh");

      // Get the data
      getOtherUser(token, userUUID).then((userData) => {
        if (userData.success === false) {
          setDoesUserExist(false);
        }

        setProfileData(userData);
      });
      getIfFollowing(token, userUUID).then((isFollowingJson) => {
        setIsFollowing(isFollowingJson.detail);
      });
      getOtherUserPosts(token, userUUID).then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {doesUserExist ? (
        <main className="DHS__Profile">
          {/* CONDITIONAL RENDERING: if the data is null, then we know the API has not returned the data */}
          {profileData !== null &&
          isFollowing !== null &&
          posts !== null &&
          refreshToken !== null ? (
            <>
              <_ProfileOtherTop
                profilePicture={profileData.profilePicture}
                banner={profileData.banner}
              />
              <_ProfileOtherBotton
                uuid={profileData.uuid}
                isFollowing={isFollowing}
                refreshToken={refreshToken}
              />
              <_ProfileOtherPosts posts={posts} />
            </>
          ) : (
            <h3>Loading</h3>
          )}
        </main>
      ) : (
        <main className="DHS__Profile__DoesNotExist">
          <h2 className="DHS__Profile__DoesNotExist_Text">
            This user does not exist
          </h2>
        </main>
      )}
    </>
  );
};

// Interface for function component
interface _IProfileOtherTopTopProps {
  profilePicture: string;
  banner: string;
}

// Functional Component
const _ProfileOtherTop: FC<_IProfileOtherTopTopProps> = ({
  profilePicture,
  banner,
}) => {
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
interface _IProfileOtherBottonProps {
  uuid: string;
  isFollowing: boolean;
  refreshToken: string;
}

// Functional Component
const _ProfileOtherBotton: FC<_IProfileOtherBottonProps> = ({
  uuid,
  isFollowing,
  refreshToken,
}) => {
  const naviagte = useNavigate();

  // Optimun state
  let [buttonClicked, setButtonClicked] = useState<boolean>(isFollowing);
  let [userData, setUserData] = useState<UserOther | null>(null);

  let playAudio = () => {
    new Audio(Sound).play();
  };

  // Use Effct that runs on compoennt mount
  useEffect(() => {
    getAccessToken(refreshToken).then((token) => {
      getOtherUser(token, uuid).then((userData) => {
        setUserData(userData);
      });
    });
  }, [buttonClicked]);

  // Function to follow user
  const followUser = () => {
    getAccessToken(refreshToken).then((token) => {
      followUserEndpoint(token, uuid).then((returnEndpoint) => {
        if (!returnEndpoint.success) {
          return alert("Oopsie daisy, try again later");
        }

        setButtonClicked(!buttonClicked);
      });
    });
  };

  // Function to unfollow user
  const unFollowUser = () => {
    getAccessToken(refreshToken).then((token) => {
      unFollowUserEndpoint(token, uuid).then((returnEndpoint) => {
        if (!returnEndpoint.success) {
          return alert("Oopsie daisy, try again later");
        }

        setButtonClicked(!buttonClicked);
      });
    });
  };

  // Return JSX
  return (
    <>
      {/* CONDITIONAL RENDERING: If user data is null, then we know the api is still being called */}
      {userData !== null ? (
        <div className="DHS__Profile__Bottom">
          <h2>{userData.username}</h2>
          <h3>@{userData.username}</h3>
          <p>
            <strong>Description:</strong> {userData.description}
          </p>
          <p>
            <strong>Location:</strong> {userData.location}
          </p>
          <section>
            <p>
              <strong>Following: </strong> {userData.following.length}
            </p>
            <p>
              <strong>Followers: </strong> {userData.followers.length}
            </p>
          </section>
          <button
            style={{ marginRight: "1rem", cursor: "pointer" }}
            onClick={() => {
              naviagte({
                pathname: "/messages",
                search: `?uuid=${userData?.uuid}`,
              });
            }}
          >
            Send Message
          </button>
          {buttonClicked ? (
            <button
              onClick={() => {
                playAudio();
                unFollowUser();
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => {
                playAudio();
                followUser();
              }}
            >
              Follow
            </button>
          )}
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
};

// Interface for function component
interface _IProfileOtherPostsProps {
  posts: Post[];
}

// Function Component
const _ProfileOtherPosts: FC<_IProfileOtherPostsProps> = ({ posts }) => {
  // Return JSX
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
        <h1>This person has no posts</h1>
      )}
    </div>
  );
};

// Interface for function component
interface __IProfileOtherPostsPostProps {
  post: Post;
}

// Function Component
const __ProfileOtherPostsPost: FC<__IProfileOtherPostsPostProps> = ({
  post,
}) => {
  // Optimun State
  let [haveILikedPost, setHaveILikedPost] = useState<boolean>(false);

  // Refresh token from session storage
  let refreshToken = sessionStorage.getItem("refreshToken");

  // Effect that runs on startup
  useEffect(() => {
    if (refreshToken === null) {
      return alert("Bruh");
    }

    getAccessToken(refreshToken).then((token) => {
      fetchIfLikedPost(token, post.post_uuid).then((jsonData) => {
        setHaveILikedPost(jsonData.success);
      });
    });
  }, [haveILikedPost]);

  // Function to like post
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
        return alert("Success");
      });
    });
  };

  // Function to unlike post
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
        return alert("Success");
      });
    });
  };

  // Return JSX
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

export default ProfileOther;
