import Image from "next/image";
import { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import Header from "./Header";
import FileUploader from "./FileUploader";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
 
 

  return (
    <main
      className={`  ${inter.className}`}
    > 
    <Header />
    <FileUploader />

    </main>
  );
}
