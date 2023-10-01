import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler() {
    // res.status(200).json({ message: 'success' });
    const res = await fetch('https://api.example.com/...')
    
    if (!res.ok) {
       
        throw new Error('Failed to fetch data')
    }

    return res.json()
}