import "./search.scss";

// Imports
import { FC, useEffect, useState } from "react";
import { getAccessToken, searchUsers } from "../../core/requests";
import { useNavigate } from "react-router-dom";
import { IUsers } from "../../core/interfaces";

// Interface for function component
interface ISearchProps {}

// Functional Component
const __Test__Search: FC<ISearchProps> = ({}) => {
  // Get the refresh token
  const refreshToken = sessionStorage.getItem("refreshToken");
  let navigate = useNavigate();

  // states for users, and the current user search
  let [users, setUsers] = useState<IUsers[] | null>(null);
  let [currentSearch, setCurrentSearch] = useState<string>("");

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
        <div>
          {users.map((user) => {
            return (
              <div>
                {user.displayName} {user.uuid}
              </div>
            );
          })}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </main>
  );
};

export default __Test__Search;
