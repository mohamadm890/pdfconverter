import { Inter } from "next/font/google";
import Header from "./Header";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });

export default function Processing() {
  const router = useRouter();

  useEffect(() => {
   const timer = setTimeout(() => {
    router.push('/Download')
  }, 5000);
  return () => clearTimeout(timer);
  }, []) 

  return (
    <main
      className={`flex justify-center flex-col  ${inter.className}`}
    >
            <Header />
            <div className={'flex flex-col justify-center m-auto text-center mt-12 '}>
                <h1 className={'mb-8 '}>Please wait...</h1>
                <div className={' w-40 h-40 rounded-lg shadow-lg shadow-red-200/50'}></div>
                <h2 className={'mt-4'}>In progress...</h2>
            </div>
    </main>
  );
}
