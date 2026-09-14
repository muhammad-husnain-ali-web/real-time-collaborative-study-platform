import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center text-4xl">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 mb-4 animate-spin border-t-blue-500"></div>
    </div>
  );
};

export default Loader;
