import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { ChatAddress, ChatAbi } from '@/Context/Constants';

export const CheckIfWalletIsConnected = async () => {
    try {
        if(!window.ethereum) return alert("Please install Metamask")

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
    });

        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error)
    }
}

export const ConnectWallet = async () => {
    try {
        if(!window.ethereum) return alert("Please install Metamask")

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
    });

        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error)
    }
}

export const ConnectingWithContract = async() => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(
            ChatAddress,
            ChatAbi,
            signer
        )

        return contract;
    } catch (error) {
        console.log(error)
    }
}

export const convertTime = (time) => {
    const newTime = new Date(time.toNumber());

    const realTime = newTime.getHours() + 
    "/" + newTime.getMinutes() + "/" + 
    newTime.getSeconds() + 
    " Date:" + newTime.getDate() + "/" + (newTime.getMonth() + 1) + 
    "/" + newTime.getFullYear();

    return realTime;
}

