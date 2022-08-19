import type { NextPage } from "next";
import axios from "@src/helper/defaultAxios";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  MouseEvent,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { AxiosResponse } from "axios";

const Upload: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState();
  const imgInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const uploadName = name.trim();
    if (uploadName.length === 0) {
      alert("이름을 제대로 입력해주세요");
      return;
    }
    if (!img) {
      alert("이미지를 입력해주세요");
      return;
    }
    const result: AxiosResponse<any, any> | void = await axios(
      "character",
      "post",
      {
        name: uploadName,
        like: 0,
        hate: 0,
        img,
      }
    );

    if (result && result.status === 201) {
      alert("캐릭터가 생성되었습니다");
      router.push(`/char/${result.data.id}`, undefined, {});
    } else {
      alert("에러가 발생했습니다.");
    }
  };

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImg(reader.result);
        resolve();
      };
    });
  };
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const target = e.target;
    if (target.files && target.files.length > 0) {
      encodeFileToBase64(target.files[0]);
    }
  };

  const onFileButtonClickHandler: MouseEventHandler<HTMLInputElement> = (
    e: MouseEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    imgInput.current?.click();
  };
  return (
    <>
      <div>캐릭터 업로드</div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="캐릭터 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          ref={imgInput}
          onChange={onChangeHandler}
          accept="image/gif, image/jpeg, image/png"
          hidden
        />
        <input
          type="button"
          onClick={onFileButtonClickHandler}
          value="이미지 삽입"
        />
        {img && (
          <Image alt="preview" src={img} width={500} height={500}></Image>
        )}

        <input type="submit" value="업로드" />
      </form>
    </>
  );
};

export default Upload;
