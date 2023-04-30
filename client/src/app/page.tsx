import Image from "next/image";
import { Inter } from "next/font/google";
import { useAction } from "@/helpers/hooks";
import { actions } from "@/store";
import Main from "@/components/pages/Main";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Main />
    </main>
  );
}
