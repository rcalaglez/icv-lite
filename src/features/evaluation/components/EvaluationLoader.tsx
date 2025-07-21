import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const messages = [
  'Analizando tu experiencia profesional...',
  'Contrastando tus habilidades con las mejores prácticas...',
  'Evaluando la estructura de tu perfil...',
  'Preparando tus consejos personalizados...',
  'Ya casi está todo listo...',
];

export const EvaluationLoader = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        className="w-20 h-20 bg-gradient-to-tr from-primary to-secondary rounded-full mb-8"
      />
      <h2 className="text-2xl font-bold mb-2 text-primary">Generando tu informe...</h2>
      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-lg text-muted-foreground"
      >
        {messages[messageIndex]}
      </motion.p>
    </div>
  );
};