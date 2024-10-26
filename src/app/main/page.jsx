import React from "react";
import styles from "./main.module.css";
import VoiceRecordingScreen from "./_components/VoiceRecordingScreen";
const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.appContainer}>
        <VoiceRecordingScreen />
      </div>
    </div>
  );
};

export default Page;
