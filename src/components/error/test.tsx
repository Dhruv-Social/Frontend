import "./error.scss";

import { FC } from "react";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IErrorNotificationProps {
  error: string;
  description: string;
}

const __Test__ErrorNotification: FC<IErrorNotificationProps> = ({
  error,
  description,
}) => {
  return (
    <span className="DHS__Error">
      <article className="DHS__Error__Inner">
        <div>
          <FontAwesomeIcon icon={faCircleExclamation} />
        </div>
        <div>
          <h3>{error}</h3>
          <p>{description}</p>
        </div>
        <span className="DHS__Error__Loading"></span>
      </article>
    </span>
  );
};

export default __Test__ErrorNotification;
