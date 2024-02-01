"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const AuthPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const changeCodeToToken = useCallback(
    async (code: string) => {
      const res = await axios.post(
        "http://223.130.135.113:8080/api/v1/login",
        {
          socialType: "KAKAO",
          authCode: code,
          isLocal: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        getProfile();
      } else {
        router.push("/404");
      }
    },
    [router]
  );

  const getProfile = useCallback(async () => {
    const res = await axios.get("http://223.130.135.113:8080/api/v1/member");
    if (res.data) {
      const { id, nickName, imageUrl, description, status } = res.data;
      localStorage.setItem("userId", id);
      localStorage.setItem("nickName", nickName);
      localStorage.setItem("userImage", imageUrl);
      localStorage.setItem("description", description);
      router.push("/");
    } else {
      router.push("/404");
    }
  }, [router]);

  useEffect(() => {
    const authCode = searchParams.get("code");
    if (authCode) changeCodeToToken(authCode);
  }, [searchParams]);

  return (
    <div className="spinner">
      <h2>
        잠시만 기다려 주세요!
        <br />
        로그인 중입니다.
      </h2>
    </div>
  );
};
export default AuthPage;
