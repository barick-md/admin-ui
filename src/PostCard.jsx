import React, { useState } from "react";

function PostCard({ id, userId, title, body }) {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className=" 
        flex flex-col bg-white p-6 rounded-lg transition-shadow
        hover:scale-105 hover:border hover:bg-red-200
      "
    >
      
      <h2 className="text-base font-bold text-gray-800 mb-3 text-center">
        {title}
      </h2>
      
      <p className="text-gray-600 text-sm text-center flex-grow">{body}</p>
    
      <button 
            className={`
                ${clicked 
                    ? "bg-special-red2 hover:brightness-125" 
                    : "bg-gray-400 hover:bg-gray-300"
                } text-white p-2 rounded-md`}
            onClick={() => setClicked(true)}
        >
            {clicked ? "Tombol sudah diklik" : "Silakan Klik"}
        </button>
    </div>
  );
}

export default PostCard;
