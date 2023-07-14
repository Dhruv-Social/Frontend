import "./error.scss";

import { FC } from "react";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IErrorNotificationProps {
  error: string;
  description: string;
}

const ErrorNotification: FC<IErrorNotificationProps> = ({
  error,
  description,
}) => {
  return (
    <span className="DHS__Error">
      <div>
        <FontAwesomeIcon icon={faCircleExclamation} />
      </div>
      <div>
        <h3>{error}</h3>
        <p>{description}</p>
      </div>
    </span>
  );
};

export default ErrorNotification;
