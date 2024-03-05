"use client";

import WithHeaderLayout from "@/components/WithHeaderLayout";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@/components/Modal";

export interface IProfileFormProps {
  imageUrl: string;
  nickName: string;
  description: string;
}

const ProfileEditPage = () => {
  const router = useRouter();
  const { profile, setProfile, setIsSigned } = useAuth();
  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken");
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<IProfileFormProps>({
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      imageUrl: profile?.imageUrl,
      nickName: profile?.nickName,
      description: profile?.description,
    });
  }, []);

  const onClickLogout = () => {
    setIsOpen(true);
  };

  const Logout = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("profile");
      localStorage.removeItem("accessToken");
    }
    setIsSigned(false);
    router.push("/");
  };
  const onSubmit = async (data: IProfileFormProps) => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/member`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (res.status === 200 && profile) {
      setProfile({
        ...profile,
        imageUrl: data.imageUrl,
        nickName: data.nickName,
        description: data.description,
      });
      localStorage.setItem(
        "profile",
        JSON.stringify({
          ...profile,
          imageUrl: data.imageUrl,
          nickName: data.nickName,
          description: data.description,
        })
      );
      alert("수정 성공");
    }
  };
  return (
    <WithHeaderLayout>
      <div
        className="flex flex-col h-full justify-between px-4"
        style={{ minHeight: "calc(100vh - 72px)" }}
      >
        <div className="mt-4 px-4">
          <h3 className="text-lg font-bold">프로필 편집</h3>
          <br />
          <div className="grid place-items-center">
            <div className="flex-grow-0 flex-shrink-0 w-[88px] h-[88px] relative rounded-full bg-[#ededed]">
              <img
                className="w-full h-full rounded-full overflow-hidden"
                src={profile?.imageUrl}
                alt="profile"
              />

              <Image
                src="/icons/camera.png"
                width={24}
                height={24}
                alt="이미지삭제"
                onClick={() => {
                  alert("zz");
                }}
                className="w-6 h-6 absolute left-16 top-16"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="mt-5 mb-2 font-medium text-[#131313] text-sm">
              닉네임
            </p>
            <p className="mt-5 mb-2 font-medium text-[#777777] text-sm">
              {profile?.nickName.length} / 10
            </p>
          </div>
          <input
            type="text"
            id="nickName"
            {...register("nickName")}
            maxLength={10}
            className="border-[#e3e3e3] p-3 rounded-lg border w-full resize-none text-center text-base text-[#353535] h-[50px]"
          />
          <p className="mt-5 mb-2 font-medium text-[#131313] text-sm">
            소개 한 마디
          </p>
          <textarea
            id="description"
            {...register("description")}
            maxLength={100}
            placeholder="소개 한 마디를 써 보세요:)"
            className="border-[#e3e3e3] p-3 rounded-lg border w-full resize-none text-xs text-[#353535] h-[100px]"
          />
        </div>
        <div className="flex items-end justify-end">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="mt-5 mb-5 w-full py-4 rounded-lg text-white text-center bg-[#00C37D] text-sm font-bold"
          >
            적용하기
          </button>
          {/* <div
            className="flex items-center gap-x-1 cursor-pointer"
            onClick={onClickLogout}
          >
            <Image
              src="/icons/logout_icon.svg"
              width={16}
              height={16}
              alt="logout"
            />
            <span className="text-[#999] font-bold">로그아웃</span>
          </div> */}
        </div>
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        confirmEvent={Logout}
        title="정말 로그아웃할까요?"
        content="가지 마세요..."
        confirmButton="로그아웃하기"
        closeButton="닫기"
      />
    </WithHeaderLayout>
  );
};
export default ProfileEditPage;
