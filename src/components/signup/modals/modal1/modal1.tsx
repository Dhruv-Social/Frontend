import "./modal1.scss";

import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import DhruvSocial3 from "../../../../assets/blobs/dhruv_social3.png";
import DhruvSocial6 from "../../../../assets/blobs/dhruv_social6.png";

interface ISignUpModal1Props {
  modal: number;
  setModal: (modal: number) => void;
}

const SignupModal1: FC<ISignUpModal1Props> = ({ modal, setModal }) => {
  const navigate = useNavigate();

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
          <input type="text" />
        </div>

        <div>
          <label htmlFor="">Display Name</label>
          <input type="text" />
        </div>

        <div>
          <label htmlFor="">Firstname</label>
          <input type="text" />
        </div>

        <div>
          <label htmlFor="">Lastname</label>
          <input type="text" />
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
