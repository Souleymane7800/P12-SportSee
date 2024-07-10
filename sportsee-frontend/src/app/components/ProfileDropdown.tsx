"use client";

import React, { useState } from "react";
import { useUser } from "../providers/UserContext";
import { useRouter } from "next/navigation"; // Utilisation de next/navigation

/**
 * ProfileDropdown component - Displays a dropdown menu for user profile selection.
 *
 * This component:
 * - Allows users to select from a list of predefined user profiles
 * - Changes the current user in the global context when a profile is selected
 * - Navigates to the selected user's profile page
 *
 * @component
 * @returns {JSX.Element} The rendered ProfileDropdown component
 */
const ProfileDropdown: React.FC = () => {
  const { changeUser } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  /**
   * Static list of available user profiles.
   * @type {Array<{id: number, name: string}>}
   */
  const users = [
    { id: 12, name: "Karl" },
    { id: 18, name: "Cecilia" },
  ];

  /**
   * Toggles the visibility of the dropdown menu.
   * @function
   */
  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  /**
   * Handles the selection of a user profile.
   * Changes the current user and navigates to their profile page.
   * @function
   * @param {number} id - The ID of the selected user
   */
  const handleUserSelect = (id: number) => {
    changeUser(id);
    setShowDropdown(false);
    router.push(`/user/${id}`); // Utilisation de router.push pour la navigation
  };

  return (
    <div className="relative">
      <button
        onClick={handleProfileClick}
        style={{ cursor: "pointer" }}
        className="text-white-700 border-none bg-transparent transition-colors hover:text-gray-300"
      >
        Profil
      </button>
      {showDropdown && (
        <div className="absolute mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1">
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => handleUserSelect(user.id)}
                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
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
