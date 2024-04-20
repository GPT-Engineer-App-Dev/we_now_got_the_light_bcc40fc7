import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { createChart } from "lightweight-charts";

const CryptoChart = ({ data, color }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    if (!data) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        backgroundColor: "#ffffff",
        textColor: "rgba(33, 56, 77, 1)",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
      },
    });

    const lineSeries = chart.addLineSeries({
      color: color,
    });

    lineSeries.setData(
      data.map((dataPoint) => ({
        time: dataPoint.time / 1000,
        value: parseFloat(dataPoint.priceUsd),
      })),
    );

    return () => {
      chart.remove();
    };
  }, [data, color]);

  return <Box ref={chartContainerRef} />;
};

export default CryptoChart;
