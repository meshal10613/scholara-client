// AdminChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AdminChart = ({data}) => {
    const chartData = [
        { name: 'Users', value: data?.users },
        { name: 'Scholarships', value: data?.scholarships },
        { name: 'Applications', value: data?.appliedScholarships },
        { name: 'Reviews', value: data?.reviews },
    ];

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#088395" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AdminChart;
