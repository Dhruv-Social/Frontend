import { FC, createContext } from "react";

import Navbar from "../components/navbar/navbar";
import Home from "../components/home/home";

interface IHomePageProps {}

const HomePage: FC<IHomePageProps> = ({}) => {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
};

export default HomePage;
