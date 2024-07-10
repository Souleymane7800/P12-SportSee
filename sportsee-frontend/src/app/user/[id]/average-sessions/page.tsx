"use client";
import React, { useEffect } from "react";
import { useUser } from "@/app/providers/UserContext";
import { useParams } from "next/navigation";
import Goals from "@/app/data/Goals";

/**
 * UserAverageSession component - Displays the user's average session goals.
 *
 * This component:
 * - Retrieves the user ID from the URL parameters
 * - Updates the global user context with the current user ID
 * - Renders a Goals component to display the user's average session goals
 *
 * @component
 * @returns {JSX.Element} The rendered UserAverageSession component
 */
const UserAverageSession = () => {
  const { userId, setUserId } = useUser();
  const { id } = useParams<{ id: string }>();
  const userIdNumber = parseInt(id);

  /**
   * Effect hook to update the global user context with the current user ID.
   */
  useEffect(() => {
    setUserId(userIdNumber);
  }, [userIdNumber, setUserId]);

  return (
    <div className="grid place-items-center gap-4 pt-48">
      <Goals useMockedData={false} />
    </div>
  );
};

export default UserAverageSession;
