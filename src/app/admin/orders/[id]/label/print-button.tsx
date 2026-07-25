"use client";

export function PrintButton() {
  return (
    <div className="mt-6 text-center print:hidden">
      <button 
        onClick={() => window.print()}
        className="bg-black text-white px-6 py-2 uppercase text-xs tracking-widest hover:bg-gray-800"
      >
        Print Sticker
      </button>
    </div>
  );
}
