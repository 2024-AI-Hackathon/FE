import React from "react";
import Header from "../_components/Header";
import styles from "./layout.module.css";
import BottomNavBar from "../_components/BottomNavBar";

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <BottomNavBar />
    </div>
  );
};

export default layout;
