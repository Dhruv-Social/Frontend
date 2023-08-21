import "./signup.scss";

import { FC, useEffect, useState } from "react";
import { IUser } from "./signupInterface";
import { postUserEndpoint } from "../../core/requests";

// Modals
import SignupModal1 from "./modals/modal1/modal1";
import SignupModal2 from "./modals/modal2/modal2";
import SignupModal3 from "./modals/modal3/modal3";
import SignupModal4 from "./modals/modal4/modal4";

interface ISignUpProps {}

const Signup: FC<ISignUpProps> = ({}) => {
  let [modal, setModal] = useState<number>(0);
  let [userData, setUserData] = useState<IUser>({
    username: null,
    displayName: null,
    firstname: null,
    lastname: null,
    email: null,
    phonenumber: null,
    password: null,
  });

  let [submitData, setSubmitData] = useState<boolean>(false);

  useEffect(() => {
    if (submitData) {
      // check data
      if (
        userData.username === null ||
        userData.displayName === null ||
        userData.firstname === null ||
        userData.lastname === null
      ) {
        alert("Bro tried to pull a fast one on me");
        return setModal(0);
      }

      if (userData.email === null || userData.phonenumber === null) {
        alert("Bro tried to pull a fast one on me");
        return setModal(1);
      }

      if (userData.password === null) {
        alert("Bro tried to pull a fast one on me");
        return setModal(2);
      }

      // Now we call the API
      postUserEndpoint(userData);
    }
  }, [submitData]);

  return (
    <>
      {modal === 0 ? (
        <SignupModal1
          modal={modal}
          setModal={setModal}
          userData={userData}
          setUserData={setUserData}
        />
      ) : modal === 1 ? (
        <SignupModal2
          modal={modal}
          setModal={setModal}
          userData={userData}
          setUserData={setUserData}
        />
      ) : modal === 2 ? (
        <SignupModal3
          modal={modal}
          setModal={setModal}
          userData={userData}
          setUserData={setUserData}
        />
      ) : (
        <SignupModal4
          modal={modal}
          setModal={setModal}
          setSubmitData={setSubmitData}
        />
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
