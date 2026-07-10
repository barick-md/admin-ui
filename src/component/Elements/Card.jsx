import React, { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

function Card(props) {
  const { title, link = false, desc } = props;
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="h-full flex flex-col">
      <div className={`flex justify-between items-center mb-2
        ${darkMode ? "text-gray-300" : "text-gray-02"}`}>
        <div className="text-2xl">{title}</div>
        {link && <div className="text-xs">View All</div>}
      </div>
      {/* Warna card berubah: putih → #242526 */}
      <div className={`flex-1 rounded-lg px-6 py-5 shadow-xl
        ${darkMode ? "bg-dark-card text-gray-200" : "bg-white"}`}>
        {desc}
      </div>
    </div>
  );
}

export default Card;