import React, { useEffect, useState } from "react";
import "./Revenue.scss";
import useAuthStore from "../../../context/userStore";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { getMonetoryStat, getMonetoryStatForSevenDays } from "./RevenueUtils";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const sevenData = [
  {
    date: "2024-11-12",
    totalRevenue: 1500,
    totalExpense: 500,
    totalProfit: 1000,
  },
  {
    date: "2024-11-11",
    totalRevenue: 1200,
    totalExpense: 400,
    totalProfit: 800,
  },
  {
    date: "2024-11-10",
    totalRevenue: 1800,
    totalExpense: 600,
    totalProfit: 1200,
  },
  {
    date: "2024-11-09",
    totalRevenue: 1400,
    totalExpense: 450,
    totalProfit: 950,
  },
  {
    date: "2024-11-08",
    totalRevenue: 1600,
    totalExpense: 550,
    totalProfit: 1050,
  },
  {
    date: "2024-11-07",
    totalRevenue: 1300,
    totalExpense: 470,
    totalProfit: 830,
  },
  {
    date: "2024-11-06",
    totalRevenue: 1700,
    totalExpense: 500,
    totalProfit: 1200,
  },
];

const RevenueChart: React.FC = () => {
  const [active, setIsActive] = useState(false);
  const { user } = useAuthStore();
  const [totalRevenue, setTotalRevenue] = useState<number | null>(null);
  const [totalProfit, setTotalProfit] = useState<number | null>(null);
  const [totalExpense, setTotalExpense] = useState<number | null>(null);
  const [sevenDaysData, setSevenDaysData] = useState<any[]>([]);

  const getMonetory = async () => {
    try {
      const metrics = await getMonetoryStat(user);
      setTotalRevenue(metrics.data.totalRevenue);
      setTotalProfit(metrics.data.totalProfit);
      setTotalExpense(metrics.data.totalExpense);
    } catch (error) {
      console.log(error);
    }
  };

  const getMonetoryForSevenDays = async () => {
    try {
      const metrics = await getMonetoryStatForSevenDays(user);
      // setSevenDaysData(metrics.data.dailyResults);
      setSevenDaysData(sevenData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMonetory();
  }, []);

  useEffect(() => {
    getMonetoryForSevenDays();
  }, []);

  const pieData = {
    labels: ["Total Revenue", "Total Expense", "Total Profit"],
    datasets: [
      {
        data: [totalRevenue ?? 100, totalExpense ?? 20, totalProfit ?? 80],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
    options: {
      plugins: {
        legend: {
          position: "right" as "right",
          labels: {
            boxWidth: 10,
            padding: 20,
          },
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      aspectRatio: 1,
    },
  };

  const lineChartData = {
    labels: sevenDaysData.map((item) => item.date),
    datasets: [
      {
        label: "Total Revenue",
        data: sevenDaysData.map((item) => item.totalRevenue),
        borderColor: "#FF6384",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Total Expense",
        data: sevenDaysData.map((item) => item.totalExpense),
        borderColor: "#36A2EB",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Total Profit",
        data: sevenDaysData.map((item) => item.totalProfit),
        borderColor: "#FFCE56",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="revenue-wrapper">
      <div className="revenue-container">
        <div className="revenue-head">
          <h4>Revenue for past 7 days</h4>
        </div>
        <div>
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </div>
      <div className="flex-three">
        <div className="chart-head">
          <h4>Today's stat</h4>
        </div>
        <div className="chart-container">
          <Pie data={pieData} options={pieData.options} />
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
