"use client";
import { useState } from "react";
import WithHeaderLayout from "@/components/WithHeaderLayout";
import Image from "next/image";
import axios from "axios";
import { blob } from "stream/consumers";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: null as any, // 추가: 파일 상태 추가
    author: "",
    publisher: "",
    category: [] as any,
  });
  const [previewURL, setPreviewURL] = useState<any>(null);

  const { title, content, file, author, publisher, category } = formData;

  const handleInputChange = (event: {
    target: { name: any; files?: any; value?: any };
  }) => {
    if (event.target.name === "filename") {
      setFormData({ ...formData, file: event.target.files[0] });
      const previewURL = URL.createObjectURL(event.target.files[0]);
      setPreviewURL(URL.createObjectURL(event.target.files[0]));
    } else if (event.target.name === "category") {
      console.log("카테고리 입력");
    } else {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const getImageUrl = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const imageData = new FormData();
    imageData.append("files", formData.file);
    console.log(formData.file);

    try {
      const response = await axios.post(
        "http://223.130.135.113:8080/api/v1/image",
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleSubmit(response.data[0].imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (imageUrl: string) => {
    const requestBody = {
      title: title,
      author: author,
      publisher: publisher,
      textContents: content,
      backgroundImageUrl: "",
      backgroundColor: "",
      categoryCd: [0],
      images: [{ imageUrl: imageUrl, thumbnail: "Y", imageSeq: 0 }],
    };
    try {
      const response = await axios.post(
        "http://223.130.135.113:8080/api/v1/pilsa",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("필사 작성이 완료되었습니다.");
      // 이후 페이지 전환
      document.location.href = "/";
    } catch (error) {
      console.error(error);
    }

    alert("stop");
  };

  const categoryList = [
    "시",
    "산문",
    "소설",
    "인문",
    "글귀",
    "확언",
    "외국어",
    "성경",
    "기타",
  ];
  return (
    <WithHeaderLayout>
      <form action="" className="mt-4">
        <div className="relative rounded-xl py-5 px-3 bg-[#F8F8F8]">
          <input
            type="text"
            className="text-xl bg-transparent border-none ring-0 focus:ring-0 focus:outline-none placeholder-[#999]"
            placeholder="제목"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
        </div>
        <hr className="my-4 border-[#EFEFEF]" />
        <label
          htmlFor="imageUpload"
          className="inline-flex items-center justify-center w-full p-4 rounded-lg bg-[#EBEBEB] gap-x-1 cursor-pointer"
        >
          <Image
            src="/icons/camera_icon.png"
            width={16}
            height={16}
            alt="camera"
          />
          <span className="text-[#6D6D6D] text-sm font-medium">
            {formData.file !== null
              ? previewURL && (
                  <Image
                    src={previewURL}
                    alt="미리보기"
                    width={100}
                    height={100}
                  />
                )
              : "사진으로 필사 올리기 (1장)"}
          </span>
          <input
            type="file"
            id="imageUpload"
            className="hidden" // 파일 입력 요소를 숨깁니다.
            name="filename"
            accept="image/*"
            onChange={handleInputChange} // 파일이 변경되었을 때 호출될 핸들러 함수
          />
        </label>
        <div className="my-3 rounded-xl py-5 px-4 h-[224px] w-full bg-[#F8F8F8]">
          <textarea
            name="content"
            id="content"
            className="bg-transparent w-full h-full resize-none focus:outline-none text-sm placeholder-[#999]"
            placeholder="필사 글 또는 이미지 필사의 내 생각을 입력해 주세요."
            value={content}
            onChange={handleInputChange}
          />
        </div>
        <p className="text-xs text-[#777]">
          * 최소한, 필사 글 또는 이미지 중 하나는 채워 주세요!
        </p>
        <hr className="my-4 border-[#EFEFEF]" />
        <div className="relative rounded-xl py-5 px-3 bg-[#F8F8F8]">
          <input
            type="text"
            className="text-sm bg-transparent border-none ring-0 focus:ring-0 focus:outline-none placeholder-[#999]"
            placeholder="출처(저자)"
            name="author"
            value={author}
            onChange={handleInputChange}
          />
        </div>
        <div className="relative rounded-xl py-5 px-3 bg-[#F8F8F8] mt-4">
          <input
            type="text"
            className="text-sm bg-transparent border-none ring-0 focus:ring-0 focus:outline-none placeholder-[#999]"
            placeholder="출판사"
            name="publisher"
            value={publisher}
            onChange={handleInputChange}
          />
        </div>
        <hr className="my-4 border-[#EFEFEF]" />
        <div className="flex flex-col items-center justify-center gap-y-3">
          <div className="flex items-center gap-x-0.5">
            <p className="text-sm text-[#777] font-semibold">카테고리</p>
            <span className="text-xs text-[#777]">(최대3개)</span>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-2.5 px-2">
            {categoryList.map((category) => (
              <li
                className="px-3 py-1.5 border border-[#E3E3E3] rounded-[100px]"
                key={category}
              >
                <span className="text-sm text-[#999] font-light">
                  {category}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-4 border-[#EFEFEF]" />
        <ul className="py-4 flex items-center justify-center px-2 gap-x-2.5">
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
          <li className="w-9 h-9 bg-[#E1F3E3] rounded-full"></li>
        </ul>
        <hr className="h-0.5 border-[#EFEFEF]" />
        <button
          type="submit"
          className="mt-10 mb-4 w-full py-4 rounded-lg text-white text-center bg-[#6D6D6D] text-sm font-bold"
          onClick={getImageUrl}
        >
          필사 올리기
        </button>
      </form>
    </WithHeaderLayout>
  );
};
export default CreatePage;
