import "./modal1.scss";

import { FC, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import DhruvSocial3 from "../../../../assets/blobs/dhruv_social3.png";
import DhruvSocial6 from "../../../../assets/blobs/dhruv_social6.png";

import { IUserModal1 } from "../../signupInterface";

interface ISignUpModal1Props {
  modal: number;
  setModal: (modal: number) => void;
  setUserDataModal1: (modal: IUserModal1) => void;
}

const SignupModal1: FC<ISignUpModal1Props> = ({ modal, setModal }) => {
  const navigate = useNavigate();

  // Data from the form
  let username = useRef(null);
  let displayName = useRef(null);
  let firstname = useRef(null);
  let lastname = useRef(null);

  let handleFormSubmit = () => {
    console.log((username.current! as any).value);

    let userSignupData = {
      username: (username.current! as any).value,
      displayName: (displayName.current! as any).value,
      firstname: (firstname.current! as any).value,
      lastname: (lastname.current! as any).value,
    };
  };

  return (
    <main className="DHS__Signup">
      <img
        className="DHR__Signup__Modal1__Img1"
        src={DhruvSocial3}
        alt="Dhruv Social Blob 3"
      />

      <img
        className="DHR__Signup__Modal1__Img2"
        src={DhruvSocial6}
        alt="Dhruv Social Blob 6"
      />

      <h1>What do we call you?</h1>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
        }}
      >
        <div>
          <label htmlFor="">Username</label>
          <input type="text" ref={username} />
        </div>

        <div>
          <label htmlFor="">Display Name</label>
          <input type="text" ref={displayName} />
        </div>

        <div>
          <label htmlFor="">Firstname</label>
          <input type="text" ref={firstname} />
        </div>

        <div>
          <label htmlFor="">Lastname</label>
          <input type="text" ref={lastname} />
        </div>

        <section>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              setModal(modal + 1);
              handleFormSubmit();
            }}
          >
            Next
          </button>
        </section>
      </form>
    </main>
  );
};

export default SignupModal1;
