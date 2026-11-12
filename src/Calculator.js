
import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "AC") {
      setInput("");
    } 
    else if (value === "DEL") {
      setInput(input.slice(0, -1));
    } 
    else if (value === "=") {
      try {
        if (!/^[0-9+\-*/.() ]+$/.test(input)) {
          setInput("Error");
          return;
        }

        const result = Function(
          `"use strict"; return (${input})`
        )();

        setInput(String(result));
      } catch {
        setInput("Error");
      }
    } 
    else {
      setInput(input === "Error" ? value : input + value);
    }
  };

  const buttons = [
    "AC", "DEL", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-2xl w-80 shadow-2xl">

        <h2 className="text-white text-2xl text-center mb-5">
          Calculator
        </h2>

        <input
          type="text"
          value={input}
          readOnly
          placeholder="0"
          className="w-full p-4 mb-5 text-right text-3xl rounded-lg bg-red-700 text-white outline-none"
        />

        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button) => (
            <button
              key={button}
              onClick={() => handleClick(button)}
              className={`p-4 rounded-lg text-xl font-bold transition
                ${
                  button === "="
                    ? "bg-green-500 text-white col-span-2"
                    : ["+", "-", "*", "/", "%"].includes(button)
                    ? "bg-orange-500 text-blue"
                    : ["AC", "DEL"].includes(button)
                    ? "bg-red-500 text-white"
                    : "bg-gray-600 text-white hover:bg-gray-500"
                }`}
            >
              {button}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Calculator;
