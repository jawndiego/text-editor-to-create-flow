'use client'

import { Header } from '../components'
import { useState } from 'react'
import { useWallet } from 'connectkit'

export default function Page() {
  const [isConnected, setIsConnected] = useState(false);
  return (
    <>
      <Header onConnectionChange ={setIsConnected}/>
      <div className="flex justify-center items-center h-screen">
      {isConnected && <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded justify-center">create</button>}
      </div>
    </>
  )
}
