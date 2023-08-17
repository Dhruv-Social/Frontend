import "./modal3.scss";

import { FC, useEffect, useRef, useState } from "react";
import { IUser } from "../../signupInterface";

import DhruvSocial6 from "../../../../assets/blobs/dhruv_social6.png";

interface ISignUpModal3Props {
  modal: number;
  setModal: (modal: number) => void;
  userData: IUser;
  setUserData: (modal: IUser) => void;
}

const SignupModal3: FC<ISignUpModal3Props> = ({
  modal,
  setModal,
  userData,
  setUserData,
}) => {
  let password = useRef(null);
  let passwordConfirm = useRef(null);

  useEffect(() => {
    (password.current! as any).value = userData.password;
    (passwordConfirm.current! as any).value = userData.password;
  }, []);

  let verifyPasswordMatch = (): boolean => {
    let passowrdText = (password.current! as any).value;
    let passwordConfirmText = (passwordConfirm.current! as any).value;

    if (passowrdText !== passwordConfirmText) {
      return false;
    }

    return true;
  };

  let handleFormSubmit = () => {
    let userSignupData = {
      password: (passwordConfirm.current! as any).value,
    };

    // Set the data
    setUserData({
      username: userData.username,
      displayName: userData.displayName,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      phonenumber: userData.phonenumber,
      password: userSignupData.password,
    });
  };

  return (
    <main className="DHS__Signup">
      <img
        className="DHR__Signup__Modal3__Img1"
        src={DhruvSocial6}
        alt="Dhruv Social Blob 6"
      />

      <h1>Make your account secure</h1>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          if (verifyPasswordMatch()) {
            setModal(modal + 1);
            handleFormSubmit();
            return;
          }

          alert("Passwords do not match");
        }}
      >
        <div>
          <label htmlFor="">Password</label>
          <input type="text" ref={password} required />
        </div>

        <div>
          <label htmlFor="">Confirm Password</label>
          <input type="text" ref={passwordConfirm} required />
        </div>

        <section>
          <button
            onClick={() => {
              setModal(modal - 1);
            }}
          >
            Back
          </button>
          <button>Next</button>
        </section>
      </form>
    </main>
  );
};

export default SignupModal3;
