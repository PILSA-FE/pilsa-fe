"use client";
import { useState } from "react";
import KakaoLogin from "@/components/KakaoLogin";
import Modal from "@/components/Modal";

const LoginPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <KakaoLogin />

      <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        모달 내용
      </Modal>
    </div>
  );
};
export default LoginPage;
