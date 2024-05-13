import React, { useContext, useState } from 'react'
import Style from './Navbar.module.css'
import { ChatAppContext } from '@/Context/ChatContext'
import Link from "next/link"
import Image from "next/image"
import { Model, Error } from '..'
import images from '../../assets'

const Navbar = () => {

    const [active, setActive] = useState(2)
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { account, userName, connectWallet, createAccount, error  } = useContext(ChatAppContext)

    const menuItems = [
        {
            menu: "All Users",
            link: "alluser",
        },
        {
            menu: "CHAT",
            link: "/",
        },
        {
            menu: "CONTACT",
            link: "/",
        },
        {
            menu: "SETTING",
            link: "/",
        },
        {
            menu: "FAQs",
            link: "/",
        },
        {
            menu: "TERMS OF USE",
            link: "/",
        },
    ]

    return (
        <div className={Style.fullScreenBackground}>
            <div className={Style.Navbar}>
                <div className={Style.Navbar_box}>
                    <div className={Style.Navbar_box_left}>
                        <Image src={images.logo} alt="logo" width={50} height={50}/>
                    </div>
                    <div className={Style.Navbar_box_right}>
                        <div className={Style.Navbar_box_right_menu}>
                            {menuItems.map((el,i) => (
                                <div
                                    onClick={()=> setActive(i+1)}
                                    key={i+1}
                                    className={`${Style.Navbar_box_right_menu_items} ${active == i+1 ? Style.active_btn : ""}`}
                                >
                                    <Link className={Style.Navbar_box_right_menu_items_link} href={el.link}>
                                        {el.menu}
                                    </Link>
                                </div>
                            ))}
                        </div>

                        { open && (
                            <div className={Style.mobile_menu}>
                                {menuItems.map((el,i) => (
                                    <div
                                        onClick={()=> setActive(i+1)}
                                        key={i+1}
                                        className={`${Style.mobile_menu_items} ${active == i+1 ? Style.active_btn : ""}`}
                                    >
                                        <Link className={Style.mobile_menu_items_link} href={el.link}>
                                            {el.menu}
                                        </Link>
                                    </div>
                                ))}

                                <p 
                                    className={Style.mobile_menu_btn}
                                >
                                    <Image src={images.close} alt="close" width={50} height={50} onClick={()=>setOpen(false)}/>
                                </p>
                            </div>
                        )}

                        <div className={Style.Navbar_box_right_connect}>
                            {account == "" ? (
                                <button onClick={()=>connectWallet()}>
                                    {""}
                                    <span>Connect Wallet</span>
                                </button>
                            ) : (
                                <button onClick={() => setOpenModal(true)}>
                                    {""}
                                    <Image 
                                        src={userName ? images.accountName : images.create2} 
                                        alt="Account image"
                                        width={20}
                                        height={20}
                                    />
                                    {""}
                                    <small>{userName || "Create Account" }</small>
                                </button>
                            )}
                        </div>

                        <div
                            className={Style.Navbar_box_right_open}
                            onClick={() => setOpen(true)}
                        >
                            <Image src={images.open} alt="open" width={30} height={30} />
                        </div>
                    </div>
                </div>

                {openModal && (
                    <div className={Style.modelBox}>
                        <Model 
                            openBox={setOpenModal} 
                            title="WELCOME TO"
                            head= "Real Time Chat Application"
                            info="Now Your Chat Became Secure by Web 3.0 Technology"
                            smallInfo="Kindly select your name"
                           
                             images ={images.hero}
                            functionName={createAccount}
                            address={account}
                        />
                    </div>
                )}
                {error == "" ? "" : <Error error={error} />}
            </div>
        </div>
    )
} 

export default Navbar
