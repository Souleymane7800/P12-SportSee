import React from 'react';
import Image from 'next/image';

export default function Navbar() {
      return (
            <div className='h-[91px] bg-[#020203] max-w-[1440px] mx-auto text-white dropshadow1 flex items-center justify-between '>
                  <div className='pl-[28px]'>
                        <Image
                              src='/logo_sportsee.png'
                              width={178}
                              height={61}
                              alt='Logo SportSee'
                              priority
                        />
                  </div>
                  <div className=''>
                        <nav className='font-medium '>
                              <ul className='flex text-2xl lg:gap-[219px] pr-[41px] font-medium gap-[50px]'>
                                    <li>Accueil</li>
                                    <li>Profil</li>
                                    <li>Réglage</li>
                                    <li>Communauté</li>
                              </ul>
                        </nav>
                  </div>
            </div>
      );
}
