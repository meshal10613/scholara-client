import { LayoutDashboard } from "lucide-react";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
} from "recharts";

const AdminChart = ({ data }) => {
    const chartData = [
        { name: "Users", value: data?.users || 0, color: "#6366f1" },
        {
            name: "Scholarships",
            value: data?.scholarships || 0,
            color: "#8b5cf6",
        },
        {
            name: "Applications",
            value: data?.appliedScholarships || 0,
            color: "#ec4899",
        },
        { name: "Reviews", value: data?.reviews || 0, color: "#f43f5e" },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/80 backdrop-blur-md border border-slate-200 p-4 rounded-xl shadow-xl ring-1 ring-black/5">
                    <p className="text-sm font-bold text-slate-800 mb-1">
                        {label}
                    </p>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: payload[0].payload.color,
                            }}
                        />
                        <p className="text-lg font-semibold text-slate-900">
                            {payload[0].value.toLocaleString()}
                        </p>
                    </div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 mt-1 font-medium">
                        System Statistics
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
            {/* Header Section */}
            <div className="flex flex-col mb-8">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5 text-indigo-500" />{" "}
                    Platform Overview
                </h3>
                <p className="text-sm text-slate-500">
                    Real-time statistics of your scholarship ecosystem
                </p>
            </div>

            <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        barSize={50}
                    >
                        {/* Subtle Grid Lines */}
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="#f1f5f9"
                        />

                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#64748b",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                            dy={15}
                        />

                        <YAxis
                            allowDecimals={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94a3b8", fontSize: 12 }}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: "#f8fafc", radius: 12 }}
                            animationDuration={200}
                        />

                        <Bar
                            dataKey="value"
                            radius={[10, 10, 10, 10]} // Fully rounded pill shape
                            animationBegin={200}
                            animationDuration={1200}
                            animationEasing="ease-in-out"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    fillOpacity={0.85}
                                    className="hover:fill-opacity-100 transition-all duration-300"
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Bottom Summary Tags (Optional but good for UX) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-50">
                {chartData.map((item) => (
                    <div
                        key={item.name}
                        className="flex flex-col items-center justify-center"
                    >
                        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-widest">
                            {item.name}
                        </span>
                        <span className="text-lg font-bold text-slate-700">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminChart;
