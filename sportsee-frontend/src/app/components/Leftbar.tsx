
import React from 'react';
import Image from 'next/image';

export default function Leftbar() {
  return (
    <div className='hidden lg:flex lg:h-[140vh] xl:h-[100vh] h-screen w-[117px] bg-[#020203] text-white flex-col items-center justify-between'>
      <div className='flex flex-col space-y-5 pt-[256px] items-center'>
        <div>
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
      <div className='text-white font-medium -rotate-90 text-[12px] whitespace-nowrap mb-[121px]'>
        Copyright, SportSee 2020
      </div>
    </div>
  );
}



// 0707today
// import React from 'react';
// import Image from 'next/image';

// export default function Leftbar() {
//       return (
//             <div className=' h-screen w-[117px] bg-[#020203] text-white relative items-center justify-center flex-row'>
//                   <div className='space-y-5 pt-[256px] grid w-full place-items-center'>
//                         <div className=''>
//                               <Image
//                                     src='/yoga.svg'
//                                     alt='zen'
//                                     width={64}
//                                     height={64}
//                                     priority
//                               />
//                         </div>
//                         <div>
//                               <Image
//                                     src='/natation.svg'
//                                     alt='natation'
//                                     width={64}
//                                     height={64}
//                                     priority
//                               />
//                         </div>
//                         <div>
//                               <Image
//                                     src='/velo.svg'
//                                     alt='velo'
//                                     width={64}
//                                     height={64}
//                                     priority
//                               />
//                         </div>
//                         <div>
//                               <Image
//                                     src='/haltere.svg'
//                                     alt='haltere'
//                                     width={64}
//                                     height={64}
//                                     priority
//                               />
//                         </div>
//                   </div>
//                   <div className='text-white font-mediun -rotate-90 text-[12px] text-nowrap absolute bottom-[121px] left-1/2 -translate-x-1/2'>
//                         Copyright, SportSee 2020
//                   </div>
//             </div>
//       );
// }