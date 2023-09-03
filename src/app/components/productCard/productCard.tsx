"use client";
import { Image, Rate } from 'antd-mobile';
import './style.module.css'
import '@/app/globals.css'

function ProductCard() {
    return (
        <div className="p-2 pb-12 rounded-[10px] bg-white">
            <Image alt='book' className="rounded-[10px]" src='/book.jpg'></Image>
            <div>
                <h2 className='font-bold text-md mt-5'>
                    Macbook Air M2 15
                </h2>
                <div className='flex flex-row mt-2 align-middle justify-between'>
                    <p className='text-sm font-normal'>$1400</p>
                    <Rate style={{ '--star-size': '12px' }} readOnly value={4} className='pt-0.5' />
                </div>
            </div>
        </div>
    );
}

export default ProductCard;