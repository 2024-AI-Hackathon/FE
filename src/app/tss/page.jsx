import React from "react";
import styles from "./tss.module.css";
import TextRecordSpeech from "./_components/TextRecoredSpeech";
const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.appContainer}>
        <TextRecordSpeech />
      </div>
    </div>
  );
};

export default Page;
