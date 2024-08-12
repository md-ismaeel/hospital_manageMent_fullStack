import React, { useState } from "react";
import "./InputForm.css"

export const InputForm = ({ value, placeHolder, type, onChange, options }) => {
  const [isDateFocused, setIsDateFocused] = useState(false);

  return (
    <>
      <section className="form w-[400px] h-[50px]">
        {type === "select" ? (
          <select
            className="w-[100%] h-[100%] px-6 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
          >
            <option value="" disabled>
              {placeHolder}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === "date" ? (
          <div className="relative w-[100%] h-[100%]">
            <input
              type="date"
              value={value}
              onChange={onChange}
              onFocus={() => setIsDateFocused(true)}
              onBlur={() => setIsDateFocused(false)}
              className="w-[100%] h-[100%] px-6 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {!isDateFocused && !value && (
              <div className="absolute px-6 top-3 left-1 flex items-center pointer-events-none text-gray-400 bg-white">
                {placeHolder}
              </div>
            )}
          </div>
        ) : (
          <input
            type={type}
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
            className="w-[100%] h-[100%] px-6 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        )}
      </section>
    </>
  );
};
