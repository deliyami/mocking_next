import { Button, Input } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, FormEvent, FormEventHandler, useState } from "react";

const Navbar: FC = () => {
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    router.push(`/search/${name}`, undefined, {});
  };
  return (
    <>
      <Link href={"/"}>
        <Button>홈</Button>
      </Link>
      <Link href={"/upload"}>
        <Button>업로드</Button>
      </Link>
      <form onSubmit={onSubmitHandler}>
        <Input
          type="text"
          placeholder="캐릭터 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit">검색</Button>
      </form>
    </>
  );
};

export default Navbar;
