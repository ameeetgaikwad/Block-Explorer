import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Heading,
  Container,
  CircularProgress,
  CircularProgressLabel,
  Box,
  Center,
  HStack,
  extendTheme,
  Text,
  Badge,
  Button,
  Tooltip,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { alchemy } from "./home";

export function TransactionHash() {
  const { id } = useParams();
  const [recentTransaction, setRecentTransactions] = useState();
  const [block, setBlock] = useState();
  useEffect(() => {
    const getTransaction = async () => {
      const recentTransaction = await alchemy.core.getTransactionReceipt(id);
      setRecentTransactions(recentTransaction);

      const block = await alchemy.core.getBlock(recentTransaction.blockNumber);

      setBlock(block);
    };
    getTransaction();
  }, [id]);
  return (
    <Box>
      {!recentTransaction || !block ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          h="100%"
          flexDirection="column"
        >
          <CircularProgress isIndeterminate color="green.300" size={"55px"} />
          <Text fontSize={"17px"}>Fetching data from Ethereum...</Text>
        </Flex>
      ) : (
        <Flex flexDirection="row" justifyContent={"start"} paddingTop={"3"}>
          <TableContainer
            overflowY="auto"
            maxHeight="630px"
            borderBottom={"2px solid white"}
          >
            <Table variant="striped" size="lg" w={window.innerWidth}>
              <TableCaption
                placement="top"
                fontSize={"20px"}
                fontWeight={"bold"}
              >
                #Transaction {id}
              </TableCaption>
              <Tbody>
                <Tr>
                  <Td>Transaction Hash:</Td>
                  <Td>{id}</Td>
                </Tr>
                <Tr>
                  <Td>TimeStamp:</Td>
                  <Td>{block.timestamp}</Td>
                </Tr>
                <Tr>
                  <Td>From:</Td>
                  <Td>{recentTransaction.from}</Td>
                </Tr>
                <Tr>
                  <Td>To:</Td>
                  <Td>{recentTransaction.to}</Td>
                </Tr>
                <Tr>
                  <Td>Gas Used:</Td>
                  <Td>{recentTransaction.gasUsed.toString()}</Td>
                </Tr>
                <Tr>
                  <Td>Gas Limit:</Td>
                  <Td>{block.gasLimit.toString()}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      )}
    </Box>
  );
}
