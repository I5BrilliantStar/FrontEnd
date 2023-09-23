import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";

export default function TotalSpent(props) {
  const { productCount, productCountB, defectiveCount, ...rest } = props;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [cameraColor, setCameraColor] = useState("teal"); // 초기 색상을 teal로 설정

  useEffect(() => {
    if (productCount > 0) {
      // 상품 개수가 1 이상일 때 초록색으로 설정
      setCameraColor("green");

      // 1초 후에 다시 teal(기본)로 설정
      setTimeout(() => {
        setCameraColor("teal");
      }, 500); // 1000밀리초 (1초)
    }
  }, [productCount]);

  useEffect(() => {
    if (productCountB > 0) {
      // 상품 개수가 1 이상일 때 초록색으로 설정
      setCameraColor("green");

      // 1초 후에 다시 teal(기본)로 설정
      setTimeout(() => {
        setCameraColor("teal");
      }, 500); // 1000밀리초 (1초)
    }
  }, [productCountB]);

  useEffect(() => {
    if (defectiveCount > 0) {
      // 불량품 개수가 1 이상일 때 빨간색으로 설정
      setCameraColor("red");

      // 1초 후에 다시 teal(기본)로 설정
      setTimeout(() => {
        setCameraColor("teal");
      }, 500); // 1000밀리초 (1초)
    }
  }, [defectiveCount]);

  // 카메라 버튼 클릭 시 실행할 함수
  const handleCameraButtonClick = () => {
    // 이 곳에 카메라 버튼 클릭 시 실행할 로직을 추가하세요.
    console.log("카메라 버튼을 클릭했습니다.");
    // 여기에서 원하는 동작을 수행합니다.
  };

  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      mb="0px"
      {...rest}
    >
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          장비 모니터링
        </Text>
      </Flex>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Button
          colorScheme={cameraColor} // 상태에 따라 변경된 색상을 사용
          onClick={() => {
            if (cameraColor === "teal") {
              // 초록색일 때만 동작
              handleCameraButtonClick();
            }
          }}
          isDisabled={cameraColor === "teal"} // 초록색일 때만 클릭 가능
        >
          카메라
        </Button>
      </Flex>
    </Card>
  );
}
