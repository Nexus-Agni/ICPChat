import React, { useState, useEffect, createContext } from 'react'

import { CheckIfWalletIsConnected, ConnectWallet, ConnectingWithContract } from "@/Utils/apiFeature";
import { useRouter } from 'next/router';

export const ChatAppContext = createContext();

export const ChatAppProvider = ({children}) => {

    const [account, setAccount] = useState("")
    const [userName, setUserName] = useState("")
    const [friendLists, setFriendLists] = useState([])
    const [friendMsg, setFriendMsg] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [userLists, setUserLists] = useState([])
    const [error, setError] = useState("")

    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("")

    const router = useRouter()

    const fetchData = async () => {
        try {
            const contract = await ConnectingWithContract()

            const connectAccount = await ConnectWallet()
            setAccount(connectAccount);

            const userName = await contract.getUsername(connectAccount);
            setUserName(userName)

            const friendList = await contract.getMyFrriendList();
            setFriendLists(friendList)

            const userLists = await contract.getAllAppUsers();
            setUserLists(userLists)
        } catch (error) {
            // setError("Please install and connect to metamask")
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const readMessage = async (friendAddress) => {
        try {
            const contract = await ConnectingWithContract();
            const read = await contract.readMessage(friendAddress)
            setFriendMsg(read)
        } catch (error) {
            SpeechSynthesisErrorEvent("Currently you have no message")
        }
    }

    const createAccount = async({name, accountAddress}) => {
        try {

            const contract = await ConnectingWithContract()
            const getCreatedUser = await contract.createAccount(name)
            setIsLoading(true)

            await getCreatedUser.wait()
            setIsLoading(false)
            window.location.reload()

        } catch (error) {
            setError("Error while creating your account please reload browser")
        }
    }

    const addFriends = async ({name, accountAddress}) => {
        try {
            // if (name || accountAddress) return setError("Name and AccountAddress cannot be empty")

            const contract = await ConnectingWithContract()
            const addMyFriend = await contract.addFriend(accountAddress, name)
            setIsLoading(true)

            await addMyFriend.wait()
            setIsLoading(false)
            router.push("/")
            window.location.reload()
 
        } catch (error) {
            setError("Something went wrong while adding friends")
        }
    }

    const sendMessage = async ({msg, address}) => {
        try {

            const contract = await ConnectingWithContract()
            const addMessage = await contract.sendMessage(address, msg)
            setIsLoading(true)

            await addMessage.wait()
            setIsLoading(false)
            window.location.reload()
 
        } catch (error) {
            setError("Please reload and try again")
        }
    }

    const readUser = async (userAddress) => {
        const contract = await ConnectingWithContract();
        const userName = await contract.getUsername(userAddress);
        setCurrentUserName(userName)
        setCurrentUserAddress(userAddress)
    };

    return (
        <ChatAppContext.Provider
            value={{
                readMessage,
                createAccount,
                addFriends,
                sendMessage,
                readUser,
                ConnectWallet,
                CheckIfWalletIsConnected,
                isLoading,
                currentUserAddress,
                account,
                userLists,
                userName,
                friendLists,
                friendMsg,
                currentUserName,
                error
            }}
        >
            {children}
        </ChatAppContext.Provider>
    )
}
