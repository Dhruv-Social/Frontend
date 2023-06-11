import "./signup.scss";

import { FC, useState } from "react";

import { IUser } from "./signupInterface";

// Modals
import SignupModal1 from "./modals/modal1/modal1";
import SignupModal2 from "./modals/modal2/modal2";
import SignupModal3 from "./modals/modal3/modal3";
import SignupModal4 from "./modals/modal4/modal4";

interface ISignUpProps {}

const Signup: FC<ISignUpProps> = ({}) => {
  let [modal, setModal] = useState<number>(0);
  let [useData, setUserData] = useState<IUser>({
    username: null,
    displayName: null,
    firstname: null,
    lastname: null,
    email: null,
    phonenumber: null,
    password: null,
  });

  return (
    <>
      {modal === 0 ? (
        <SignupModal1 modal={modal} setModal={setModal} />
      ) : modal === 1 ? (
        <SignupModal2 modal={modal} setModal={setModal} />
      ) : modal === 2 ? (
        <SignupModal3 modal={modal} setModal={setModal} />
      ) : (
        <SignupModal4 modal={modal} setModal={setModal} />
      )}

      <div className="DHS__Signup__Circles">
        {modal === 0 ? (
          <div className="DHS__Signup__Circle__Active"></div>
        ) : (
          <div className="DHS__Signup__Circle__NotActive"></div>
        )}

        {modal === 1 ? (
          <div className="DHS__Signup__Circle__Active"></div>
        ) : (
          <div className="DHS__Signup__Circle__NotActive"></div>
        )}

        {modal === 2 ? (
          <div className="DHS__Signup__Circle__Active"></div>
        ) : (
          <div className="DHS__Signup__Circle__NotActive"></div>
        )}

        {modal === 3 ? (
          <div className="DHS__Signup__Circle__Active"></div>
        ) : (
          <div className="DHS__Signup__Circle__NotActive"></div>
        )}
      </div>
    </>
  );
};

export default Signup;
