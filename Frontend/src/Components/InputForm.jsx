import React from "react";

export const InputForm = ({ value, placeHolder, type, onChange, options }) => {
  return (
    <>
      <section className="w-[400px] h-[50px]">
        {type === "select" ? (
          <select
            className="w-[100%] h-[100%] px-6 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={value}
            onChange={onChange}
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
