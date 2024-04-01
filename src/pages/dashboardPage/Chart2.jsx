import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/users";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Chart2() {
  const dispatch = useDispatch();
  const [seriesData, setSeriesData] = React.useState([]);
  const usersArr = useSelector((state) => state.users.users.data);
  const chartContainerRef = useRef(null);
  const [chartSize, setChartSize] = useState({ width: 400, height: 300 });
  React.useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  useEffect(() => {
    if (usersArr) {
      const sortedUsers = [...usersArr].sort(
        (a, b) => b.impressions - a.impressions
      );
      const top5Users = sortedUsers.slice(0, 5);

      const newData = top5Users.map((user, index) => ({
        id: index,
        value: user.impressions,
        label: `${user.firstName}`,
      }));
      setSeriesData(newData);
    }
  }, [usersArr]);

  useEffect(() => {
    function handleResize() {
      if (chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.offsetWidth;
        const containerHeight = chartContainerRef.current.offsetHeight;

        let width = containerWidth;
        let height = containerHeight;
        if (containerWidth > 500) {
          width = 400;
          height = 300;
        } else if (containerWidth > 400) {
          width = 300;
          height = 225;
        } else if (containerWidth > 300) {
          width = 220;
          height = 225;
        } else if (containerWidth > 100) {
          width = 200;
          height = 225;
        } else {
          width = containerWidth * 0.8;
          height = containerWidth * 0.6;
        }
        setChartSize({ width, height });
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Stack direction="row" width="100%" textAlign="center" spacing={2}>
      <Box flexGrow={1}>
        <Typography variant="h2" margin={5}>
          Top 5 User Impressions
        </Typography>
        <Box
          paddingLeft={10}
          ref={chartContainerRef}
          display={"flex"}
          justifyContent={"center"}
        >
          <PieChart
            series={[
              {
                data: seriesData,
              },
            ]}
            width={chartSize.width}
            height={chartSize.height}
            labelPosition={"outer-end"}
          />
        </Box>
      </Box>
    </Stack>
  );
}
