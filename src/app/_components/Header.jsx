"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
const Header = () => {
  const router = useRouter();
  const onClickGoSst = () => {
    router.push("/main");
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        // backgroundColor: "#ECECEC",
        width: 414, // 넓이 고정
        left: "50%", // 가로 중앙 정렬
        transform: "translateX(-50%)", // 좌표 기준 중앙 맞춤
      }}
    >
      <Toolbar>
        {/* 왼쪽 메뉴 아이콘 */}
        <IconButton
          edge="start"
          onClick={onClickGoSst}
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* 중앙 제목 */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          <i></i>
        </Typography>

        {/* 오른쪽 계정 아이콘 */}
        <IconButton edge="end" color="inherit" aria-label="account">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
