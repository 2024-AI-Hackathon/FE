import React from "react";
import Button from "@mui/material/Button";

function BasicButton({ text, onClick, sx }) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        width: 211.12,
        height: 50.08,
        borderRadius: 20,
        ...sx, // 전달된 sx 스타일을 덮어쓰기
      }}
    >
      {text}
    </Button>
  );
}

export default BasicButton;
