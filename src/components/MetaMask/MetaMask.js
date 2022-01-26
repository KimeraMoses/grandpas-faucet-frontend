import React,{useState,useEffect} from "react";
import "../SignIn/SignIn.css";
import Web3 from "web3";
import Button from "../Button/Button";
import WalletConnectProvider from "@maticnetwork/walletconnect-provider";
// const config = require("./../../config.json");
const MaticPoSClient = require("@maticnetwork/maticjs").MaticPOSClient;
const Network = require("@maticnetwork/meta/network");
const Matic = require("@maticnetwork/maticjs");


const config = {
  "posRootERC20": "0x655F2166b0709cd575202630952D71E2bB0d61Af",
  "posChildERC20": "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
  "posWETH": "0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323",
  "rootChainWETH": "0x60D4dB9b534EF9260a88b0BED6c486fe13E604Fc",
  "plasmaWETH": "0x4DfAe612aaCB5b448C12A591cD0879bFa2e51d62",
  "plasmaRootERC20": "0x3f152B63Ec5CA5831061B2DccFb29a874C317502",
  "plasmaChildERC20": "0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e",
  "MATIC_RPC": "https://rpc-mumbai.matic.today",
  "ETHEREUM_RPC": "https://goerli.infura.io/v3/541999c8adbc4c3594d03a6b7b71eda6",
  "VERSION": "mumbai",
  "NETWORK": "testnet",
  "MATIC_CHAINID": 80001,
  "ETHEREUM_CHAINID": 5
}

const MetaMask = () => {
  const [Networkid, setNetworkid] = useState(0);
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [burnHash, setBurnHash] = useState("");
  const [maticProvider, setMaticProvider] = useState();
  const [ethereumprovider, setEthereumProvider] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    setLoading(true);
    const maticProvider = new WalletConnectProvider({
      host: config.MATIC_RPC,
      callbacks: {
        onConnect: console.log("matic connected"),
        onDisconnect: console.log("matic disconnected!"),
      },
    });

    const ethereumProvider = new WalletConnectProvider({
      host: config.ETHEREUM_RPC,
      callbacks: {
        onConnect: console.log("mainchain connected"),
        onDisconnect: console.log("mainchain disconnected"),
      },
    });

    setMaticProvider(maticProvider);
    setEthereumProvider(ethereumProvider);
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();

    setNetworkid(networkId);

    if (networkId === config.ETHEREUM_CHAINID) {
      setLoading(false);
    } else if (networkId === config.MATIC_CHAINID) {
      setLoading(false);
    } else {
      window.alert(" switch to  Matic or Ethereum network");
    }
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);
  return <Button>Connect MetaMask Wallet </Button>;
};

export default MetaMask;
