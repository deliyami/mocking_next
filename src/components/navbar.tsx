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
    console.log(name);
    router.push(`/search/${name}`, undefined, {});
    // router.replace(`search/${name}`);
  };
  return (
    <>
      <Link href={"/"}>홈</Link>
      <Link href={"/upload"}>업로드</Link>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="캐릭터 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" value="검색" />
      </form>
    </>
  );
};

export default Navbar;
