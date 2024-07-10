"use client";

import React from "react";
import Image from "next/image";
import ProfileDropdown from "./ProfileDropdown";
import Link from "next/link";

/**
 * Navbar component - Renders the main navigation bar of the application.
 *
 * This component:
 * - Displays the SportSee logo
 * - Provides navigation links for Home, Profile (as a dropdown), Settings, and Community
 * - Is responsive, adjusting layout for different screen sizes
 *
 * @component
 * @returns {JSX.Element} The rendered Navbar component
 */
export default function Navbar() {
  return (
    <div className="mx-auto flex h-[91px] max-w-[1440px] items-center justify-between bg-[#020203] px-4 text-white lg:px-8">
      <div className="flex items-center gap-4 lg:gap-[120px] xl:gap-[219px]">
        <Image
          src="/logo_sportsee.png"
          width={178}
          height={61}
          alt="Logo SportSee"
          priority
        />
        <nav className="font-medium lg:flex">
          <ul className="flex items-center gap-4 text-lg lg:gap-20 lg:text-2xl xl:gap-[200px]">
            <li>
              {" "}
              <Link href="/" className="transition-colors hover:text-gray-300">
                Accueil
              </Link>
            </li>
            <li>
              <ProfileDropdown />
            </li>
            <li>Réglage</li>
            <li>Communauté</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
