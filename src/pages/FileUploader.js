import Image from "next/image";
import { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import Header from "./Header";
import Processing from './Processing.js'
import { useRouter } from 'next/router';


const inter = Inter({ subsets: ["latin"] });

export default function FileUploader() {

  const router = useRouter();

  const [file, setFile] = useState('')


  const handfile = (event) => {
   const file_ = event.target.files[0];
   setFile(file_)
   router.push('/Processing');
  }
  const file_convert = new FormData()
  file_convert.append('file', file)
 

  return (
    <main
      className={`flex justify-center p-8 mt-20 ${inter.className}`}
    > 
      <div className={'text-center mx-auto px-4 sm:px-6 lg:px-8'}>
    <h1 className={'text-6xl sm:text-5xl md:text-6xl font-bold'}>Convert Pdf to word</h1>
    <p className={'mt-3 w-100 font-medium text-current'}>Easily upload your PDF document by dragging it into the box above or clicking to select it from your device.</p>
    <div className={'mt-6 '}>
    <input className={'p-4  border border-gray-300 rounded-lg bg-white text-gray-700'} type="file" onChange={handfile} />
    <button type="submit"  className={'p-3 bg-red-500 text-white rounded-lg  m-3 '}>Upload your file</button>
    </div>
    </div>

    </main>
  );
}
