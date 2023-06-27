import React from 'react';

type UploadBoxProps = {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UploadBox: React.FC<UploadBoxProps> = ({ onFileChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        onFileChange(event);
        console.log(event)
      }
    };
  
    return (
      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
        <span>Upload a file</span>
        <input id="file-upload" name="file-upload" type="file" accept=".txt,.md,.mp4,image/*" className="sr-only" onChange={handleChange}></input>
      </label>
    );
  };
  
  
  