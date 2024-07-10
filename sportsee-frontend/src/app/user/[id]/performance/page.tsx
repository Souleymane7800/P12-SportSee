"use client";
import React, { useEffect } from "react";
import { useUser } from "@/app/providers/UserContext";
import { useParams } from "next/navigation";
import RadarFit from "@/app/data/RadarFit";

/**
 * UserFitness component - Displays the user's fitness data in a radar chart.
 * 
 * This component:
 * - Retrieves the user ID from the URL parameters
 * - Updates the global user context with the current user ID
 * - Renders a RadarFit component to display the user's fitness data
 * 
 * @component
 * @returns {JSX.Element} The rendered UserFitness component
 */
const UserFitness = () => {
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
    <div className="grid place-items-center pt-48">
      <RadarFit useMockedData={false} />
    </div>
  );
};

export default UserFitness;
