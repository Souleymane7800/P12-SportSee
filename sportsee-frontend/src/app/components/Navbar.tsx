// "use client";

// import React from 'react';
// import Image from 'next/image';
// import ProfileDropdown from './ProfileDropdown';

// export default function Navbar() {
//       return (
//             <div className='h-[91px] bg-[#020203] max-w-[1440px] mx-auto text-white dropshadow1 flex items-center justify-between '>
//                   <div className='pl-[28px]'>
//                         <Image
//                               src='/logo_sportsee.png'
//                               width={178}
//                               height={61}
//                               alt='Logo SportSee'
//                               priority
//                         />
//                   </div>
//                   <div>
//                         <nav className='font-medium '>
//                               <ul className='flex text-2xl xl:gap-[219px] pr-[91px] font-medium gap-[50px]'>
//                                     <li>Accueil</li>
//                                     <ProfileDropdown />
//                                     <li>Réglage</li>
//                                     <li>Communauté</li>
//                               </ul>
//                         </nav>
//                   </div>
//             </div>
//       );
// }
"use client";

import React from "react";
import Image from "next/image";
import ProfileDropdown from "./ProfileDropdown";

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
            <li>Accueil</li>
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
