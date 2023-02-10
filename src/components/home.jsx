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
  useEffect(() => {
    const getRecentBlocks = async () => {
      const blockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(blockNumber);
      for (i = blockNumber; i >= blockNumber - 10; i--) {
        const block = await alchemy.core.getBlock(i);
      }
    };
  });

  return <div className="App">Block Number: {blockNumber}</div>;
}
