// Page.tsx
'use client'
import { Header } from '../components'
import { useState, useEffect } from 'react'
import { useWallet } from 'connectkit'
import Editor from '../components/Editor/TextEditor'
import { DropZone } from '../components/DropZone'
import CreateButton from '../components/CreateButton';
import useFileHandler from '../hooks/useFileHandler';

export default function Page() {
  const [isConnected, setIsConnected] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const { uploadedFile, editedFile, onDrop, onFileChange } = useFileHandler(setShowUpload, setShowEditor);

  const handleClick = () => {
    setShowUpload(true);
  }

  return (
    <>
      <Header onConnectionChange={setIsConnected} />
      <div className="flex justify-center items-center h-screen">
        {isConnected && !showUpload && !showEditor && 
          <CreateButton onClick={handleClick} />
        }
        {showUpload && (
          <main className="flex min-h- screen flex-col items-center justify-between p-24">
            <DropZone onDrop={onDrop} onFileChange={onFileChange} />
          </main>
        )}
        {showEditor && (
          <Editor />
        )}
      </div> 
    </>
  )
}
