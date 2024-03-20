"use client";
import { useState, useEffect } from "react";
import WithHeaderLayout from "@/components/WithHeaderLayout";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import BottomSheet from "@/components/BottomSheet";
import Modal from "@/components/Modal";

interface ICategorieyList {
  categories: ICategoryItem[];
}
interface ICategoryItem {
  categoryCd: number;
  categoryName: string;
  description: string;
}

const ChallengePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    textContents: "",
    file: null as any,
    author: "",
    publisher: "",
    category: [] as any,
  });
  const { title, textContents, file, author, publisher, category } = formData;
  const [previewURL, setPreviewURL] = useState<any>(null);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [imageNumber, setImageNumber] = useState(0);
  const [categoryList, setCategoryList] = useState<any>([]);
  const dueDate = ["1주", "2주", "30일", "직접 설정"];
  const [step, setStep] = useState(1);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/pilsa/category`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const categories = res.data.categories; // "categories" 키에서 배열을 추출
        setCategoryList(categories);
      })
      .catch((error) => {
        console.log("!", error);
      });
  }, []);

  const handleCategoryClick = (category: number) => {
    // 클릭한 항목이 이미 선택되었다면 제거, 아니면 추가
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item: number) => item !== category)
      );
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  return (
    <WithHeaderLayout>
      <div
        className="flex flex-col h-full justify-between px-4"
        style={{ minHeight: "calc(100vh - 72px)" }}
      >
        <div>
          <div className="flex justify-between items-center w-[360px] h-14 px-4 py-3 border-t-0 border-r-0 border-b border-l-0 border-[#efefef]">
            <div className="flex justify-start items-center flex-grow relative gap-1">
              <Image
                width={24}
                height={24}
                alt="back"
                src="/icons/ibtn_back.png"
                className="flex-grow-0 flex-shrink-0 w-6 h-6 relative cursor-pointer"
              />
              <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-black">
                챌린지 만들기
              </p>
            </div>
          </div>
          <div className="mt-2 flex flex-col justify-start items-start gap-2 px-4">
            <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-0.5 py-0.5">
              <div className="flex-grow-0 flex-shrink-0 w-[108px] h-1 rounded-[90px] bg-[#00c37d]" />
              <div
                className={`flex-grow-0 flex-shrink-0 w-[108px] h-1 rounded-[90px] ${
                  step >= 2 ? "bg-[#00c37d]" : "bg-[#c4c4c4]"
                } `}
              />
              <div
                className={`flex-grow-0 flex-shrink-0 w-[108px] h-1 rounded-[90px] ${
                  step == 3 ? "bg-[#00c37d]" : "bg-[#c4c4c4]"
                } `}
              />
            </div>

            {/* step 1 */}
            <div
              className={`flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[328px] gap-2 ${
                step === 1 ? "" : "hidden"
              }`}
            >
              <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1.5 py-2">
                <p className="self-stretch flex-grow-0 flex-shrink-0 w-[328px] text-lg font-bold text-left text-[#353535]">
                  어떤 필사를 도전할까요?
                </p>
                <p className="self-stretch flex-grow-0 flex-shrink-0 w-[328px] text-xs text-left text-[#777]">
                  최대 3개까지 선택할 수 있어요
                </p>
              </div>
              <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 w-[328px] gap-2 px-2 rounded-xl">
                <ul className="flex flex-wrap items-center justify-center gap-2.5 px-2">
                  {Object.entries<ICategoryItem>(categoryList).map(
                    ([key, category]) => (
                      <li
                        className={`px-3 py-1.5 border border-[#E3E3E3] rounded-[100px] cursor-pointer ${
                          selectedCategories.includes(category?.categoryCd)
                            ? "bg-[#00C37D]"
                            : ""
                        }`}
                        key={key}
                        onClick={() => handleCategoryClick(category.categoryCd)}
                      >
                        <span
                          className={`text-sm text-[#999] ${
                            selectedCategories.includes(category.categoryCd)
                              ? "text-white font-semibold"
                              : "font-light"
                          }`}
                        >
                          {category.categoryName}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            {/* step 1 */}

            {/* step 2 */}
            <div
              className={`flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[328px] gap-2 ${
                step === 2 ? "" : "hidden"
              }`}
            >
              <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1.5 py-2">
                <p className="self-stretch flex-grow-0 flex-shrink-0 w-[328px] text-lg font-bold text-left text-[#353535]">
                  얼마동안 챌린지 할까요 ?
                </p>
              </div>
              <div className="grid gap-4 grid-cols-2 grid-rows-2">
                {dueDate &&
                  dueDate.map((index) => (
                    <div
                      className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-40 h-[49px] relative gap-2.5 p-4 rounded-xl border border-[#e3e3e3]"
                      key={index}
                    >
                      <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#353535]">
                        {index}
                      </p>

                      <input
                        id={index}
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={index}
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {index}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
            {/* step 2 */}
          </div>
        </div>
        <div
          className={`flex items-end justify-end ${step === 1 ? "" : "hidden"}`}
        >
          <button
            type="submit"
            disabled={selectedCategories.length === 0}
            onClick={() => {
              setStep(2);
            }}
            className={`mt-5 mb-5 w-full py-4 rounded-lg text-white text-center ${
              selectedCategories.length === 0 ? "bg-[#E3E3E3]" : "bg-[#00C37D]"
            } text-sm font-bold`}
          >
            다음
          </button>
        </div>
      </div>
    </WithHeaderLayout>
  );
};
export default ChallengePage;
