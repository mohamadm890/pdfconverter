import { Inter } from "next/font/google";
import Header from "./Header";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });

export default function Download() {
  const router = useRouter();
  const { fileUrl, fileName } = router.query;

  const handleDownload = () => {
    if (fileUrl && fileName) {
      // Trigger the file download when the button is clicked
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      link.click();

      // Clean up the URL object once downloaded
      window.URL.revokeObjectURL(fileUrl);
    }
  };

  return (
    <main
      className={`flex justify-center flex-col  ${inter.className}`}
    >
            <Header />
            <div className={'flex flex-col justify-center m-auto text-center mt-12 '}>
                <h1 className={'mb-8 font-extrabold text-slate-800 	'}>Your file is already!</h1>
                <div className={' w-40 h-40 rounded-lg shadow-lg shadow-red-200/50'}></div>
                <h2 className={'mt-4'}>File.pdf</h2>
                <button onClick={handleDownload}  className={'p-3 bg-red-500 text-white rounded-lg  m-3 '}>Download!</button>

            </div>
    </main>
  );
}
