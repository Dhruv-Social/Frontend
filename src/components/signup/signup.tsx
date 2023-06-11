import "./signup.scss";

import { FC, useState } from "react";

import DhruvSocial3 from "../../assets/blobs/dhruv_social3.png";
import DhruvSocial6 from "../../assets/blobs/dhruv_social6.png";

// Modals
import SignupModal1 from "./modals/modal1/modal1";
import SignupModal2 from "./modals/modal2/modal2";
import SignupModal3 from "./modals/modal3/modal3";
import SignupModal4 from "./modals/modal4/modal4";

interface ISignUpProps {}

const Signup: FC<ISignUpProps> = ({}) => {
  let [modal, setModal] = useState<number>(0);

  return (
    <main className="DHS__Signup">
      {modal === 0 ? (
        <SignupModal1 modal={modal} setModal={setModal} />
      ) : modal === 1 ? (
        <SignupModal2 modal={modal} setModal={setModal} />
      ) : modal === 2 ? (
        <SignupModal3 modal={modal} setModal={setModal} />
      ) : (
        <SignupModal4 modal={modal} setModal={setModal} />
      )}
    </main>
  );
};

export default Signup;
