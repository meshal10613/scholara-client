import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    CreditCard,
    User,
    Mail,
    School,
    Hash,
    ArrowUpRight,
    Search,
} from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuthContext from "../../../Hooks/useAuthContext";
import Loading from "../../../Components/Loading";

const PaymentHistory = () => {
    const { user } = useAuthContext();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["payment-history", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/appliedScholarships`);
            return res.data;
        },
    });

    // Skeleton Loader for better UX
    if (isLoading) {
        return (
            <Loading/>
        );
    }

    return (
        <div className="p-6">
            <div className="hidden lg:block overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm">
                <table className="table w-full border-collapse">
                    <thead className="bg-gray-50/50">
                        <tr className="text-gray-600 border-b border-gray-100">
                            <th className="py-5">#</th>
                            <th>Applicant</th>
                            <th>University</th>
                            <th>Scholarship</th>
                            <th>Phone</th>
                            <th className="text-right">Amount</th>
                            <th className="text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {payments.map((item, index) => (
                            <tr
                                key={item._id}
                                className="hover:bg-blue-50/30 transition-colors"
                            >
                                <td className="font-medium text-gray-400">
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-700">
                                            {item.userName}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {item.userEmail}
                                        </span>
                                    </div>
                                </td>
                                <td className="font-medium text-gray-600 italic">
                                    <div className="flex items-center gap-2">
                                        <School className="w-4 h-4 text-blue-400" />
                                        {item.universityName}
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-ghost text-xs uppercase font-bold tracking-wider">
                                        {item.scholarshipCategory}
                                    </span>
                                </td>
                                <td className="text-gray-500 font-mono text-sm">
                                    {item.applicantPhoneNumber}
                                </td>
                                <td className="text-right font-bold text-gray-800">
                                    $
                                    {parseInt(item.applicationFees) +
                                        parseInt(item.serviceCharge)}
                                </td>
                                <td className="text-center">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-600 border border-green-200">
                                        Paid
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards - Shown on small screens */}
            <div className="lg:hidden grid grid-cols-1 gap-4">
                {payments.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-2">
                            <span className="px-2 py-1 rounded-bl-xl text-[10px] font-bold uppercase bg-green-100 text-green-600">
                                Paid
                            </span>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold uppercase">
                                {item.userName.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 leading-tight">
                                    {item.userName}
                                </h3>
                                <p className="text-xs text-gray-400 italic">
                                    {item.universityName}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                                <p className="text-gray-400 text-xs">
                                    Category
                                </p>
                                <p className="font-medium text-gray-700 uppercase">
                                    {item.scholarshipCategory}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-400 text-xs">
                                    Total Amount
                                </p>
                                <p className="font-bold text-primary text-lg">
                                    $
                                    {parseInt(item.applicationFees) +
                                        parseInt(item.serviceCharge)}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-dashed border-gray-100 flex justify-between items-center">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Hash className="w-3 h-3" />{" "}
                                {item.applicantPhoneNumber}
                            </div>
                            <button className="btn btn-xs btn-ghost text-primary lowercase flex items-center gap-1">
                                Details <ArrowUpRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {!isLoading && payments.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700">
                        No Transactions Found
                    </h3>
                    <p className="text-gray-400">
                        You haven't made any scholarship payments yet.
                    </p>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
