import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase/config';
import { AiFillCopy } from 'react-icons/ai';
import { AuthContext } from '@/context/authContext';
import Love from '@/types/lovetype';
import Spinner from './spinner';



function HomePage() {
  let uid: string;


  const { getLove ,loading} = useContext(AuthContext);
  const router = useRouter();
  const [love, setLove] = useState<Love[]>([]);
  const [shareableLink, setShareableLink] = useState<string>("");

  const fetchLove = async () => {
    const loveData = await getLove(uid);
    setLove(loveData ?? []);
  };
  useEffect(() => {
    console.log("useEffect");
    uid = auth.currentUser?.uid ?? "404";
    setShareableLink(`https://lovebytes.vercel.app/${uid}`);

   fetchLove();
  }, []);


  const handleCopy = () => {
    navigator.clipboard.writeText(shareableLink);
    alert("Copied to clipboard!");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="wrapper w-screen h-screen bg-cover" style={{ backgroundImage: "url(love.jpg)" }}>
      <div className="flex flex-col items-center p-5">
        <h1 className="text-4xl font-bold text-white">Love ♥ Calculator</h1>
      </div>
      <div className="flex flex-col items-center p-5 ">
        <h1 className="text-2xl font-bold text-white">Shareable Link</h1>
        <p className="bg-gray-600 rounded-md p-5 text-white whitespace-normal break-all w-auto">{shareableLink}</p>
        <button
          onClick={handleCopy}
          className="bg-red-500  hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          <AiFillCopy className="inline-block mr-2" />
          Copy Link
        </button>
      </div>
      

      {love.map((love) => (
        <div className="flex flex-col m-1 bg-lime-200 items-center p-5">
        <table className="w-full">
    <tr>
      <td className="px-4 py-2">Your Love</td>
      <td className="px-4 py-2">:</td>
      <td className="px-4 py-2">{love.name}</td>
    </tr>
    <tr>
      <td className="px-4 py-2">Your Crush</td>
      <td className="px-4 py-2">:</td>
      <td className="px-4 py-2">{love.partner}</td>
    </tr>
    <tr>
      <td className="px-4 py-2">Your Love Percentage</td>
      <td className="px-4 py-2">:</td>
      <td className="px-4 py-2">{love.message}</td>
    </tr>
  </table>
        </div>
      ))}

    </div>
  );
}

export default HomePage;
