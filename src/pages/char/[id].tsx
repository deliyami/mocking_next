import type { NextPage } from "next";
import axios from "@src/helper/defaultAxios";
import { useRouter } from "next/router";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import Char from "@src/type/char";
import Image from "next/image";
import {
  onClickDelete,
  onClickHate,
  onClickLike,
} from "@src/helper/onClickCharHandler";

const Char: NextPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [char, setChar] = useState<Char>();
  useEffect(() => {
    const { id } = router.query;
    if (id && !query) setQuery(id as string);
  }, [router.query, query]);
  useEffect(() => {
    if (query) {
      axios("character", "get", {}, { id: query }).then((res) => {
        if (res && res.data) setChar(res.data[0]);
      });
    }
  }, [query]);

  return (
    <>
      <div>캐릭터 창</div>
      {char ? (
        <div>
          <div>캐릭터 번호: {char.id}</div>
          <div>캐릭터 이름: {char.name}</div>
          <div>좋아요: {char.like}</div>{" "}
          <button
            onClick={async (e) => {
              e.preventDefault();
              const data = await onClickLike(char.like, query);
              setChar(data);
            }}
          >
            좋아요 버튼
          </button>
          <div>싫어요: {char.hate}</div>{" "}
          <button
            onClick={async (e) => {
              e.preventDefault();
              const data = await onClickHate(char.hate, query);
              setChar(data);
            }}
          >
            싫어요 버튼
          </button>
          <div>삭제: </div>
          <button
            onClick={async (e) => {
              e.preventDefault();
              const data = await onClickDelete(query);
              if (data) router.push("/", undefined, {});
            }}
          >
            삭제 버튼
          </button>
          <hr />
          <div>캐릭터 모습</div>
          {char.img ? (
            <Image
              alt="preview"
              src={char.img}
              width={500}
              height={500}
            ></Image>
          ) : (
            <div>loading...</div>
          )}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default Char;
