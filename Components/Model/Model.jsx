import React, { useState, useContext } from 'react'
import Image from "next/image"
import Style from './Model.module.css'
import image from '../../assets'
import { ChatAppContext } from '@/Context/ChatContext'
import { loader } from '../../Components/index'

const Model = ({openBox, title, head, info, smallInfo, images, address, functionName}) => {
 
  const [name, setName] = useState("")
  const [accountAddress, setAccountAddress] = useState("")

  const { loading } = useContext(ChatAppContext)

  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={images} alt="buddy" width={700} height={700}/>
        </div>
        <div className={Style.Model_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>

          { loading === true ? (
            <Loader />
          ) : (
            <div className={Style.Model_box_right_name}>
            <div className={Style.Model_box_right_name_info}>
              <Image src={image.username} alt="user" width={30} height={30} />
              <input type='text' placeholder='Your Name' onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className={Style.Model_box_right_name_info}>
              <Image src={image.account} alt="user" width={30} height={30} />
              <input type='text' placeholder={address || "Enter Address..."} onChange={(e) => setAccountAddress(e.target.value)}/>
            </div>

            <div className={Style.Model_box_right_name_btn}>
              <button onClick={() => functionName({name, accountAddress})}>
                <Image src={image.send} alt="send" width={30} height={30}/>
                {""}
                Submit
              </button>

              <button onClick={() => openBox(false)}>
                <Image src={image.close} alt="send" width={30} height={30}/>
                {""}
                Cancel
              </button>
            </div>
          </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Model