import React from 'react';
import Image from 'next/image';

export default function Leftbar() {
      return (
            <div className='h-[calc(100vh-91px)] w-[117px] bg-[#020203] text-white relative items-center justify-center flex-row'>
                  <div className='space-y-5 pt-[256px] grid w-full place-items-center'>
                        <div className=''>
                              <Image
                                    src='/yoga.svg'
                                    alt='zen'
                                    width={64}
                                    height={64}
                                    priority
                              />
                        </div>
                        <div>
                              <Image
                                    src='/natation.svg'
                                    alt='natation'
                                    width={64}
                                    height={64}
                                    priority
                              />
                        </div>
                        <div>
                              <Image
                                    src='/velo.svg'
                                    alt='velo'
                                    width={64}
                                    height={64}
                                    priority
                              />
                        </div>
                        <div>
                              <Image
                                    src='/haltere.svg'
                                    alt='haltere'
                                    width={64}
                                    height={64}
                                    priority
                              />
                        </div>
                  </div>
                  <div className='text-white font-mediun -rotate-90 text-[12px] text-nowrap absolute bottom-[121px] left-1/2 -translate-x-1/2'>
                        Copyright, SportSee 2020
                  </div>
            </div>
      );
}