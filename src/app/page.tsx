'use client'
import { Header } from '../components'
import { useState } from 'react'
import { useWallet } from 'connectkit'
import EditorWrapper from '../components/Editor/TextEditor'
import { DropZone } from '../components/DropZone'
import CreateButton from '../components/CreateButton';

type MyDragEvent = React.DragEvent<HTMLDivElement>;

export default function Page() {
  const [isConnected, setIsConnected] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [editedFile, setEditedFile] = useState<string | null>(null);


  const onDrop = (files: File[]) => {
    // Handle the files array here
    // For example, you can set the first file to the uploadedFile state
    if (files.length > 0) {
      setUploadedFile(files[0]);
      setShowUpload(false); // Hide the upload UI
      setShowEditor(true);
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle the file upload here
    const file = event.target.files && event.target.files[0];
    if (file) {
      setShowUpload(false); // Hide the upload UI
      setShowEditor(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedFile(e.target?.result as string)
      };
      reader.readAsText(file)
    }
  };

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
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <DropZone onDrop={onDrop} onFileChange={onFileChange} />
          </main>
        )}
        {showEditor && (
          <EditorWrapper />
        )}
      </div> 
    </>
  )
}