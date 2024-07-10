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

/**
 * Represents a single session data point.
 * @interface Session
 */
interface Session {
  day: number;
  sessionLength: number;
}

/**
 * Props for the CustomTooltip component.
 * @interface CustomTooltipProps
 */
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

/**
 * CustomTooltip component - Renders a custom tooltip for the line chart.
 * @component
 * @param {CustomTooltipProps} props - The component props
 * @returns {JSX.Element | null} The rendered CustomTooltip component or null
 */
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip bg-white p-2 text-center text-[10px] font-medium"
        style={{
          transform: "translate(-5px, -60px)",
          position: "relative",
          zIndex: 9990,
        }}
      >
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

/**
 * CustomCursor component - Renders a custom cursor for the line chart.
 * @component
 * @param {Object} props - The component props
 * @param {Array} props.points - The cursor points
 * @param {number} props.width - The cursor width
 * @param {number} props.height - The cursor height
 * @param {number} props.chartHeight - The chart height
 * @returns {JSX.Element} The rendered CustomCursor component
 */
const CustomCursor = ({ points, width, height, chartHeight }: any) => {
  const { x } = points[0];
  const adjustedHeight = chartHeight - 25;

  return (
    <Rectangle
      x={0}
      y={0}
      width={x - 5}
      height={adjustedHeight}
      stroke="transparent"
      fill="black"
      fillOpacity="0.18"
    />
  );
};

/**
 * Props for the Goals component.
 * @interface GoalsProps
 */
interface GoalsProps {
  useMockedData: boolean;
}

/**
 * Goals component - Displays the user's average session duration over a week.
 *
 * This component:
 * - Fetches the user's session data (real or mocked based on the prop)
 * - Renders a line chart representing the average session duration
 * - Implements custom tooltips, cursors, and interactive elements
 * - Handles error states and displays an error message if data is unavailable
 *
 * @component
 * @param {GoalsProps} props - The component props
 * @returns {JSX.Element} The rendered Goals component
 */
const Goals: React.FC<GoalsProps> = ({ useMockedData }) => {
  const { userId } = useUser();
  const [sessionsData, setSessionsData] = useState<Session[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [cursorX, setCursorX] = useState<number | null>(null);
  const chartRef = useRef<any>(null);
  const dotRadius = 4;

  useEffect(() => {
    /**
     * Fetches the user's session data.
     * @async
     * @function
     */
    const fetchSessionsData = async () => {
      if (userId) {
        if (useMockedData) {
          const mockedUser = mockedData.USER_AVERAGE_SESSIONS.find(
            (user: { userId: number }) => user.userId === userId,
          );
          if (mockedUser?.sessions) {
            setSessionsData(mockedUser.sessions);
          } else {
            setError(true);
          }
        } else {
          try {
            const userData = await getUserSessions(userId);
            if (userData?.data?.sessions) {
              setSessionsData(userData.data.sessions);
            } else {
              setError(true);
            }
          } catch (error) {
            setError(true);
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

  /**
   * CustomizedLine component - Renders a custom line for the chart.
   * @component
   * @param {Object} props - The component props
   * @param {Array} props.points - The line points
   * @returns {JSX.Element | null} The rendered CustomizedLine component or null
   */
  const CustomizedLine = ({ points }: any) => {
    if (activeIndex === null) return null;

    return (
      <>
        <path
          d={`M ${points
            .slice(0, activeIndex + 1)
            .map((point: any) => `${point.x},${point.y}`)
            .join(" L ")}`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeOpacity={0.5}
          strokeLinecap="round"
        />
        <path
          d={`M ${points
            .slice(activeIndex)
            .map((point: any) => `${point.x},${point.y}`)
            .join(" L ")}`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeOpacity={1}
          strokeLinecap="butt"
        />
      </>
    );
  };

  /**
   * CustomizedDot component - Renders a custom dot for the chart.
   * @component
   * @param {Object} props - The component props
   * @param {number} props.cx - The x coordinate
   * @param {number} props.cy - The y coordinate
   * @param {number} props.index - The dot index
   * @returns {JSX.Element | null} The rendered CustomizedDot component or null
   */
  const CustomizedDot = (props: any) => {
    const { cx, cy, index } = props;
    if (index === activeIndex) {
      return <circle cx={cx} cy={cy} r={dotRadius} fill="#FFFFFF" />;
    }
    return null;
  };

  if (error) {
    return (
      <div className="flex h-[263px] w-[258px] items-center justify-center rounded-md bg-white">
        <p className="text-center text-base font-medium text-[#F04438]">
          Une erreur est survenue lors de la récupération des données.
          <br />
          Veuillez réessayer plus tard.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-[263px] w-[258px] overflow-hidden rounded-md bg-[#FF0000]">
      <h2 className="absolute left-[34px] top-[29px] w-[147px] text-[15px] font-medium leading-[24px] text-[#FFFFFF] opacity-50">
        Durée moyenne des sessions
      </h2>
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
            dot={<CustomizedDot />}
            activeDot={false}
            isAnimationActive={false}
          >
            <CustomizedLine />
          </Line>
        </LineChart>
      </ResponsiveContainer>
      {cursorX !== null && (
        <div
          className="pointer-events-none absolute bottom-16 top-20 bg-[#FF0000] opacity-50"
          style={{
            left: 0,
            top: "90px",
            width: `${cursorX - 5}px`,
            height: `calc(100% - 150px)`,
          }}
        />
      )}
    </div>
  );
};

export default Goals;
