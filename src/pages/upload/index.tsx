import type { NextPage } from "next";
// import axios from "@src/api/defaultAxios";
import axios from "axios";
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

const Upload: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [img, setImg] = useState();
  const imgInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  // const uploadChar = async () => {
  //   const result = await axios("character", "post");
  //   return result;
  // };
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
    // console.log(uploadName, img);
    // const result = uploadChar();
    // const result = await axios("character", "post", {
    //   name: "minsu",
    //   good: 0,
    //   bad: 0,
    //   img: "",
    // });

    const result = axios
      .post("http://localhost:3001/character", {
        id: 6,
        first_name: "Fred",
        last_name: "Blair",
        email: "freddyb34@gmail.com",
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(result);
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
    console.log(e);
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
      {/* <button
        onClick={() => {
          console.log(img);
        }}
      >
        지금 이미지
      </button> */}
    </>
  );
};

export default Upload;
