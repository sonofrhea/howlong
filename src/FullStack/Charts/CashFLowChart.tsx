import { Link, useLocation } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Line } from 'react-chartjs-2';


import { useEffect, useState } from 'react';
import { fetchCashFlow } from "../Reports/Engines";
import { CashFlowResponse } from '../Reports/constants/Types';
import { CornerDownLeft, MoveRight } from "lucide-react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);


function CashFlowChart() {
  const [reports, setReports] = useState<CashFlowResponse[]>([]);

  useEffect(() => {
    fetchCashFlow("Monthly")
      .then(setReports)
      .catch(console.error);
  }, []);

  if (!reports.length)
    return <div className="text-center py-32 text-gray-400 text-2xl">Loading…</div>;

  if (!reports)
    return <div className="text-center py-32 text-gray-400 text-2xl">No Data!</div>;


  const chronological = [...reports].reverse();

  const labels = chronological.map((p) => p.period);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Operating Cash',
        data: chronological.map((p) => Number(p.operating_cash)),
        backgroundColor: "#6A5ACD",
        borderColor: "#6A5ACD",
        borderWidth: 3,
        pointRadius: 4,
        pointBorderWidth: 2,
        tension: 0.3
      },
      {
        label: 'Expenses',
        data: chronological.map((p) => Number(p.total_expense)),
        backgroundColor: "#a60f26",
        borderColor: "#a60f26",
        borderWidth: 3,
        pointRadius: 4,
        pointBorderWidth: 2,
        tension: 0.3
      },
      {
        label: 'Profit After Taxes',
        data: chronological.map((p) => Number(p.net_profit_before_tax)),
        backgroundColor: "#047504",
        borderColor: "#047504",
        borderWidth: 3,
        pointRadius: 4,
        pointBorderWidth: 2,
        tension: 0.3
      }
    ]
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded',
          font: { size: 14, weight: 600 },
        },
      },
      title: {
        display: true,
        text: "Company's Financial Health",
        font: { size: 22, weight: 700 },
        color: '#111827',
        padding: { bottom: 24 },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 14,
        cornerRadius: 10,
        callbacks: {
          label: (ctx: any) =>
            `${ctx.dataset.label}: ${ctx.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.06)',
        },
        ticks: {
          callback: (value: any) => `RM ${Number(value).toLocaleString()}`,
          font: { size: 13 },
        },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 13, weight: 600 } },
      },
    },
  };


  const calculateTrend = () => {
    if (chronological.length < 2) return { value: 0, isUp: true };

    const current = Number(chronological[chronological.length - 1].operating_cash);
    const previous = Number(chronological[chronological.length - 2].operating_cash);

    if (previous === 0) return { value: 0, isUp: true };

    const diff = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(diff).toFixed(1),
      isUp: diff >= 0
    };
  };

  const trend = calculateTrend();
  const latest = chronological[chronological.length - 1];
  const isHealthy = Number(latest?.operating_cash) > Number(latest?.total_expense);


    return (
      <div className="w-full max-w-7xl mx-auto p-4 md:p-8">

        <div className="bg-white mt-10 border border-gray-100 rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] shadow-gray-300 overflow-hidden">
          
          {/* Header Section: Context & Quick Stats */}
          <div className="px-8 pt-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Financial Overview</h2>
              <p className="text-gray-500 text-sm font-medium">Monthly revenue vs expenses</p>
            </div>
            
            {/*  */}
            <div className="flex gap-3">
              <div className={`px-4 py-2 rounded-2xl border ${trend.isUp ? 'bg-emerald-50 border-emerald-600 drop-shadow-md shadow-xl' : 'bg-rose-50 border-rose-600 drop-shadow-md shadow-xl'}`}>
                <span className={`block text-[10px] uppercase font-bold tracking-wider ${trend.isUp ? 'text-emerald-600' : 'text-rose-800'}`}>
                  Monthly Trend
                </span>
                <span className={`text-sm font-semibold ${trend.isUp ? 'text-emerald-900' : 'text-rose-900'}`}>
                  {trend.isUp ? '↑' : '↓'} {trend.value}%
                </span>
              </div>

              <div className={`px-4 py-2 rounded-2xl border ${isHealthy ? 'bg-blue-50 border-blue-600 drop-shadow-md shadow-xl' : 'bg-amber-50 border-amber-600 drop-shadow-md shadow-xl'}`}>
                <span className={`block text-[10px] uppercase font-bold tracking-wider ${isHealthy ? 'text-blue-600' : 'text-amber-800'}`}>
                  Health Status
                </span>
                <span className={`text-sm font-semibold ${isHealthy ? 'text-blue-900' : 'text-amber-900'}`}>
                  {isHealthy ? 'Positive' : 'Cash Burn'}
                </span>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="p-4 md:p-8">
            <div className="relative h-[400px] w-full min-w-[600px]">
              <Line data={chartData} options={options} />
            </div>
          </div>
          
          {/* Footer / Legend Disclaimer */}
          <div className="bg-gray-50/50 border-t border-gray-100 px-8 py-4">
            <p className="text-xs text-gray-400 italic">
              * Data is updated automatically based on current billing cycles.
            </p>
          </div>
        </div>
        
        <div className="mt-12 mb-16 flex justify-center">
          <Link
            to="/reports"
            className="group flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 shadow-sm transition-all duration-300 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5"
          >
            {/* The Icon */}
            <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors duration-300">
              <CornerDownLeft size={18} className="text-gray-400 group-hover:text-blue-500" />
            </div>
            
            <span>View all company full reports</span>
            
            <MoveRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </Link>
        </div>

      </div>
    );

}

export default CashFlowChart;