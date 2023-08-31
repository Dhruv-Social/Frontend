import "./search.scss";

// Imports
import { FC, useEffect, useState } from "react";
import { getAccessToken, searchUsers } from "../../core/requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { IUsers } from "../../core/interfaces";

// Interface for function component
interface ISearchProps {}

// Functional Component
const Search: FC<ISearchProps> = ({}) => {
  // Get the refresh token
  const refreshToken = sessionStorage.getItem("refreshToken");
  let navigate = useNavigate();

  // states for users, and the current user search
  let [users, setUsers] = useState<IUsers[] | null>(null);
  let [currentSearch, setCurrentSearch] = useState<string>("");

  // Use effect: everytime the currentSearch state changes, this side effect runs and gets the users and sets it to the users state
  useEffect(() => {
    if (refreshToken === null) {
      return navigate("/");
    }

    getAccessToken(refreshToken).then((token) => {
      searchUsers(token, currentSearch).then((users) => {
        setUsers(users);
      });
    });
  }, [currentSearch]);

  // Return JSX
  return (
    <main className="DHS__Search">
      {users !== null ? (
        <_SearchUsers users={users} setCurrentSearch={setCurrentSearch} />
      ) : (
        <h1>Loading</h1>
      )}
    </main>
  );
};

// Interface for function component
interface _ISearchUsersProps {
  users: IUsers[];
  setCurrentSearch: (search: string) => void;
}

// Functional Component
const _SearchUsers: FC<_ISearchUsersProps> = ({ users, setCurrentSearch }) => {
  // Return JSX
  return (
    <>
      <div className="DHS__Search__Search">
        <FontAwesomeIcon
          className="DHS__Search__Search__Icon"
          icon={faSearch}
        />
        <input
          type="search"
          onChange={(e) => {
            setCurrentSearch(e.target.value);
          }}
          placeholder="Search Username..."
        />
      </div>

      <div className="DHS__Search__Users">
        {/* CONDITIONAL/MAP RENDERING: First we check that the length is !== 0, is it is, then we return "No users math this username" */}
        {users.length !== 0 ? (
          // Map over all the users and show them
          users.map((user) => {
            return <__SearchUsersUser key={crypto.randomUUID()} user={user} />;
          })
        ) : (
          <h1>No users match that username</h1>
        )}
      </div>
    </>
  );
};

// Interface for function component
interface __ISearchUsersUserProps {
  user: IUsers;
}

// Functional Component
const __SearchUsersUser: FC<__ISearchUsersUserProps> = ({ user }) => {
  let navigate = useNavigate();

  // Return JSX
  return (
    <div
      className="DHS__Search__Users__User"
      onClick={(e) => {
        navigate({
          pathname: "/profile/other",
          search: `?uuid=${user.uuid}`,
        });
      }}
    >
      <div
        className="DHS__Search__Users__User__ProfilePicture"
        style={{
          backgroundImage: `url("${"data:image/jpeg;base64,"}${
            user.profilePicture
          }")`,
        }}
      ></div>
      <div className="DHS__Search__Users__User__Name">{user.displayName}</div>
    </div>
  );
};

export default Search;
