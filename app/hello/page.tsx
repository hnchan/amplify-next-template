'use client'

import { useState, ChangeEvent } from 'react';
import { uploadData } from 'aws-amplify/storage';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('No file selected');
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(selectedFile);

    fileReader.onload = async (event) => {
      try {
        if (event.target && event.target.result) {
            await uploadData({
            data: event.target.result as ArrayBuffer,
            path: `picture-submissions/${selectedFile.name}`
            });
        }
        console.log('Upload successful');
      } catch (error) {
        console.error('Upload failed:', error);
      }
    };
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
