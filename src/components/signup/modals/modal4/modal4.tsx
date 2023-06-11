import "./modal4.scss";

import { FC, useState } from "react";

import DhruvSocial2 from "../../../../assets/blobs/dhruv_social2.png";

interface ISignUpModal4Props {
  modal: number;
  setModal: (modal: number) => void;
}

const SignupModal4: FC<ISignUpModal4Props> = ({ modal, setModal }) => {
  return (
    <main className="DHS__Signup">
      <img
        className="DHR__Signup__Modal4__Img1"
        src={DhruvSocial2}
        alt="Dhruv Social Blob 2"
      />

      <h1>Final Details</h1>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
        }}
      >
        <div>
          <label htmlFor="">Terms and Conditions</label>
          <article>
            <input type="checkbox" />
            <div>
              <p>Don't know them?</p>
              <a href="">Click here</a>
            </div>
          </article>
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
            Create Account
          </button>
        </section>
      </form>
    </main>
  );
};

export default SignupModal4;
