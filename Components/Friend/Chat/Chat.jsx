import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Style from './Chat.module.css'
import images from '../../../assets'
import { convertTime } from '@/Utils/apiFeature'
import { Loader } from '../../index'
import { useRouter } from 'next/router'

const Chat = ({
    functionName,
    readMessage,
    friendMsg,
    account,
    userName,
    loading,
    currentUserName,
    currentUserAddress
  }) => {

  const [message, setMessage] = useState('');
  const [chatData, setChatData] = useState({
    name: "",
    address: ""
  })

  const router = useRouter()

  useEffect(()=> {
    if(!router.isReady) return
    setChatData(router.query)
  })
     
  return (
    <div className={Style.Chat}>
      {currentUserName && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
          <Image src={images.accountName} alt="image" width={70} height={70}/>
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={Style.show}>
              {currentUserAddress}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            { friendMsg.map((el, i) => (
              <div>
                {el.sender === chatData.address ? (
                  <div className={Style.Chat_box_left_title}>
                    <Image 
                      src={images.accountName}
                      alt="image"
                      width={50}
                      height={50}
                    />
                    <span>
                      {chatData.name} {""}
                      <small>Time: {convertTime(el.timestamp)}</small>
                    </span>
                  </div>
                ) : (
                  <div className={Style.Chat_box_left_title}>
                    <Image 
                      src={images.accountName}
                      alt="image"
                      width={50}
                      height={50}
                    />
                    <span>
                      {userName} {""}
                      <small>Time: {convertTime(el.timestamp)}</small>
                    </span>
                  </div>
                )}

                <p key={i+1}>
                  {el.msg}
                  {""}
                  {""}
                </p>
              </div>
            ))}
          </div>
        </div>

        {currentUserName && currentUserAddress ? (
            <div className={Style.Chat_box_send}>
              <div className={Style.Chat_box_send_img}>
                <Image src={images.smile} alt="smile" width={50} height={50}/>
                <input 
                  type="text"
                  placeholder="type your message"
                  onChange={(e) => setMessage(e.target.value)}
                />

                <Image src={images.file} alt="file" width={50} height={50}/>

                {loading === true ? (
                  <Loader />
                ) : (
                  <Image 
                    src={images.send} 
                    alt="file" 
                    width={50} 
                    onClick={()=> functionName({ msg: message, address: chatData.address})}
                    height={50}/>
                )}
              </div>
            </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default Chat