import React, { useEffect, useState, useRef } from "react";
import { getUserSessions } from "../API/GetData";
import { useUser } from "../providers/UserContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import mockedData from "../../../public/mockData/mockedData.json";

interface Session {
  day: number;
  sessionLength: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip bg-white p-2 text-center text-[10px] font-medium"
        style={{ 
          transform: "translate(35px, -30px)",
          // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          position: "relative",
          zIndex: 9990
        }}
      >
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const CustomCursor = ({ points, width, height, chartHeight }: any) => {
  const { x } = points[0];
  const left = x - width;
  const adjustedHeight = chartHeight - 30; // Ajustez cette valeur si nécessaire

  return (
    <Rectangle
      x={left}
      y={0}
      width={width}
      height={adjustedHeight}
      stroke="transparent" 
      fill="black" 
      fillOpacity="0.18" 
      // style={{ zIndex: 9999 }}
    />
  );
};

interface GoalsProps {
  useMockedData: boolean;
}

const Goals: React.FC<GoalsProps> = ({ useMockedData }) => {
  const { userId } = useUser();
  const [sessionsData, setSessionsData] = useState<Session[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [cursorX, setCursorX] = useState<number | null>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const fetchSessionsData = async () => {
      if (userId) {
        if (useMockedData) {
          const mockedUser = mockedData.USER_AVERAGE_SESSIONS.find(
            (user: { userId: number }) => user.userId === userId,
          );
          setSessionsData(mockedUser?.sessions || []);
        } else {
          try {
            const userData = await getUserSessions(userId);
            setSessionsData(userData?.data?.sessions || []);
          } catch (error) {
            // Handle error silently
          }
        }
      }
    };
    fetchSessionsData();
  }, [userId, useMockedData]);

  const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

  const handleMouseMove = (e: any) => {
    if (e.activeTooltipIndex !== undefined) {
      setActiveIndex(e.activeTooltipIndex);
      setCursorX(e.activeCoordinate.x);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    setCursorX(null);
  };

  const CustomizedLine = ({ points }: any) => {
    if (activeIndex === null) return null;
    
    return (
      <>
        {/* Ligne avant le curseur (opacité 0.5) */}
        <path
          d={`M ${points.slice(0, activeIndex + 1).map((point: any) => `${point.x},${point.y}`).join(' L ')}`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeOpacity={0.5}
          strokeLinecap="round"
        />
        {/* Ligne après le curseur (opacité 1) */}
        <path
          d={`M ${points.slice(activeIndex).map((point: any) => `${point.x},${point.y}`).join(' L ')}`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeOpacity={1}
          strokeLinecap="butt"
        />
      </>
    );
  };

  const CustomizedDot = (props: any) => {
    const { cx, cy, index } = props;
    if (index === activeIndex) {
      return (
        <circle 
          cx={cx} 
          cy={cy} 
          r={4} 
          stroke="#FFFFFF" 
          strokeWidth={4} 
          fill="#FFFFFF" 
          style={{ zIndex: 9999 }}
        />
      );
    }
    return null;
  };

  return (
    <div className="relative h-[263px] w-[258px] rounded-md bg-[#FF0000] overflow-hidden">
      <h2 className="absolute left-[34px] top-[29px] w-[147px] text-[15px] font-medium leading-[24px] text-[#FFFFFF] opacity-50">
        Durée moyenne des sessions
      </h2>
      {sessionsData.length === 0 ? (
        <p className="pt-[100px] text-center text-base font-medium text-white">
          Une erreur est survenue lors de la récupération des données. Veuillez
          réessayer plus tard.
        </p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              ref={chartRef}
              width={258}
              height={263}
              data={sessionsData}
              margin={{ top: 70, right: 20, left: 20, bottom: 20 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#FFFFFF", opacity: 0.5 }}
                tickFormatter={(value) => dayLabels[value - 1]}
                dy={10}
              />
              <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={<CustomCursor chartHeight={chartRef.current?.height} />} 
              />
              <Line
                type="monotone"
                dataKey="sessionLength"
                stroke="#FFFFFF"
                strokeWidth={2}
                // dot={false}
                dot={<CustomizedDot />}
                activeDot={false}
                isAnimationActive={false}
              >
                <CustomizedLine />
              </Line>
              {/* <Line
                type="monotone"
                dataKey="sessionLength"
                stroke="white"
                strokeWidth={2}
                // dot={false}
                dot={<CustomizedDot />}
                // isAnimationActive={false}
              /> */}
            </LineChart>
          </ResponsiveContainer>
          {cursorX !== null && (
            <div 
              className="absolute top-20 left-2 bottom-16 bg-[#FF0000] opacity-50 pointer-events-none"
              style={{ 
                left: 0,
                top: '90px',
                width: `${cursorX}px`,
                height: `calc(100% - 150px)` // Ajustez cette valeur si nécessaire
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Goals;


// // Goals.tsx
// import React, { useEffect, useState } from "react";
// import { getUserSessions } from "../API/GetData";
// import { useUser } from "../providers/UserContext";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Rectangle,
// } from "recharts";
// import mockedData from "../../../public/mockData/mockedData.json";

// interface Session {
//   day: number;
//   sessionLength: number;
// }

// interface CustomTooltipProps {
//   active?: boolean;
//   payload?: any[];
// }

// const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white p-2 text-center text-[10px] font-medium" style={{ transform: "translate(35px, -60px)" }}>
//         <p className="label">{`${payload[0].value} min`}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const CustomCursor = ({ points, width, height }: any) => {
//   const { x, y } = points[0];
//   const {x1,y1} = points[1]
//   const left = x - width;
//   return (
//     <Rectangle
//       x={x}
//       y={y}
//       width={width}
//       height={height}
//       stroke="transparent" 
//       fill="black" 
//       fillOpacity="0.18" 
//     />
//   );
// };

// interface GoalsProps {
//   useMockedData: boolean;
// }

// const Goals: React.FC<GoalsProps> = ({ useMockedData }) => {
//   const { userId } = useUser();
//   const [sessionsData, setSessionsData] = useState<Session[]>([]);
//   const [cursorPosition, setCursorPosition] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchSessionsData = async () => {
//       if (userId) {
//         if (useMockedData) {
//           const mockedUser = mockedData.USER_AVERAGE_SESSIONS.find(
//             (user: { userId: number }) => user.userId === userId,
//           );
//           setSessionsData(mockedUser?.sessions || []);
//         } else {
//           try {
//             const userData = await getUserSessions(userId);
//             setSessionsData(userData?.data?.sessions || []);
//           } catch (error) {
//             // Handle error silently
//           }
//         }
//       }
//     };
//     fetchSessionsData();
//   }, [userId, useMockedData]);

//   const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

//   const handleMouseMove = (e: any) => {
//     if (e.activeTooltipIndex !== undefined) {
//       setCursorPosition(e.activeTooltipIndex);
//     }
//   };

//   const handleMouseLeave = () => {
//     setCursorPosition(null);
//   };

//   return (
//     <div className="relative h-[263px] w-[258px] rounded-md bg-[#FF0000] overflow-hidden">
//       <h2 className="absolute left-[34px] top-[29px] w-[147px] text-[15px] font-medium leading-[24px] text-[#FFFFFF] opacity-50">
//         Durée moyenne des sessions
//       </h2>
//       {sessionsData.length === 0 ? (
//         <p className="pt-[100px] text-center text-base font-medium text-white">
//           Une erreur est survenue lors de la récupération des données. Veuillez
//           réessayer plus tard.
//         </p>
//       ) : (
//         <>
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart
//               width={258}
//               height={263}
//               data={sessionsData}
//               margin={{ top: 70, right: 20, left: 20, bottom: 20 }}
//               onMouseMove={handleMouseMove}
//               onMouseLeave={handleMouseLeave}
//             >
//               <XAxis
//                 dataKey="day"
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: "#FFFFFF", opacity: 0.5 }}
//                 tickFormatter={(value) => dayLabels[value - 1]}
//               />
//               <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
//               <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
//               <Line
//                 type="monotone"
//                 dataKey="sessionLength"
//                 stroke="#FFFFFF"
//                 strokeWidth={2}
//                 strokeOpacity={1}
//                 dot={false}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//           {cursorPosition !== null && (
//             <div 
//               className="absolute top-20 left-2 bottom-16 bg-[#FF0000] opacity-50 pointer-events-none"
//               style={{ width: `${(cursorPosition + 1) / sessionsData.length * 100}%` }}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Goals;

// ====================================
// // Goals.tsx
// import React, { useEffect, useState } from "react";
// import { getUserSessions } from "../API/GetData";
// import { useUser } from "../providers/UserContext";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Rectangle,
// } from "recharts";
// import mockedData from "../../../public/mockData/mockedData.json";

// interface Session {
//   day: number;
//   sessionLength: number;
// }

// interface CustomTooltipProps {
//   active?: boolean;
//   payload?: any[];
// }

// const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip bg-white p-2 " style={{ transform: 'translateY(-60px)' }}>
//         <p className="label">{`${payload[0].value} min`}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const CustomCursor = ({ points, width, height }: any) => {
//   const { x, y } = points[0];
//   const left = x - width;
//   return (
//     <Rectangle
//       x={left}
//       y={0}
//       width={width}
//       height={height}
//       stroke="transparent" 
//       fill="black" 
//       fillOpacity="0.18" 
//     />
//   );
// };

// interface GoalsProps {
//   useMockedData: boolean;
// }

// const Goals: React.FC<GoalsProps> = ({ useMockedData }) => {
//   const { userId } = useUser();
//   const [sessionsData, setSessionsData] = useState<Session[]>([]);
//   const [dataSource, setDataSource] = useState<string>("");
//   const [cursorPosition, setCursorPosition] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchSessionsData = async () => {
//       if (userId) {
//         if (useMockedData) {
//           console.log("Utilisation des données mockées pour Goals");
//           const mockedUser = mockedData.USER_AVERAGE_SESSIONS.find(
//             (user: { userId: number }) => user.userId === userId,
//           );
//           console.log(
//             "Données mockées récupérées pour Goals:",
//             mockedUser?.sessions,
//           );
//           setSessionsData(mockedUser?.sessions || []);
//           setDataSource("Données mockées");
//         } else {
//           console.log("Utilisation de l'API pour Goals");
//           try {
//             const userData = await getUserSessions(userId);
//             console.log(
//               "Données API récupérées pour Goals:",
//               userData?.data?.sessions,
//             );
//             setSessionsData(userData?.data?.sessions || []);
//             setDataSource("Données API");
//           } catch (error) {
//             console.error(
//               "Erreur lors de la récupération des données API pour Goals:",
//               error,
//             );
//             setDataSource("Erreur de chargement");
//           }
//         }
//       }
//     };
//     fetchSessionsData();
//   }, [userId, useMockedData]);

//   useEffect(() => {
//     console.log("Données de sessions mises à jour pour Goals:", sessionsData);
//   }, [sessionsData]);

//   const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

//   const handleMouseMove = (e: any) => {
//     if (e.activeTooltipIndex !== undefined) {
//       setCursorPosition(e.activeTooltipIndex);
//     }
//   };

//   const handleMouseLeave = () => {
//     setCursorPosition(null);
//   };

//   return (
//     <div className="relative h-[263px] w-[258px] rounded-md bg-[#FF0000] overflow-hidden">
//       <h2 className="absolute left-[34px] top-[29px] w-[147px] text-[15px] font-medium leading-[24px] text-[#FFFFFF] opacity-50">
//         Durée moyenne des sessions
//       </h2>
//       {/* Indicateur de source de données */}
//       <div className="absolute right-2 top-2 rounded bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
//         {dataSource}
//       </div>
//       {sessionsData.length === 0 ? (
//         <p className="pt-[100px] text-center text-base font-medium text-white">
//           Une erreur est survenue lors de la récupération des données. Veuillez
//           réessayer plus tard.
//         </p>
//       ) : (
//         <>
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart
//               width={258}
//               height={263}
//               data={sessionsData}
//               margin={{ top: 80, right: 20, left: 20, bottom: 20 }}
//               onMouseMove={handleMouseMove}
//               onMouseLeave={handleMouseLeave}
//             >
//               <XAxis
//                 dataKey="day"
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: "#FFFFFF", opacity: 0.5 }}
//                 tickFormatter={(value) => dayLabels[value - 1]}
//               />
//               <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
//               <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
//               <Line
//                 type="monotone"
//                 dataKey="sessionLength"
//                 stroke="#FFFFFF"
//                 strokeWidth={2}
//                 strokeOpacity={1}
//                 dot={false}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//           {cursorPosition !== null && (
//             <div 
//               className="absolute top-20 left-2 bottom-16 bg-[#FF0000] opacity-50 pointer-events-none"
//               style={{ width: `${(cursorPosition + 1) / sessionsData.length * 100}%` }}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Goals;


// // Goals.tsx
// import React, { useEffect, useState } from "react";
// import { getUserSessions } from "../API/GetData";
// import { useUser } from "../providers/UserContext";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Rectangle,
// } from "recharts";
// import mockedData from "../../../public/mockData/mockedData.json";

// interface Session {
//   day: number;
//   sessionLength: number;
// }

// interface CustomTooltipProps {
//   active?: boolean;
//   payload?: any[];
// }

// const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip bg-white p-2 " style={{ transform: 'translateY(-60px)' }}>
//         <p className="label">{`${payload[0].value} min`}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const CustomCursor = ({ points, width, height }: any) => {
//   const { x, y } = points[0];
//   const left = x - width;
//   return (
//     <Rectangle
//       x={left}
//       y={0}
//       width={width}
//       height={height}
//       stroke="transparent" 
//       fill="black" 
//       fillOpacity="0.1" 
//     />
//   );
// };

// interface GoalsProps {
//   useMockedData: boolean;
// }

// const Goals: React.FC<GoalsProps> = ({ useMockedData }) => {
//   const { userId } = useUser();
//   const [sessionsData, setSessionsData] = useState<Session[]>([]);
//   const [dataSource, setDataSource] = useState<string>("");
//   const [cursorPosition, setCursorPosition] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchSessionsData = async () => {
//       if (userId) {
//         if (useMockedData) {
//           console.log("Utilisation des données mockées pour Goals");
//           const mockedUser = mockedData.USER_AVERAGE_SESSIONS.find(
//             (user: { userId: number }) => user.userId === userId,
//           );
//           console.log(
//             "Données mockées récupérées pour Goals:",
//             mockedUser?.sessions,
//           );
//           setSessionsData(mockedUser?.sessions || []);
//           setDataSource("Données mockées");
//         } else {
//           console.log("Utilisation de l'API pour Goals");
//           try {
//             const userData = await getUserSessions(userId);
//             console.log(
//               "Données API récupérées pour Goals:",
//               userData?.data?.sessions,
//             );
//             setSessionsData(userData?.data?.sessions || []);
//             setDataSource("Données API");
//           } catch (error) {
//             console.error(
//               "Erreur lors de la récupération des données API pour Goals:",
//               error,
//             );
//             setDataSource("Erreur de chargement");
//           }
//         }
//       }
//     };
//     fetchSessionsData();
//   }, [userId, useMockedData]);

//   useEffect(() => {
//     console.log("Données de sessions mises à jour pour Goals:", sessionsData);
//   }, [sessionsData]);

//   const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

//   const handleMouseMove = (e: any) => {
//     if (e.activeTooltipIndex !== undefined) {
//       setCursorPosition(e.activeTooltipIndex);
//     }
//   };

//   const handleMouseLeave = () => {
//     setCursorPosition(null);
//   };

//   return (
//     <div className="relative h-[263px] w-[258px] rounded-md bg-[#FF0000]">
//       <h2 className="absolute left-[34px] top-[29px] w-[147px] text-[15px] font-medium leading-[24px] text-[#FFFFFF] opacity-50">
//         Durée moyenne des sessions
//       </h2>
//       {/* Indicateur de source de données */}
//       <div className="absolute right-2 top-2 rounded bg-black bg-opacity-50 px-2 py-1 text-xs text-white">
//         {dataSource}
//       </div>
//       {sessionsData.length === 0 ? (
//         <p className="pt-[100px] text-center text-base font-medium text-white">
//           Une erreur est survenue lors de la récupération des données. Veuillez
//           réessayer plus tard.
//         </p>
//       ) : (
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             width={258}
//             height={263}
//             data={sessionsData}
//             margin={{ top: 80, right: 20, left: 20, bottom: 20 }}
//             onMouseMove={handleMouseMove}
//           onMouseLeave={handleMouseLeave}
//           >
//             <XAxis
//               dataKey="day"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#FFFFFF", opacity: 0.5 }}
//               tickFormatter={(value) => dayLabels[value - 1]}
//             />
//             <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
//             <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
//             <Line
//               type="monotone"
//               dataKey="sessionLength"
//               stroke="#FFFFFF"
//               strokeWidth={2}
//               strokeOpacity={1}
//               dot={false}
//               // activeDot={{
//               //   stroke: "rgba(255, 255, 255, 0.5)",
//               //   strokeWidth: 10,
//               //   r: 5,
//               // }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// };

// export default Goals;

// import React, { useEffect, useState } from "react";
// import { useUser } from "../providers/UserContext";
// import { getUserSessions } from "../API/GetData";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Rectangle,
// } from "recharts";

// interface Session {
//   day: number;
//   sessionLength: number;
// }

// interface CustomTooltipProps {
//   payload?: any;
// }

// export default function Goals() {
//   const { userId } = useUser();
//   const [sessionData, setSessionData] = useState<any>(null);

//   useEffect(() => {
//     const fetchSessionData = async () => {
//       try {
//         if (userId) {
//           const sessionData = await getUserSessions(userId);
//           setSessionData(sessionData?.data?.sessions || []);
//         }
//       } catch (error) {
//         console.error("Error fetching user average sessions:", error);
//       }
//     };
//     fetchSessionData();
//   }, [userId]);

//   let LineChartData: { day: number; sessionLength: number }[] = [];
//   if (sessionData) {
//     LineChartData = sessionData?.data?.sessions.map((session: Session) => ({
//       day: session.day,
//       sessionLength: session.sessionLength,
//     }));
//   }

//   const CustomCursor = (props: any) => {
//     const { points, width, height } = props;
//     const { x, y } = points[0];
//     const left = x - width;

//     return (
//       <Rectangle
//         x={left}
//         y={y - 5}
//         width={width}
//         height={height + 10}
//         stroke="transparent"
//         fill="black"
//         fillOpacity="0.18"
//       />
//     );
//   };

//   const CustomTooltip: React.FC<CustomTooltipProps> = ({ payload }) => {
//     if (payload && payload.length) {
//       return (
//         <div className="h-[34px] w-[50px] p-0">
//           <div className="flex">
//             <p className="bg-white p-2 text-center text-[10px] font-medium">
//               {`${payload[0].value} min`}
//             </p>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   const CustomXAxisTick = (props: any) => {
//     const { x, y, payload } = props;
//     const days = ["L", "M", "M", "J", "V", "S", "D"];
//     return (
//       <g
//         transform={`translate(${x},${y})`}
//         className="absolute bottom-4 left-[14px] flex w-[229px] justify-between text-[12px] uppercase text-white opacity-50"
//       >
//         <text
//           x={0}
//           y={0}
//           dy={16}
//           textAnchor="middle"
//           fill="#FFFFFF"
//           opacity="0.5"
//         >
//           {days[payload.value - 1]}
//         </text>
//       </g>
//     );
//   };

//   return (
//     <div className="dropshadow2 relative h-[263px] w-[258px] rounded-md bg-red-600">
//       <h2 className="absolute pl-[34px] pt-[29px] text-[15px] font-medium leading-6 text-white">
//         Durée moyenne des <br /> sessions
//       </h2>
//       {!sessionData?.length && (
//         <p className="pt-[100px] text-center text-base font-medium text-white">
//           Une erreur est survenue lors de la récupération des données. Veuillez
//           réessayer plus tard.
//         </p>
//       )}
//       {sessionData?.length && (
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={sessionData}>
//             <XAxis
//               dataKey="day"
//               axisLine={false}
//               tickLine={false}
//               tick={<CustomXAxisTick />}
//             />
//             <YAxis domain={["dataMin - 20", "dataMax + 45"]} hide={true} />
//             <Tooltip
//               content={<CustomTooltip />}
//               offset={-10}
//               cursor={<CustomCursor />}
//               position={{ y: 50 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="sessionLength"
//               stroke="#fff"
//               strokeWidth={2}
//               dot={false}
//             />{" "}
//           </LineChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// }
