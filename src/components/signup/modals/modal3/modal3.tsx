import "./modal3.scss";

import { FC, useState } from "react";

import DhruvSocial6 from "../../../../assets/blobs/dhruv_social6.png";

interface ISignUpModal3Props {
  modal: number;
  setModal: (modal: number) => void;
}

const SignupModal3: FC<ISignUpModal3Props> = ({ modal, setModal }) => {
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
        }}
      >
        <div>
          <label htmlFor="">Password</label>
          <input type="text" />
        </div>

        <div>
          <label htmlFor="">Confirm Password</label>
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

export default SignupModal3;
