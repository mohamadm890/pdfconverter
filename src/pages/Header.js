import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Header() {
  
  return (
    <main
      className={`flex justify-center p-4  ${inter.className}`}
    >
    <h1 className="text-2xl">Lion<span className="text-red-600 font-bold  ">Docs</span></h1>
   
    </main>
  );
}