import React from "react";

// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";

// Custom components
import Card from "components/card/Card.js";
import {
  barChartDataDailyTraffic, // 이 부분은 요일별 총생산량 데이터로 업데이트해야 합니다.
  barChartOptionsDailyTraffic, // 이 부분도 요일별 총생산량 데이터의 옵션으로 업데이트해야 합니다.
} from "variables/charts";

// Assets
import { RiArrowUpSFill } from "react-icons/ri";

export default function DailyTraffic(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex justify='space-between' align='start' px='10px' pt='5px'>
        <Flex flexDirection='column' align='start' me='20px'>
          <Flex w='100%'>
            <Text
              me='auto'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              요일별 총생산량
            </Text>
          </Flex>
          <Flex align='end'>
            <Text
              color={textColor}
              fontSize='34px'
              fontWeight='700'
              lineHeight='100%'>
              {/* 요일별 총생산량 데이터를 여기에 표시하세요 */}
            </Text>
            <Text
              ms='6px'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              WO
            </Text>
          </Flex>
        </Flex>
        <Flex align='center'>
          <Icon as={RiArrowUpSFill} color='green.500' />
          <Text color='green.500' fontSize='sm' fontWeight='700'>
            {/* 증가율 데이터를 여기에 표시하세요 */}
          </Text>
        </Flex>
      </Flex>
      <Box h='240px' mt='auto'>
        <BarChart
          chartData={barChartDataDailyTraffic} // 요일별 총생산량 데이터로 업데이트해야 합니다.
          chartOptions={barChartOptionsDailyTraffic} // 요일별 총생산량 데이터의 옵션으로 업데이트해야 합니다.
        />
      </Box>
    </Card>
  );
}
