import "./modal2.scss";

import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import DhruvSocial2 from "../../../../assets/blobs/dhruv_social2.png";
import DhruvSocial6 from "../../../../assets/blobs/dhruv_social6.png";

interface ISignUpModal2Props {
  modal: number;
  setModal: (modal: number) => void;
}

const SignupModal2: FC<ISignUpModal2Props> = ({ modal, setModal }) => {
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
        }}
      >
        <div>
          <label htmlFor="">Email</label>
          <input type="email" />
        </div>

        <div>
          <label htmlFor="">Phone Number</label>
          <input type="text" />
        </div>

        <section>
          <button
            onClick={() => {
              setModal(modal - 1);
            }}
          >
            Back
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

export default SignupModal2;
