import "./success.scss";

// Imports
import { FC } from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ISuccessNotificationProps {
  success: string;
  description: string;
}

const SuccessNotification: FC<ISuccessNotificationProps> = ({
  success,
  description,
}) => {
  // Return JSX
  return (
    <span className="DHS__Success">
      <article className="DHS__Success__Inner">
        <div>
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
        <div>
          <h3>{success}</h3>
          <p>{description}</p>
        </div>
        <span className="DHS__Success__Loading"></span>
      </article>
    </span>
  );
};

export default SuccessNotification;
