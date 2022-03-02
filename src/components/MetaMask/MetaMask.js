import React, { useState, useEffect } from "react";
//====COMPONENT IMPORTS====//
import Button from "../Button/Button";
import "../SignIn/SignIn.css";

//====MATIC IMPORTS====//
import Web3 from "web3";
import WalletConnectProvider from "@maticnetwork/walletconnect-provider";
import { CreateWallet } from "../../store/Actions/AuthActions";
import { useSelector, useDispatch } from "react-redux";
import { isConnected } from "../../store/Slices/authSlice";
const config = {
  posRootERC20: "0x655F2166b0709cd575202630952D71E2bB0d61Af",
  posChildERC20: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
  posWETH: "0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323",
  rootChainWETH: "0x60D4dB9b534EF9260a88b0BED6c486fe13E604Fc",
  plasmaWETH: "0x4DfAe612aaCB5b448C12A591cD0879bFa2e51d62",
  plasmaRootERC20: "0x3f152B63Ec5CA5831061B2DccFb29a874C317502",
  plasmaChildERC20: "0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e",
  MATIC_RPC: "https://rpc-mumbai.matic.today",
  ETHEREUM_RPC: "https://goerli.infura.io/v3/541999c8adbc4c3594d03a6b7b71eda6",
  VERSION: "mumbai",
  NETWORK: "testnet",
  MATIC_CHAINID: 80001,
  ETHEREUM_CHAINID: 5,
};

const MetaMask = () => {
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user, token, apiToken } = useSelector((state) => state.auth);
  const uuid = user && user.uuid;

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      // await window.ethereum.enable();
      await window.ethereum.send('eth_requestAccounts');
    } else if (window.web3) {
      // window.web3 = new Web3(window.web3.currentProvider);
      window.web3 = new Web3(window.ethereum);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  useEffect(() => {
    const createWallet = (account) => {
      dispatch(CreateWallet(account, uuid, token, apiToken));
      dispatch(isConnected(account));
    };

    if (account.length > 10) {
      createWallet(account);
    }
  }, [account,uuid, token,apiToken, dispatch]);

  const loadBlockchainData = async () => {
    setLoading(true);
    new WalletConnectProvider({
      host: config.MATIC_RPC,
      // callbacks: {
      //   onConnect: console.log("matic connected"),
      //   onDisconnect: console.log("matic disconnected!"),
      // },
    });

    new WalletConnectProvider({
      host: config.ETHEREUM_RPC,
      // callbacks: {
      //   onConnect: console.log("mainchain connected"),
      //   onDisconnect: console.log("mainchain disconnected"),
      // },
    });

    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();

    if (networkId === config.ETHEREUM_CHAINID) {
      setLoading(false);
    } else if (networkId === config.MATIC_CHAINID) {
      setLoading(false);
    } else {
      // window.alert(" switch to  Matic or Ethereum network");
    }

    if (accounts) {
      localStorage.setItem("Address", accounts[0]);
    }
  };
  const initConnection = async () => {
    await loadWeb3();
    await loadBlockchainData();
  };

  return (
    <Button
      onClick={() => {
        initConnection();
      }}
    >
      {loading ? `Connecting...` : `Connect MetaMask Wallet`}
    </Button>
  );
};

export default MetaMask;
