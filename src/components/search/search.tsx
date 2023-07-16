import "./search.scss";

import { FC, useEffect, useState } from "react";
import { getAccessToken, searchUsers } from "../../core/requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface ISearchProps {}

interface IUsers {
  uuid: string;
  profilePicture: string;
  displayName: string;
}

const Search: FC<ISearchProps> = ({}) => {
  let refreshToken = sessionStorage.getItem("refreshToken");

  let [users, setUsers] = useState<IUsers[] | null>(null);
  let [currentSearch, setCurrentSearch] = useState<string>("");

  useEffect(() => {
    if (refreshToken === null) return alert("bruh");

    getAccessToken(refreshToken).then((token) => {
      searchUsers(token, currentSearch).then((users) => {
        setUsers(users);
      });
    });
  }, [currentSearch]);

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

interface _ISearchUsersProps {
  users: IUsers[];
  setCurrentSearch: (search: string) => void;
}

const _SearchUsers: FC<_ISearchUsersProps> = ({ users, setCurrentSearch }) => {
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
        {users.length !== 0 ? (
          users.map((user) => {
            return <__SearchUsersUser key={crypto.randomUUID()} user={user} />;
          })
        ) : (
          <h1>No users match tha username</h1>
        )}
      </div>
    </>
  );
};

interface __ISearchUsersUserProps {
  user: IUsers;
}

const __SearchUsersUser: FC<__ISearchUsersUserProps> = ({ user }) => {
  let navigate = useNavigate();

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
      <button className="DHS__Search__Users__User__Follow">Follow</button>
    </div>
  );
};

export default Search;
