type accountType = {
  address: string[];
  privateKey: string[];
}

import { Web3 } from 'web3';

export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string, num: number) => {
  return `${addr.substring(0, num)}...`;
};

export const createNewWallet = (num: number) => {
  let accounts: accountType = { address: [], privateKey:[] };
  const web3 = new Web3('https://polygon-amoy-bor-rpc.publicnode.com');
  for(let i=0; i<num; i++){
    const account = web3.eth.accounts.create();
    accounts.address.push(account.address);
    accounts.privateKey.push(account.privateKey)
  }
  return accounts
}