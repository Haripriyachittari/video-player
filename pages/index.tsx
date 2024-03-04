import Image from "next/image";
import { Inter } from "next/font/google";
import Homescreen from "@/components/Homescreen";
import AllContextProvider from "@/context/Context";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <AllContextProvider>
      <main className="flex flex-col items-center justify-center bg-[#F3F8FF]">
        <nav>
          <h1 className="border-b p-6 text-3xl font-semibold text-[#0d47a1] ">
            Video Player assignment
          </h1>
        </nav>
        <Homescreen />
      </main>
    </AllContextProvider>
  );
}
