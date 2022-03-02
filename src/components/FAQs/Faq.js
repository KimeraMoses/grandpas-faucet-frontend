import React from 'react';
import FaqCard from './FaqCard';

const desc = `A cryptocurrency faucet is a tool that gives users of a blockchain a very small amount of crypto to perform basic transactions. Just like you need a stamp to send mail, when it comes to cryptocurrencies, you need ${"'gas'"} . Gas is usually the native blockchain's coin like Ethereum, BNB, or Matic`
const desc_2 = "Each week, you can claim up to $1 worth of crypto as gas using this faucet. This faucet is only available to WhiteboardCrypto Club members, and you can split the weekly $1 allowance up into any of the listed chains"

const Faq = () => {
  return (
      <>
      <FaqCard FaqOpen={true} FaqTitle="What is a Faucet?" FaqContent={desc}/>
      <FaqCard FaqOpen ={false} FaqTitle="How much can I get?" FaqContent={desc_2}/>
      <FaqCard FaqOpen ={false} FaqTitle="How do I use it?" video={true}/>
      </>
  );
};

export default Faq;
