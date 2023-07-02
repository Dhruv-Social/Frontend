import { FC, Suspense, useContext } from "react";

import Navbar from "../components/navbar/navbar";
import Home from "../components/home/home";

interface IHomePageProps {}

const HomePage: FC<IHomePageProps> = ({}) => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<h2>Loading...</h2>}>
        <Home />
      </Suspense>
    </>
  );
};

export default HomePage;
