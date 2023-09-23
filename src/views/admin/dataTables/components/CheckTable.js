import React, { useMemo, useState, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import ProductEditModal from "./ProductEditModal";
import axios from "axios";

export default function CheckTable() {
  const columnsData = useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "PRICE",
        accessor: "price",
      },
      {
        Header: "QUANTITY",
        accessor: "quantity",
      },
      {
        Header: "DATE",
        accessor: "date",
      },
    ],
    []
  );

  // 데이터를 가져오는 함수
  const fetchData = async () => {
    try {
      const response = await axios.get("http://10.10.10.111:8080/your-api-endpoint"); // API 엔드포인트를 수정하세요.
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, []); 

  const [tableData, setTableData] = useState([
    {
      name: "테스트 상품 1",
      price: 100,
      quantity: 10,
      date: "2023-09-13",
    },
    {
      name: "테스트 상품 2",
      price: 200,
      quantity: 20,
      date: "2023-09-14",
    },
    // 더 많은 더미 상품 데이터를 추가할 수 있습니다.
  ]);

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = tableInstance;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({}); // 수정된 데이터를 관리하는 상태

  const handleProductEdit = (updatedProductData) => {
    // 수정된 데이터를 새로운 배열로 만듭니다.
    const updatedTableData = tableData.map((product) => {
      if (product.name === updatedProductData.name) {
        return {
          ...product,
          price: updatedProductData.price,
          quantity: updatedProductData.quantity,
          date: updatedProductData.date,
        };
      }
      return product;
    });
  
    // 새로운 배열을 상태로 설정합니다.
    setTableData(updatedTableData);
    setIsEditModalOpen(false);
  };

  // onClose 함수 정의
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleEditSelectedRows = (rowData) => {
    setSelectedProduct(rowData);
    setIsEditModalOpen(true);
  };

  const deleteSelectedRows = async (productId) => {
    try {
      // 선택한 상품의 ID를 사용하여 백엔드에서 해당 상품을 삭제합니다.
      await axios.delete(`http://10.10.10.111:8080/product/${productId}`);
      
      // 삭제가 성공하면 프론트엔드에서도 해당 상품을 삭제합니다.
      const updatedTableData = tableData.filter((row) => row.id !== productId);
      setTableData(updatedTableData);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Check Table
        </Text>
        <Menu />
      </Flex>
      <Flex justify="space-between" align="center">
        <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe="10px"
                    key={index}
                    borderColor={borderColor}
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "NAME") {
                      data = (
                        <Flex align="center">
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "PRICE") {
                      data = (
                        <Flex align="center">
                          <Text
                            me="10px"
                            color={textColor}
                            fontSize="sm"
                            fontWeight="700"
                          >
                            {cell.value}
                          </Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "QUANTITY") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "DATE") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor="transparent"
                      >
                        {data}
                      </Td>
                    );
                  })}
                  <Td fontSize="14px" minW="auto" borderColor="transparent">
                    <Button
                      onClick={() => handleEditSelectedRows(row.original)}
                      colorScheme="blue"
                      size="sm"
                      mr="2"
                    >
                      수정
                    </Button>
                    <Button
  onClick={() => deleteSelectedRows(row.original.id)} // 상품의 ID를 전달
  colorScheme="red"
  size="sm"
>
  삭제
</Button>

                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        {/* 팝업 컴포넌트 */}
        <ProductEditModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          productData={selectedProduct}
          onSave={handleProductEdit}
        />
      </Flex>
    </Card>
  );
}
