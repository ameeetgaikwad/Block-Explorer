import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "./home";
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

const { Utils } = require("alchemy-sdk");

export function Address() {
  const { id } = useParams();
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const getBalance = async () => {
      const balance = await alchemy.core.getBalance(id, "latest");
      setBalance(Utils.formatEther(balance));
    };
    getBalance();
  }, [id]);
  return (
    <Box>
      <Flex flexDirection="row" justifyContent={"start"} paddingTop={"3"}>
        <TableContainer
          overflowY="auto"
          maxHeight="630px"
          borderBottom={"2px solid white"}
        >
          <Table variant="striped" size="lg" w={window.innerWidth}>
            <TableCaption placement="top" fontSize={"20px"} fontWeight={"bold"}>
              Address
            </TableCaption>
            <Tbody>
              <Tr>
                <Td>Address:</Td>
                <Td>{id}</Td>
              </Tr>
              <Tr>
                <Td>Balance:</Td>
                <Td>{balance.slice(0, 6)}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
}
