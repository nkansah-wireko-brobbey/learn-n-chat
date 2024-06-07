"use client";
import Board from "@/components/board";
import { Toaster } from "@/components/ui/toaster";
import useCreateUserSession from "@/hooks/useCreateUserSession";
import { useEffect } from "react";
import { LoaderPinwheel } from "lucide-react";

export default function Home() {
  const { response, error, loading, createSession } = useCreateUserSession();

  useEffect(() => {
    const getUser = async () => {
      const session = await createSession();
      console.log(session);
    };
    getUser();
  }, [createSession]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 main-background">
      {loading ? (
        <LoaderPinwheel className="animate-spin" />
      ) : (
        <>
          <Board />
        </>
      )
    }
    <Toaster />
    </main>
  );
}
