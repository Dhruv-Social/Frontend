import "./profileOther.scss";

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
import {
  faHeart,
  faComment,
  faChainSlash,
} from "@fortawesome/free-solid-svg-icons";
import Sound from "../../assets/pip.mp3";

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
  let userUUID = searchParams.get("uuid");

  let [profileData, setProfileData] = useState<User | null>(null);
  let [posts, setPosts] = useState<Post[] | null>(null);
  let [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  useEffect(() => {
    if (refreshToken === null) return alert("bruh");

    getAccessToken(refreshToken).then((token) => {
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
  }, []);

  return (
    <main className="DHS__Profile">
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
  uuid: string;
  isFollowing: boolean;
  refreshToken: string;
}

const _ProfileOtherBotton: FC<_IProfileOtherBottonProps> = ({
  uuid,
  isFollowing,
  refreshToken,
}) => {
  const naviagte = useNavigate()

  let [buttonClicked, setButtonClicked] = useState<boolean>(isFollowing);
  let [userData, setUserData] = useState<User | null>(null);

  let playAudio = () => {
    new Audio(Sound).play();
  };

  useEffect(() => {
    getAccessToken(refreshToken).then((token) => {
      getOtherUser(token, uuid).then((userData) => {
        setUserData(userData);
      });
    });
  }, [buttonClicked]);

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

  return (
    <>
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
          <button style={{marginRight: "1rem", cursor: "pointer"}} onClick={() => {
            naviagte({
              pathname: "/messages",
              search: `?uuid=${userData?.uuid}`
            })
          }}>Send Message</button>
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
        <h1>This person has no posts</h1>
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
  let [haveILikedPost, setHaveILikedPost] = useState<boolean>(false);
  let refreshToken = sessionStorage.getItem("refreshToken");

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
