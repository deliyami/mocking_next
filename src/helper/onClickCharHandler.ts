import axios from "@src/helper/defaultAxios";

const onClickLike = async (like: number, query: string) => {
  const result = await axios(
    `character/${query}`,
    "patch",
    { like: like + 1 },
    {}
  );
  if (result) return result.data;
};

const onClickHate = async (hate: number, query: string) => {
  const result = await axios(
    `character/${query}`,
    "patch",
    { hate: hate + 1 },
    {}
  );
  if (result) return result.data;
};

const onClickDelete = async (query: string) => {
  const result = await axios(`character/${query}`, "delete", {}, {});
  return result && result.status === 200;
};

export { onClickLike, onClickHate, onClickDelete };
