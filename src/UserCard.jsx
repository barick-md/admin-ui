import React from 'react'

function UserCard(props) {
    console.log(props);

    return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{props.name}</h2>
        <p className="text-gray-600">
        <span className="font-medium">Email:</span> {props.email}
        </p>
        <p className="text-gray-600">
        <span className="font-medium">Address:</span> {props.street}, {props.city}
        </p>
        <button className="bg-gray-01 text-white p-2 rounded-md">        
        Silakan Klik      
        </button>
    </div>
  );
}

export default UserCard