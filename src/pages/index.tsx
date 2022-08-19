import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Char from "@src/type/char";
import CharTable from "@src/components/charTable";
import { getCharacter } from "@src/helper/getCharacter";

const Home: NextPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [chars, setChars] = useState<Char[]>();
  useEffect(() => {
    const name = "Home";
    if (name) setQuery(name as string);
  }, [router.query, query]);
  useEffect(() => {
    if (query) {
      getCharacter({ name_like: "" }).then((res) => {
        if (res) setChars(res);
      });
    }
  }, [query]);
  return (
    <>
      <div>인기 캐릭터</div>
      {chars && chars.length > 0 ? (
        <CharTable chars={chars}></CharTable>
      ) : (
        <div>등록 캐릭터 없음</div>
      )}
    </>
  );
};

export default Home;
