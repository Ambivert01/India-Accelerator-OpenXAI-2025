"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const EF_GRID = 0.82; // kg CO2/kWh
  const EF_DIESEL = 2.68; // kg CO2/litre

  const [power, setPower] = useState<number[]>([]);
  const [fuel, setFuel] = useState<number>(60);
  const [co2, setCo2] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);

  // Generate random hourly power usage
  useEffect(() => {
    const hourly = Array.from({ length: 24 }, () =>
      Math.round(Math.random() * 50 + 20)
    );
    setPower(hourly);

    // fuel CO2 = litres * factor
    const fuelCO2 = fuel * EF_DIESEL;

    // grid CO2 = total kWh * factor
    const gridCO2 = hourly.reduce((a, b) => a + b, 0) * EF_GRID;

    setCo2(fuelCO2 + gridCO2);
    setSavings(Math.round(gridCO2 * 0.15));
  }, [fuel]);

  // Chart data
  const data = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: "Power Usage (kWh)",
        data: power,
        borderColor: "rgb(59,130,246)",
        backgroundColor: "rgba(59,130,246,0.5)",
      },
    ],
  };

  return (
    <div className="flex gap-4 p-4 min-h-screen bg-gradient-to-b from-[#081023] to-[#04101a] text-slate-200 font-inter">
      {/* Sidebar */}
      <aside className="w-56 bg-white/5 rounded-xl p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold">
              SC
            </div>
            <span className="font-bold">SmartCarbon</span>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="bg-white/5 text-white rounded-md px-3 py-2 cursor-pointer">
              Dashboard
            </a>
            <a className="text-slate-400 hover:text-white cursor-pointer">
              Reports
            </a>
            <a className="text-slate-400 hover:text-white cursor-pointer">
              Alerts
            </a>
            <a className="text-slate-400 hover:text-white cursor-pointer">
              Settings
            </a>
          </nav>
        </div>
        <div className="text-xs text-slate-400">
          Need help? <span className="text-blue-400">AI Green Coach</span>
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 flex flex-col gap-4">
        {/* Top bar */}
        <header className="flex justify-between items-center">
          <div className="bg-white/5 px-4 py-2 rounded-lg">
            🔎 SmartCarbon — Live Demo
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-lg">Parth Prajapati</div>
        </header>

        {/* Cards */}
        <section className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 p-4 rounded-xl">
            <h3 className="text-sm text-slate-400">Carbon Footprint</h3>
            <p className="text-2xl font-bold">{co2.toFixed(1)} kg CO₂</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl">
            <h3 className="text-sm text-slate-400">Fuel Usage</h3>
            <p className="text-2xl font-bold">{fuel} Litres</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl">
            <h3 className="text-sm text-slate-400">Green Savings</h3>
            <p className="text-2xl font-bold">{savings} kg CO₂ saved</p>
          </div>
        </section>

        {/* Chart */}
        <section className="bg-white/5 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Power Usage Trend</h3>
          <Line data={data} />
        </section>

        {/* Coach */}
        <section className="bg-gradient-to-r from-blue-500/20 to-green-500/20 p-6 rounded-xl">
          <h3 className="font-bold mb-2">🌱 AI Sustainability Coach</h3>
          <p className="text-slate-300">
            Based on your energy profile, switching 20% load to solar can save
            extra <b>{Math.round(co2 * 0.1)} kg CO₂</b> monthly.
          </p>
        </section>
      </main>
    </div>
  );
}
