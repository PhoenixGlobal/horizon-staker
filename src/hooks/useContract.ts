import { useState, useEffect } from "react";
import { Contract, ContractInterface } from "ethers";
import erc20Abi from "@abis/erc20.json";
import hznAbi from "@abis/HZN.json";
import { Erc20, HZN } from "@abis/types";
import useWallet from "@hooks/useWallet";
import { TokenAddresses, Token } from "@utils/constants";

const useContract = (
  address: string,
  abi: ContractInterface,
  writable: boolean = false
) => {
  const { provider } = useWallet();
  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    if (address && provider) {
      if (writable) {
        setContract(new Contract(address, abi, provider.getSigner()));
      } else {
        setContract(new Contract(address, abi, provider));
      }
    }
  }, [address, abi, provider, writable]);

  return contract;
};

export const useERC20 = (address: string, writable: boolean = false) => {
  return useContract(address, erc20Abi, writable) as Erc20;
};

export const usePHB = (writable: boolean = false) => {
  return useERC20(TokenAddresses[Token.PHB], writable);
};

export const useHZN = (writable: boolean = false) => {
  return useContract(TokenAddresses[Token.HZN], hznAbi, writable) as HZN;
};

export default useContract;
