"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Olá IA</h1>
        <p className="text-xl text-gray-600 mb-8">
          Seja bem-vindo ao mundo da inteligência artificial!
        </p>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;