"use client";
import { Image, Rate } from 'antd-mobile';
import './style.module.css'
import '@/app/globals.css'
import { Product } from '@/types';

function MyProductCard(props : Product) {
    
    return (
        <div className="p-2 pb-7 rounded-[10px]">
            <Image alt={props.gift_name || 'image name'} className="rounded-[10px]" src='/book.jpg' ></Image>
            <div>
                <h2 className='font-bold text-md mt-5'>
                   { props.gift_name || 'Macbook Air M2 15'} 
                </h2>
                <div className='flex flex-row mt-2 align-middle justify-between'>
                    <p className='text-sm font-normal'>{ props.gift_price || '$1400'} </p>
                    <Rate style={{ '--star-size': '12px' }} readOnly value={props.desire_rate || 4} className='pt-0.5' />
                </div>
            </div>
        </div>
    );
}

export default MyProductCard;