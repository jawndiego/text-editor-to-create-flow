// useFileHandler.ts
import { useState } from 'react';

const useFileHandler = (setShowUpload: (show: boolean) => void, setShowEditor: (show: boolean) => void) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [editedFile, setEditedFile] = useState<string | null>(null);
  
    const onDrop = (files: File[]) => {
      if (files.length > 0) {
        setUploadedFile(files[0]);
        setShowUpload(false);
        setShowEditor(true);
      }
    };
  
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedFile(e.target?.result as string)
        setShowUpload(false);
        setShowEditor(true);
      };
      reader.readAsText(file)
    }
  };

  return { uploadedFile, editedFile, onDrop, onFileChange };
};

export default useFileHandler;
