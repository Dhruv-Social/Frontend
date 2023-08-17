import "./modal4.scss";

import { FC, useState } from "react";

import DhruvSocial2 from "../../../../assets/blobs/dhruv_social2.png";

interface ISignUpModal4Props {
  modal: number;
  setModal: (modal: number) => void;
  setSubmitData: (submit: boolean) => void;
}

const SignupModal4: FC<ISignUpModal4Props> = ({
  modal,
  setModal,
  setSubmitData,
}) => {
  const [agreed, setAgreed] = useState<boolean>(false);

  const onButtonClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(event.target.checked);
  };

  const onSubmit = () => {
    if (!agreed) {
      return alert("You need to press the agree button");
    }

    setSubmitData(true);
  };

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

          onSubmit();
        }}
      >
        <div>
          <label htmlFor="">Terms and Conditions</label>
          <section>
            <input type="checkbox" onChange={onButtonClick} />
            <article>
              <p>Dont know them?</p>
              <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0">
                Click Here
              </a>
            </article>
          </section>
        </div>

        <section>
          <button
            onClick={() => {
              setModal(modal - 1);
            }}
          >
            Back
          </button>
          <button>Create Account</button>
        </section>
      </form>
    </main>
  );
};

export default SignupModal4;
