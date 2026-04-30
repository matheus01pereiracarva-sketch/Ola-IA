"use client";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { motion } from "framer-motion";
import { Brain, Lightbulb, Rocket } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "Inteligência Avançada",
      description: "Processamento complexo e análise preditiva com algoritmos de última geração."
    },
    {
      icon: Lightbulb,
      title: "Criatividade Ilimitada",
      description: "Geração de conteúdo inovador e soluções criativas para qualquer desafio."
    },
    {
      icon: Rocket,
      title: "Inovação Contínua",
      description: "Evolução constante com aprendizado adaptativo e atualizações inteligentes."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-blue-600 mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            IA Transformadora
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Soluções inteligentes para o futuro do seu negócio
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para revolucionar seu negócio?</h2>
          <p className="text-blue-100 mb-6">Descubra o poder da inteligência artificial aplicada</p>
          <div className="flex justify-center space-x-4">
            <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
            <div className="w-3 h-3 bg-white rounded-full opacity-80"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <MadeWithDyad />
        <p className="text-sm text-gray-500 mt-2">Desenvolvido por Matheus Carvalho Pereira</p>
      </motion.div>
    </div>
  );
};

export default Index;