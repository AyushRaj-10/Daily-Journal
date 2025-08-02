import React from 'react';

const Cards = (props) => {
  return (
    <div className="w-72 h-72 rounded-xl overflow-hidden shadow-md bg-white border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1">
      {props.image ? (
        <img
          src={props.image}
          alt={props.subject}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="h-48 w-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
          No image
        </div>
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{props.subject}</h2>
        <p className="text-sm text-gray-600 mt-2">By: {props.author}</p>
      </div>
    </div>
  );
};

export default Cards;
