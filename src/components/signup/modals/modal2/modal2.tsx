import "./modal2.scss";

import { FC, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DhruvSocial2 from "../../../../assets/blobs/dhruv_social2.png";
import DhruvSocial6 from "../../../../assets/blobs/dhruv_social6.png";

import { IUser } from "../../signupInterface";

interface ISignUpModal2Props {
  modal: number;
  setModal: (modal: number) => void;
  userData: IUser;
  setUserData: (modal: IUser) => void;
}

const SignupModal2: FC<ISignUpModal2Props> = ({
  modal,
  setModal,
  userData,
  setUserData,
}) => {
  let email = useRef(null);
  let phonenumber = useRef(null);

  useEffect(() => {
    (email.current! as any).value = userData.email;
    (phonenumber.current! as any).value = userData.phonenumber;
  }, []);

  let handleFormSubmit = () => {
    let userSignupData = {
      email: (email.current! as any).value,
      phoneNumber: (phonenumber.current! as any).value,
    };

    // Set the data
    setUserData({
      username: userData.username,
      displayName: userData.displayName,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userSignupData.email,
      phonenumber: userSignupData.phoneNumber,
      password: null,
    });
  };

  return (
    <main className="DHS__Signup">
      <img
        className="DHR__Signup__Modal2__Img1"
        src={DhruvSocial2}
        alt="Dhruv Social Blob 2"
      />

      <img
        className="DHR__Signup__Modal2__Img2"
        src={DhruvSocial6}
        alt="Dhruv Social Blob 6"
      />

      <h1>How can we contact you?</h1>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          setModal(modal + 1);
          handleFormSubmit();
        }}
      >
        <div>
          <label htmlFor="">Email</label>
          <input type="email" ref={email} required />
        </div>

        <div>
          <label htmlFor="">Phone Number</label>
          <input type="text" ref={phonenumber} required />
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

export default SignupModal2;
