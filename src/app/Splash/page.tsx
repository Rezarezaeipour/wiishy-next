'use client'
import { Image } from "antd-mobile";


function Spalsh() {
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center ">
               <Image width={'300px'} height={'Auto'} alt="Wiishy, an ultimate wishlist" src="/wisshy.png"></Image>
               <p className="text-center font-bold text-xl">An ultimate wishlist</p>
            </div>
        </>
    );
}

export default Spalsh;