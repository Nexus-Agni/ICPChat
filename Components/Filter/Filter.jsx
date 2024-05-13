import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Style from './Filter.module.css'
import { Model } from "../index"
import { ChatAppContext } from '@/Context/ChatContext'
import images from '../../assets'

const Filter = () => {

  const { account, addFriends } = useContext(ChatAppContext)

  const [addFriend, setAddFriend] = useState(false)

  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
        <div className={Style.Filter_box_left_search}>
          <Image src={images.search} alt="image" width={20} height={20} />
          <input type="text" placeholder='search...'/>
        </div>
        </div>

        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20} />
            CLEAR
          </button>

          <button onClick={() => setAddFriend(true)}>
           <Image src={images.user} alt="clear" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>

      {addFriend && (
        <div className={Style.FIlter_model}>
        <Model 
          openBox={setAddFriend} 
          title="WELCOME TO"
          head= "Real Time Chat Application"
          info="Now Your Chat Became Secure by Web 3.0 Technology"
          smallInfo="Kindly select Your Friend name and address"
          images={images.hero}
          functionName={addFriends}
        />
      </div>
      )}
    </div>
  )
}

export default Filter