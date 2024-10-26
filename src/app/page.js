"use client";
import Image from "next/image";
import styles from "./page.module.css";
import BasicButton from "./_components/BasicButton";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const onClickGetStart = () => {
    router.push("/main");
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/KakaoTalk_Photo_2024-10-26-08-08-46.png"
            alt="Example Image"
            width={350}
            height={350}
            style={{ marginTop: "150px" }} // 부모 요소의 top에서 200px 떨어지게 설정
          />
        </motion.div>
        {/* 버튼 확대 효과 */}
        <BasicButton
          text="Get Started"
          onClick={onClickGetStart}
          sx={{
            bottom: 150,
            position: "absolute",
            background: "linear-gradient(90deg, #489DFE, #409CC6)",
          }}
        />
      </div>
    </main>
  );
}
