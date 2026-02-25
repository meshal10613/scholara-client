import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import Loading from "../Components/Loading";
import { Link } from "react-router";
import EmptyState from "../Components/EmptyState";
import {
    ArrowRight,
    Calendar,
    CircleDollarSign,
    MapPin,
    Search,
    SlidersHorizontal,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const AllScholarship = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(0);
    const [sortBy, setSortBy] = useState("");

    const itemsPerPage = 8;
    const numberOfPage = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPage).keys()];

    useEffect(() => {
        fetch(
            "https://assignment-12-server-xi-six.vercel.app/scholarshipsCount",
        )
            .then((res) => res.json())
            .then((data) => {
                setCount(data.count);
            });
    }, []);

    const axiosInstance = useAxios();
    const { data: scholarships = [], isLoading } = useQuery({
        queryKey: ["scholarships", itemsPerPage, currentPage, search, sortBy],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/scholarships?page=${currentPage}&size=${itemsPerPage}&search=${search}&sort=${sortBy}`,
            );
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const checkIsExpired = (deadline) => {
        if (!deadline) return false;
        const today = new Date();
        const expiry = new Date(deadline);
        today.setHours(0, 0, 0, 0);
        return expiry < today;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.search.value);
        setCurrentPage(0); // Reset to first page on search
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* --- HEADER & CONTROLS --- */}
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                    Explore Scholarships
                </h1>
                <p className="text-gray-500">
                    Find your future with our curated list of global
                    opportunities.
                </p>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4 mb-10">
                {/* Search Box */}
                <form
                    onSubmit={handleSearch}
                    className="relative flex-grow w-full md:w-auto"
                >
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                    <input
                        type="text"
                        name="search"
                        placeholder="Search by university, subject, or category..."
                        defaultValue={search}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-white px-4 py-1.5 rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Search
                    </button>
                </form>

                {/* Sort Control */}
                <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                    <div className="flex items-center gap-2 text-gray-500 font-medium whitespace-nowrap">
                        <SlidersHorizontal size={18} />
                        <span>Sort:</span>
                    </div>
                    <select
                        className="bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-secondary w-full md:w-40 appearance-none cursor-pointer"
                        onChange={(e) => {
                            setSortBy(e.target.value);
                            setCurrentPage(0);
                        }}
                        value={sortBy}
                    >
                        <option value="">Default</option>
                        <option value="az">Name (A-Z)</option>
                        <option value="za">Name (Z-A)</option>
                    </select>
                </div>
            </div>

            {/* --- RESULTS INFO --- */}
            <div className="flex items-center justify-between mb-6 px-2">
                <p className="text-gray-500 text-sm italic">
                    Showing {scholarships.length} of {count} opportunities
                </p>
            </div>

            {scholarships.length > 0 ? (
                <div>
                    {/* --- SCHOLARSHIP GRID (Design preserved) --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {scholarships.map((scholarship) => {
                            const isExpired = checkIsExpired(
                                scholarship?.applicationDeadline,
                            );
                            return (
                                <div
                                    key={scholarship._id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full max-w-80 mx-auto"
                                >
                                    {/* Card Content exactly as provided in your prompt */}
                                    <div className="relative p-6 bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                                        <img
                                            src={scholarship?.universityImage}
                                            alt={scholarship?.universityName}
                                            className="h-20 w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <span className="bg-white/80 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded-md border border-gray-100 uppercase tracking-wider text-gray-600 shadow-sm">
                                                {scholarship?.subjectCategory ||
                                                    "Academic"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-1 group-hover:text-secondary transition-colors">
                                            {scholarship?.scholarshipName}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-gray-500 mb-4">
                                            <MapPin
                                                size={14}
                                                className="shrink-0"
                                            />
                                            <span className="text-xs font-medium truncate">
                                                {scholarship?.universityName},{" "}
                                                {scholarship?.universityCountry}
                                            </span>
                                        </div>
                                        <div className="space-y-3 mb-6 flex-grow">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar
                                                        size={16}
                                                        className={
                                                            isExpired
                                                                ? "text-red-500"
                                                                : "text-secondary"
                                                        }
                                                    />
                                                    <span>Deadline</span>
                                                </div>
                                                <span
                                                    className={`font-semibold px-2 py-0.5 rounded text-xs border ${isExpired ? "bg-red-50 text-red-600 border-red-100" : "bg-green-50 text-green-700 border-green-100"}`}
                                                >
                                                    {isExpired
                                                        ? "Expired: "
                                                        : ""}
                                                    {
                                                        scholarship?.applicationDeadline
                                                    }
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <CircleDollarSign
                                                        size={16}
                                                        className="text-secondary"
                                                    />
                                                    <span>App Fee</span>
                                                </div>
                                                <span className="font-bold text-gray-900">
                                                    $
                                                    {
                                                        scholarship.applicationFees
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/scholarshipDetails/${scholarship._id}`}
                                            className={`w-full py-3 px-4 text-center rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${isExpired ? "bg-gray-100 text-gray-500 cursor-not-allowed hover:bg-gray-200" : "bg-primary text-white hover:bg-secondary"}`}
                                        >
                                            {isExpired
                                                ? "View Details (Closed)"
                                                : "See Details"}
                                            <ArrowRight
                                                size={16}
                                                className="group-hover/btn:translate-x-1 transition-transform"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* --- MODERN PAGINATION --- */}
                    <div className="mt-16 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(0, prev - 1),
                                    )
                                }
                                disabled={currentPage === 0}
                                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex items-center gap-1">
                                {pages.map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 cursor-pointer    ${
                                            currentPage === page
                                                ? "bg-secondary text-white shadow-md shadow-secondary/20"
                                                : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                    >
                                        {page + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(pages.length - 1, prev + 1),
                                    )
                                }
                                disabled={currentPage === pages.length - 1}
                                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">
                            Page {currentPage + 1} of {pages.length}
                        </p>
                    </div>
                </div>
            ) : (
                <EmptyState />
            )}
        </div>
    );
};

export default AllScholarship;
