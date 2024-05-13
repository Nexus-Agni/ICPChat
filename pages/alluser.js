import React, { useState, useEffect, useContext } from "react"

import { UserCard } from "../Components/index"
import Style from '../styles/AllUsers.module.css'
import { ChatAppContext } from "@/Context/ChatContext"

const allusers = () => {

  const { userLists, addFriends } = useContext(ChatAppContext)

  return (
    <div>
      <div className={Style.alluser_info}>
        <h1>Find Your Friends</h1>
      </div>

      <div className={Style.alluser}>
        {userLists.map((el, i) => (
            <UserCard key={i+1} el={el} i={i} addFriends={addFriends}/>
        ))}
      </div>
    </div>
  )
}

export default allusers