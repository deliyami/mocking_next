import type { NextPage } from "next";
import axios from "@src/api/defaultAxios";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  // const submitHandler = (e: any) => {
  //   e.preventDefault();
  //   const result = axios("todos", "delete").then((res) => {
  //     console.log(res);
  //   });
  // };
  const router = useRouter();
  useEffect(() => {
    console.log(router);
  }, []);
  return (
    <>
      <div>검색 캐릭터</div>
    </>
  );
};

export default Home;
