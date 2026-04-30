"use client";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { motion } from "framer-motion";
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
          <motion.h1 className="text-3xl md:text-4xl font-bold text-white" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
            Olá IA
          </motion.h1>
        </div>
        <div className="p-8 text-center">
          <motion.p className="text-lg md:text-xl text-gray-600 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Seja bem-vindo ao mundo da inteligência artificial!
          </motion.p>
          <motion.div className="flex justify-center space-x-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>
      <motion.div className="mt-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <MadeWithDyad />
        <p className="text-sm text-gray-500 mt-2">Desenvolvido por Matheus Carvalho Pereira</p>
      </motion.div>
    </div>
  );
};
export default Index;