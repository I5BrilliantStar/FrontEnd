import React, { useState } from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

// Card 컴포넌트를 추가
import Card from "components/card/Card"; // 실제 경로에 맞게 수정해야 합니다.

export default function ChatTable() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMessages = [...messages, { text: newMessage }];
    setMessages(newMessages);
    setNewMessage("");
  };

  return (
    <Card
      direction="column"
      w="100%"
      p="20px" // 패딩 추가
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex
        px="25px"
        justify="space-between"
        mb="20px"
        align="center"
         // 제목과 구분하기 위해 테두리 추가
      >
      
      </Flex>
      <Table variant="simple" color="gray.500" mb="24px">
        <Tbody>
          {/* 데이터 부분을 비웠습니다 */}
        </Tbody>
      </Table>
      <Flex direction="column">
        <Flex mb="10px">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            mr="10px" // 입력 상자에 여백 추가
            flex="1" // 입력 상자가 확장되고 남은 공간을 차지할 수 있도록 설정
          />
          <Button
            onClick={sendMessage}
            bgColor="teal.400" // 버튼의 배경색 변경
            color="white" // 버튼 텍스트 색상 변경
          >
            보내기
          </Button>
        </Flex>
      </Flex>
      {messages.map((message, index) => (
        <div key={index} textAlign="left" mt="10px"> {/* 메시지 왼쪽 정렬 및 상단 여백 추가 */}
          <Text fontSize="14px" bgColor="teal.100" p="10px" borderRadius="5px">
            {message.text}
          </Text>
        </div>
      ))}
    </Card>
  );
}
