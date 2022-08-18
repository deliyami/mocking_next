import type { NextPage } from "next";
import axios from "@src/api/defaultAxios";

const Home: NextPage = () => {
  // const submitHandler = (e: any) => {
  //   e.preventDefault();
  //   const result = axios("todos", "delete").then((res) => {
  //     console.log(res);
  //   });
  // };
  return (
    <>
      <div>인기 캐릭터</div>
    </>
  );
};

export default Home;
