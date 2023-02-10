import { Alchemy, Network } from "alchemy-sdk";
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
} from "@chakra-ui/react";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

export function Home() {
  const [blockNumber, setBlockNumber] = useState();
  const [recentBlocks, setRecentBlocks] = useState();
  const [recentTransactions, setRecentTransaction] = useState();
  useEffect(() => {
    const blockArray = [];
    const transactionArray = [];

    const getRecentBlocks = async () => {
      const blockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(blockNumber);
      for (let i = blockNumber; i >= blockNumber - 20; i--) {
        const block = await alchemy.core.getBlock(i);
        blockArray.push(block);
      }
      setRecentBlocks(blockArray);
      console.log("recentBlocks", recentBlocks);
    };

    const getRecentTransactions = async () => {
      const { transactions } = await alchemy.core.getBlockWithTransactions(
        blockNumber
      );
      for (let i = 0; i <= 10; i++) {
        transactionArray.push(transactions[i]);
      }
      setRecentTransaction(transactionArray);
      console.log("recentTransaction", recentTransactions);
    };

    getRecentBlocks();
    getRecentTransactions();
  }, []);

  return (
    <Box backgroundColor={"gray.900"} color={"white"} h={window.innerHeight}>
      <Center fontSize="30px" fontWeight="black" paddingBottom={3}>
        Ethereum Block Explorer
      </Center>
      <hr />
      {!recentBlocks || !recentTransactions ? (
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
        <Flex
          flexDirection="row"
          justifyContent={"space-evenly"}
          paddingTop={"3"}
        >
          <TableContainer
            overflowY="auto"
            maxHeight="630px"
            borderBottom={"2px solid white"}
          >
            <Table variant="simple" size="lg">
              <TableCaption
                placement="top"
                fontSize={"20px"}
                fontWeight={"bold"}
              >
                Latest Blocks
              </TableCaption>
              <Tbody>
                {recentBlocks.map((block, i) => {
                  return (
                    <Tr key={i}>
                      <Td>Block {block.number}</Td>
                      <Td>Fee recipient {block.miner.slice(1, 16)}...</Td>
                      <Td>
                        <Badge> {block.transactions.length} Txs</Badge>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>

          <TableContainer
            overflowY="auto"
            maxHeight="630px"
            borderBottom={"2px solid white"}
          >
            <Table variant="simple" size="lg">
              <TableCaption
                placement="top"
                fontSize={"20px"}
                fontWeight={"bold"}
              >
                Latest Transactions
              </TableCaption>
              <Tbody>
                {recentTransactions.map((transaction, i) => {
                  return (
                    <Tr key={i}>
                      <Td> {transaction.hash.slice(0, 16)}...</Td>
                      <Td>
                        From: {transaction.from.slice(0, 16)}...
                        <br />
                        To: {transaction.to.slice(0, 16)}...
                      </Td>
                      <Td>Tx</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      )}
    </Box>
  );
}
