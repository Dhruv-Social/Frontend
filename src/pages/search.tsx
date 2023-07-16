import { FC } from "react";

import Navbar from "../components/navbar/navbar";
import Search from "../components/search/search";

interface ISearchPageProps {}

const SearchPage: FC<ISearchPageProps> = ({}) => {
  return (
    <>
      <Navbar />
      <Search />
    </>
  );
};

export default SearchPage;
