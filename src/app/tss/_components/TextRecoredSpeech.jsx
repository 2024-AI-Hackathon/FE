"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, TextField, Paper } from "@mui/material";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import MicOffIcon from "@mui/icons-material/MicOff";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function TextRecordSpeech() {
  const [isRecording, setIsRecording] = useState(false);
  const [socket, setSocket] = useState(null);
  const [text, setText] = useState(""); // 사용자 입력 텍스트

  useEffect(() => {
    let interval;

    if (isRecording && socket && socket.readyState === WebSocket.OPEN) {
      interval = setInterval(() => {
        if (text) {
          socket.send(text); // 3초마다 작성한 텍스트를 서버로 전송
          console.log("Sent to server:", text);
        }
      }, 3000);
    }

    // isRecording이 false가 되면 interval을 정리
    return () => clearInterval(interval);
  }, [isRecording, text, socket]);

  const handleRecordClick = () => {
    if (!isRecording) {
      // 녹음을 시작할 때 소켓을 연결하고 "start" 전송
      const ws = new WebSocket("ws://localhost:8000/ws/tts");
      setSocket(ws);

      ws.onopen = () => {
        console.log("WebSocket connected");
        // ws.send("tts 시작"); // 서버로 시작 신호 전송
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } else {
      // 녹음을 중지할 때 "stop" 전송하고 소켓 닫기
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send("tts 종료"); // 서버로 종료 신호 전송
        // socket.close(); // WebSocket 닫기
        setSocket(null);
      }
    }
    setIsRecording((prev) => !prev); // 녹음 상태 토글
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 414,
        margin: "0 auto",
        paddingTop: 2,
      }}
    >
      {/* 상단 이미지 */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <IconButton
          // onClick={toggleRecording}
          sx={{
            width: 150,
            height: 150,
            color: isRecording ? "red" : "gray", // isRecording에 따라 색상 변경
          }}
        >
          {isRecording ? (
            <SendIcon sx={{ fontSize: 150 }} />
          ) : (
            <ChatBubbleOutlineIcon sx={{ fontSize: 150 }} />
          )}
        </IconButton>
      </Box>

      {/* 텍스트 설명 */}
      <Typography variant="h6" gutterBottom>
        채팅을 통해 음성을 전달하세요 !
      </Typography>

      {/* 녹음 버튼 */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<SendIcon />}
        onClick={handleRecordClick}
        sx={{
          width: 120,
          height: 40,
          borderRadius: 20,
          backgroundColor: isRecording ? "red" : "#333", // 녹음 중이면 빨간색
          color: "#fff",
          marginBottom: 3,
          "&:hover": {
            backgroundColor: isRecording ? "darkred" : "#555", // 호버 시 색상도 변경
          },
        }}
      >
        Record
      </Button>

      {/* 텍스트 입력 영역 */}
      <Paper
        sx={{
          width: "90%",
          padding: 2,
          borderRadius: 2,
          height: 200,
        }}
        elevation={0} // Paper의 테두리 제거
      >
        <TextField
          fullWidth
          placeholder="텍스트를 입력하세요..."
          multiline
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)} // 입력 변경 감지
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
        />
      </Paper>
    </Box>
  );
}

export default TextRecordSpeech;
