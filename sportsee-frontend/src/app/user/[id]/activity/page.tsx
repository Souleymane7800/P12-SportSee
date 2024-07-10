"use client";
import React, { useEffect } from "react";
import { useUser } from "@/app/providers/UserContext";
import { useParams } from "next/navigation";
import DailyActivities from "@/app/data/DailyActivities";
import Calories from "@/app/data/Calories";
import Proteines from "@/app/data/Proteines";
import Glucides from "@/app/data/Glucides";
import Lipides from "@/app/data/Lipides";

/**
 * UserActivity component - Displays various user activity and nutrition metrics.
 *
 * This component:
 * - Retrieves the user ID from the URL parameters
 * - Updates the global user context with the current user ID
 * - Renders components for displaying calories, proteins, carbohydrates, and lipids data
 *
 * @component
 * @returns {JSX.Element} The rendered UserActivity component
 */
const UserActivity = () => {
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
      <Calories useMockedData={false} />
      <Proteines useMockedData={false} />
      <Glucides useMockedData={false} />
      <Lipides useMockedData={false} />
    </div>
  );
};

export default UserActivity;
