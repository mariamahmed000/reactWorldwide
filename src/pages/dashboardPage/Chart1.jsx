import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

const chartSetting = {
  yAxis: [
    {
      label: "Number of Users",
    },
  ],
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-10px, 0)",
    },
  },
};

export default function Chart2() {
  const usersArr = useSelector((state) => state.users.users.data);
  const chartContainerRef = useRef(null);

  const [chartSize, setChartSize] = useState({ width: 500, height: 500 });

  useEffect(() => {
    function handleResize() {
      const newWidth = window.innerWidth * 0.6;
      const newHeight = window.innerHeight * 0.39;
      setChartSize({ width: newWidth, height: newHeight });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!usersArr) {
    return <div>Loading...</div>;
  }

  const locationCounts = usersArr.reduce((counts, user) => {
    const { location } = user;
    counts[location] = (counts[location] || 0) + 1;
    return counts;
  }, {});

  const dataset = Object.keys(locationCounts).map((location) => ({
    location,
    count: locationCounts[location],
  }));
  dataset.sort((a, b) => b.count - a.count);

  return (
    <div ref={chartContainerRef}>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "location" }]}
        series={[{ dataKey: "count", label: "Number of Users" }]}
        width={chartSize.width}
        height={chartSize.height}
        {...chartSetting}
      />
    </div>
  );
}
