import "./success.scss";

import { FC } from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ISuccessNotificationProps {
  success: string;
  description: string;
}

const __Test__SuccessNotification: FC<ISuccessNotificationProps> = ({
  success,
  description,
}) => {
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

export default __Test__SuccessNotification;
