"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

/**
 * Type for the UserContext
 * @typedef {Object} UserContextType
 * @property {number | null} userId - The ID of the current user.
 * @property {function} setUserId - Function to set the user ID.
 * @property {function} changeUser - Function to change the user ID.
 */

interface UserContextType {
  userId: number | undefined;
  setUserId: (newUserId: number) => void;
  changeUser: (newUserId: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Provides the UserContext to its children.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The children to be wrapped by the provider.
 * @returns {JSX.Element} The UserContext provider.
 */

export const UserProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [userId, setUserId] = useState<number>(); // No default userId

  const changeUser = (id: number): void => {
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, changeUser }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Custom hook to use the UserContext.
 * @throws Will throw an error if used outside of a UserProvider.
 * @returns {UserContextType} The UserContext value.
 */
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};