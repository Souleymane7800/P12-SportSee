import React from "react";
import Image from "next/image";

/**
 * Leftbar component - Renders the left sidebar of the application.
 *
 * This component:
 * - Displays a vertical bar with activity icons (yoga, swimming, cycling, weightlifting)
 * - Shows a copyright notice at the bottom
 * - Is responsive, hiding on smaller screens and adjusting height for different viewport sizes
 *
 * @component
 * @returns {JSX.Element} The rendered Leftbar component
 */
export default function Leftbar() {
  return (
    <div className="hidden h-screen w-[117px] flex-col items-center justify-between bg-[#020203] text-white lg:flex lg:h-[140vh] xl:h-[100vh]">
      <div className="flex flex-col items-center space-y-5 pt-[256px]">
        <div>
          <Image src="/yoga.svg" alt="zen" width={64} height={64} priority />
        </div>
        <div>
          <Image
            src="/natation.svg"
            alt="natation"
            width={64}
            height={64}
            priority
          />
        </div>
        <div>
          <Image src="/velo.svg" alt="velo" width={64} height={64} priority />
        </div>
        <div>
          <Image
            src="/haltere.svg"
            alt="haltere"
            width={64}
            height={64}
            priority
          />
        </div>
      </div>
      <div className="mb-[121px] -rotate-90 whitespace-nowrap text-[12px] font-medium text-white">
        Copyright, SportSee 2020
      </div>
    </div>
  );
}
