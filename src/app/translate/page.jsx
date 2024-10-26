import React from "react";
import styles from "./translate.module.css";
import Translatebox from "./_components/TranslateBox";

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.appContainer}>
        <Translatebox />
      </div>
    </div>
  );
};

export default Page;
