"use client"

import Image from "next/image";
import { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import Header from "./Header";
import Processing from './Processing.js'
import { useRouter } from 'next/router';




const inter = Inter({ subsets: ["latin"] });

export default function FileUploader() {
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  const [file, setFile] = useState('')

  

  async function testApiEndpoint() {
    router.push('/Processing')

    const formData = new FormData();
    formData.append('file', file)

    try {
      const response = await fetch('https://5000-idx-pdfconverter-1726061683649.cluster-y34ecccqenfhcuavp7vbnxv7zk.cloudworkstations.dev/convert', {
        credentials: 'include', 
        method: 'POST',
        body: formData,
         });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);  
        router.push({
          pathname: '/Download',
          query: { fileUrl: url, fileName: 'converted-file.docx' }, // Pass the URL and file name
        });  

      } else {
        console.log('API reached but returned an error. Status:', response.status);
      }
    } catch (error) {
      console.log('No connection or network error:', error.message);
    }
  }
  
  const handfile = (event) => {
   const file_ = event.target.files[0];
   if ( file_ && file_.type === "application/pdf")
    {
      setFile(file_)

    } else {
      console.log('check your file')
    }
   
  }
  
 
  return (
    <main
      className={`flex justify-center p-8 mt-12 ${inter.className}`}
    > 
      <div className={'text-center mx-auto px-4 sm:px-6 lg:px-8'}>
    <h1 className={'text-6xl sm:text-5xl md:text-6xl font-bold'}>Convert Pdf to word</h1>
    <p className={'mt-4 max-w-lg font-medium text-current  mx-auto'}>Easily upload your PDF document by dragging it into the box above or clicking to select it from your device.</p>
    <div className={'mt-6 '}>
    <input className={'p-4  border border-gray-300 rounded-lg bg-white text-gray-700'} type="file" name="file" onChange={handfile} />
    <button type="submit" onClick={testApiEndpoint}  className={'p-3 bg-red-500 text-white rounded-lg  m-3 '}>Upload your file</button>
    </div>

    </div>
    <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
