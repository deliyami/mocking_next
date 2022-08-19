import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Char from "@src/type/char";
import CharTable from "@src/components/charTable";
import { getCharacter } from "@src/helper/getCharacter";

const Search: NextPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [chars, setChars] = useState<Char[]>();
  useEffect(() => {
    const { name } = router.query;
    if (name) setQuery(name as string);
  }, [router.query, query]);
  useEffect(() => {
    if (query) {
      getCharacter({ name_like: query }).then((res) => {
        if (res) setChars(res);
      });
    }
  }, [query]);
  return (
    <>
      <div>검색 캐릭터</div>
      {chars && chars.length > 0 ? (
        <CharTable chars={chars}></CharTable>
      ) : (
        <div>검색 결과 없음</div>
      )}
    </>
  );
};

export default Search;
