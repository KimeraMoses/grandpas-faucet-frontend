import React from 'react';
import FaqCard from './FaqCard';

const Faq = () => {
  return (
      <>
      <FaqCard FaqOpen={true} FaqTitle="What is a Faucet?" />
      <FaqCard FaqOpen ={false} FaqTitle="How much can I get?"/>
      <FaqCard FaqOpen ={false} FaqTitle="How to earn much more?"/>
      </>
  );
};

export default Faq;
