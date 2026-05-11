import { AnimatePresence, motion } from "framer-motion";

export default function Toast({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-[80]"
          role="status"
          aria-live="polite"
        >
          <div
            className={`glass glow-ring max-w-sm rounded-xl px-4 py-3 text-sm shadow-lg ${
              toast.type === "success" ? "border-emerald-400/40" : "border-rose-400/40"
            }`}
          >
            <div className="flex items-center gap-4">
              <p className="text-slate-100">{toast.message}</p>
              <button
                type="button"
                className="rounded-md border border-white/20 px-2 py-1 text-xs text-slate-200 transition hover:border-cyan-300"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

