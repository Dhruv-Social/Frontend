import { FC, createContext, useEffect, useState } from "react";

import Navbar from "../components/navbar/navbar";
import Home from "../components/home/home";

interface IHomePageProps {}

export const TokenContext = createContext<string | null>(null);

const HomePage: FC<IHomePageProps> = ({}) => {
  return (
    <>
      <TokenContext.Provider value={sessionStorage.getItem("refreshToken")}>
        <Navbar />
        <Home />
      </TokenContext.Provider>
    </>
  );
};

export default HomePage;
