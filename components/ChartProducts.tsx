import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box } from "@chakra-ui/react";
import SkeletonLoader from "./SkeletonLoader";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Colors
);

// Admin should be able to view a chart that shows the number of items per Brand

const ChartProducts = () => {
  const { data, loading } = useSelector((state: RootState) => state.products);

  if (loading) {
    return <SkeletonLoader length={5} width={600} />;
  }

  const getDataCharts = data?.products.reduce((acc: {} | any, cur) => {
    acc[cur.brand] = (acc[cur.brand] || 0) + 1;
    return acc;
  }, {});

  const brands = getDataCharts && Object.keys(getDataCharts);
  const values = getDataCharts && Object.values(getDataCharts);

  const barData = {
    labels: brands ? brands : ["product 1", "product 2"],
    datasets: [
      {
        label: "Chart - Number of items per brand",
        data: values
          ? values.map((value: any) => {
              return value;
            })
          : ["product 1", "product 2"],
        backgroundColor: [
          "gray",
          "salmon",
          "lightBlue",
          "midnightBlue",
          "orange",
          "green",
          "black",
          "yellow",
          "blue",
          "red",
        ],
      },
    ],
    option: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  return (
    <Box h={{ base: "max-content", md: 300 }} w={{ base: "full", md: 600 }}>
      <Bar data={barData} height="full" />
    </Box>
  );
};

export default ChartProducts;
