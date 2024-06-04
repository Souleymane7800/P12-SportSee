import React from 'react';
import Image from 'next/image';

export default function Glucides() {
  return (
    <div className='w-[258px] h-[124px] flex items-center pl-8 bg-[#FBFBFB] dropshadow2'>
                  <div className='flex space-x-[24px]'>
                        <Image
                              src='/assets/carbs-icon.svg'
                              alt='calories'
                              width={60}
                              height={60}
                        />
                        <div className='flex-row space-y-[2px] pt-[7px]'>
                              <h1 className='font-bold text-[#282D30] text-xl'>
                                    290g
                              </h1>
                              <h2 className='text-sm font-medium text-[#74798C] text-sm'>
                                    Glucides
                              </h2>
                        </div>
                  </div>
            </div>
  )
}