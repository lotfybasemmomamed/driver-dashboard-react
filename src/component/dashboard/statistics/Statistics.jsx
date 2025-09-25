"use client";
import { useMemo } from "react";
import { fackData } from "../../../fackData/fackData";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faRoute,
  faCheckCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function Statistics() {
  const totalDrivers = fackData.drivers.length;
  const totalRoutes = fackData.routes.length;
  const assignedRoutes = fackData.routes.filter((r) => r.status === "assigned" || r.status === "in_progress").length;
  const unassignedRoutes = totalRoutes - assignedRoutes;

  const priorityData = useMemo(() => {
    const counts= { high: 0, medium: 0, low: 0 };
    fackData.routes.forEach((r) => {
      counts[r.priority] = (counts[r.priority] || 0) + 1;
    });
    return [
      { name: "High", value: counts.high },
      { name: "Medium", value: counts.medium },
      { name: "Low", value: counts.low },
    ];
  }, []);

  const driverShiftData = useMemo(() => {
    const counts = {};
    fackData.drivers.forEach((d) => {
      counts[d.shift] = (counts[d.shift] || 0) + 1;
    });
    return Object.entries(counts).map(([shift, value]) => ({
      name: shift,
      value,
    }));
  }, []);

  const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"];

  return (
    <div className="p-6 space-y-10 mt-25 border-4 border-gray-100">
      <h1 className="text-3xl font-bold"><FontAwesomeIcon icon={faChartBar} /> Statistics Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <div className="p-6 bg-white rounded-2xl shadow-md flex items-center gap-4">
          <FontAwesomeIcon icon={faTruck} className="text-blue-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Drivers</h2>
            <p className="text-2xl font-bold">{totalDrivers}</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md flex items-center gap-4">
          <FontAwesomeIcon icon={faRoute} className="text-green-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Routes</h2>
            <p className="text-2xl font-bold">{totalRoutes}</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md flex items-center gap-4">
          <FontAwesomeIcon icon={faCheckCircle} className="text-purple-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Assigned Routes</h2>
            <p className="text-2xl font-bold">{assignedRoutes}</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md flex items-center gap-4">
          <FontAwesomeIcon icon={faClock} className="text-red-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Unassigned Routes</h2>
            <p className="text-2xl font-bold">{unassignedRoutes}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Routes by Priority</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {priorityData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Drivers by Shift</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={driverShiftData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Latest Drivers</h2>
          <ul className="space-y-3">
            {fackData.drivers.slice(-5).map((d) => (
              <li
                key={d.id}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
              >
                <span className="font-medium">{d.name}</span>
                <span className="text-sm text-gray-500">{d.vehicle}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Latest Routes</h2>
          <ul className="space-y-3">
            {fackData.routes.slice(-5).map((r) => (
              <li
                key={r.id}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
              >
                <span className="font-medium">{r.name}</span>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    r.priority === "high"
                      ? "bg-red-100 text-red-600"
                      : r.priority === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {r.priority}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
