import React, { useState } from "react";
import kitchenTips from "./KitchenTips";

const KitchenTipsAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openTip, setOpenTip] = useState(null);

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 px-4">

      {/* MAIN BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-orange-400 to-orange-500 
                   text-white px-6 py-4 rounded-xl text-xl font-semibold 
                   shadow-lg flex justify-between items-center
                   hover:opacity-90 transition"
      >
        <span> Kitchen Tips</span>
        <span className="text-2xl">{isOpen ? "⌃" : "⌄"}</span>
      </button>

      {/* ALL TIPS LIST */}
      {isOpen && (
        <div className="mt-5 space-y-4">
          {kitchenTips.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-200 
                         p-5 transition hover:shadow-lg"
            >
              {/* TIP TITLE */}
              <button
                className="w-full flex justify-between items-center 
                           text-gray-900 font-semibold text-lg"
                onClick={() => setOpenTip(openTip === index ? null : index)}
              >
                {item.title}
                <span className="text-xl">{openTip === index ? "⌃" : "⌄"}</span>
              </button>

              {/* CONTENT */}
              <div
                className={`overflow-hidden transition-all duration-300 
                ${openTip === index ? "max-h-40 mt-3" : "max-h-0"}
              `}
              >
                <p className="text-gray-600 text-sm bg-gray-50 p-4 rounded-lg leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KitchenTipsAccordion;
