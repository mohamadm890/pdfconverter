import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Header() {
  
  return (
    <main
      className={`flex sp p-4  justify-between mx-2.5  ${inter.className}`}
    >

    <h1 className="text-2xl">Lion<span className="text-red-600 font-bold  ">Docs</span></h1>
   <div className="flex items-center gap-4  	 ">
    <Link href="/Login" className="text-slate-600 font-bold"> 
        Login 
      </Link>
    <div className="flex items-center gap-4 p-2 bg-red-100 rounded-md text-white font-medium	">
    <Link href="/SignUp" className="text-red-500 font-medium	"> 
        Sign up 
      </Link>
      </div>
</div>
          </main>
  );
}
