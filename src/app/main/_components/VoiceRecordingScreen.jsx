"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, TextField, Paper } from "@mui/material";
import Image from "next/image";
import MicIcon from "@mui/icons-material/Mic";
import { IconButton } from "@mui/material";
import MicOffIcon from "@mui/icons-material/MicOff";

function VoiceRecordingScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]); // 서버에서 받은 텍스트 저장

  const handleRecordClick = () => {
    if (!isRecording) {
      // 녹음을 시작할 때 소켓을 연결하고 "start" 전송
      const ws = new WebSocket("ws://localhost:8000/ws/speech-to-text/");
      setSocket(ws);

      ws.onopen = () => {
        console.log("WebSocket connected");
        ws.send("start"); // 서버로 시작 신호 전송
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data); // JSON 파싱
          console.log(data.text);
          if (data && data.text) {
            setMessages((prevMessages) => [...prevMessages, data.text]); // "text" 값만 추가
          }
        } catch (error) {
          console.error("Failed to parse message:", error);
        }
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
        socket.send("stop"); // 서버로 종료 신호 전송
        socket.close(); // WebSocket 닫기
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
            <MicIcon sx={{ fontSize: 150 }} />
          ) : (
            <MicOffIcon sx={{ fontSize: 150 }} />
          )}
        </IconButton>
      </Box>

      {/* 텍스트 설명 */}
      <Typography variant="h6" gutterBottom>
        마이크 버튼을 눌러 녹음을 시작해보세요.
      </Typography>

      {/* 녹음 버튼 */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<MicIcon />}
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
          placeholder="녹음 내용이 표시됩니다..."
          multiline
          rows={8}
          value={messages} // message 상태 값 설정
          variant="standard" // TextField의 테두리 제거
          InputProps={{
            disableUnderline: true,
          }}
        />
      </Paper>
    </Box>
  );
}

export default VoiceRecordingScreen;
