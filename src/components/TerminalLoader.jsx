import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TerminalLoader({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sequence = [
      "INIT SYSTEM...",
      "LOADING KERNEL MODULES [OK]",
      "MOUNTING PORTFOLIO DATA...",
      "CONNECTING TO SERVERS [OK]",
      "ESTABLISHING SECURE CONNECTION...",
      "INITIALIZING UI COMPONENTS...",
      "SYSTEM BOOT COMPLETE.",
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < sequence.length) {
        setLines(prev => [...prev, sequence[currentLine]]);
        setProgress(Math.floor(((currentLine + 1) / sequence.length) * 100));
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 font-mono text-cyan-400">
      <div className="w-full max-w-md p-6 border border-cyan-500/30 rounded-lg bg-slate-900/80 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
        <div className="flex items-center mb-4 border-b border-cyan-500/30 pb-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="ml-4 text-xs text-cyan-600">terminal@portfolio: ~</span>
        </div>
        
        <div className="h-64 overflow-hidden text-sm flex flex-col gap-2">
          {lines.map((line, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-emerald-400 mr-2">{">"}</span> {line}
            </motion.div>
          ))}
          {progress < 100 && (
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
              <span className="text-emerald-400 mr-2">{">"}</span> _
            </motion.div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-cyan-500/30 flex items-center justify-between">
          <span className="text-xs text-cyan-600">BOOT PROGRESS</span>
          <span className="text-xs">{progress}%</span>
        </div>
        <div className="w-full h-1 mt-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
