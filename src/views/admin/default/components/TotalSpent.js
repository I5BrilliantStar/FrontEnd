import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import RobotArm from "assets/img/dashboards/robotArm.gif";
import StopRail1 from "assets/img/dashboards/stopArm1.png";


export default function TotalSpent(props) {
  const { ...rest } = props;

  const [isRobotArmVisible, setIsRobotArmVisible] = useState(false);

  // 함수를 사용하여 클릭 시 이미지를 토글합니다.
  const toggleImage = () => {
    setIsRobotArmVisible(!isRobotArmVisible);
  };


  const textColor = useColorModeValue("secondaryGray.900", "white");
 
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
      <Button onClick={toggleImage}>
        Toggle Image
      </Button>
      </Flex>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Image src={isRobotArmVisible ? RobotArm : StopRail1} alt="Current Image" />
      </Flex>
    </Card>
  );
}

