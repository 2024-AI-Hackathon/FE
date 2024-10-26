"use client";
import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useRouter } from "next/navigation";

function BottomNavBar() {
  const router = useRouter();
  const [value, setValue] = useState(0);

  const onClickGoTts = () => {
    router.push("/tss");
  };

  const onClickGoTrans = () => {
    router.push("/translate");
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)", // 가로 중앙 정렬
        width: 414, // 넓이 고정
        height: 80,
        borderRadius: "15px 15px 0 0",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="" icon={<span />} />
        <BottomNavigationAction
          label="Profile"
          onClick={onClickGoTrans}
          icon={<PersonIcon />}
        />
      </BottomNavigation>

      {/* 가운데 FAB 버튼 */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={onClickGoTts}
        sx={{
          position: "absolute",
          top: -30,
          left: "50%",
          transform: "translateX(-50%)",
          width: 60,
          height: 60,
        }}
      >
        <AddIcon />
      </Fab>
    </Paper>
  );
}

export default BottomNavBar;
