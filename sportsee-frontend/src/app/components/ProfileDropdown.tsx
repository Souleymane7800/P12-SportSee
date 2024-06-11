"use client";

import React, { useState } from "react";
import { useUser } from "../providers/UserContext";

const ProfileDropdown: React.FC = () => {
  const { changeUser } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);

  // Utilisateurs statiques
  const users = [
    { id: 12, name: "Karl" },
    { id: 18, name: "Cecilia" },
  ];

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleUserSelect = (id: number) => {
    changeUser(id);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <li onClick={handleProfileClick} style={{ cursor: "pointer" }}>
        Profil
      </li>
      {showDropdown && (
        <div className="absolute mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1">
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => handleUserSelect(user.id)}
                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {user.name} (ID: {user.id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
