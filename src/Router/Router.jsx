import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import AllScholarship from "../Pages/AllScholarship";
import ErrorPage from "../Components/Shared/ErrorPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile";
import MyApplication from "../Pages/Dashboard/MyApplication";
import MyReviews from "../Pages/Dashboard/MyReviews";
import PrivetRoute from '../Router/PrivetRoute';
import AllReviews from "../Pages/Dashboard/Moderator/AllReviews";
import AllAppliedScholarship from "../Pages/Dashboard/Moderator/AllAppliedScholarship";
import AddScholarship from "../Pages/Dashboard/Admin&Moderator/AddScholarship";
import ScholarshipDetails from "../Pages/Home/ScholarshipDetails";
import ManageScholarships from "../Pages/Dashboard/Admin&Moderator/ManageScholarships";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import EditScholarship from "../Pages/Dashboard/Admin&Moderator/EditScholarship";
import ApplyScholarship from "../Pages/Home/ApplyScholarship";
import EditMyApplication from "../Pages/Dashboard/EditMyApplication";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/all-scholarship",
                element: <AllScholarship/>
            },
            {
                path: "/scholarshipDetails/:id",
                element: <PrivetRoute><ScholarshipDetails/></PrivetRoute>
            },
            {
                path: "/applyScholarship/:id",
                element: <PrivetRoute><ApplyScholarship/></PrivetRoute>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/dashboard",
        element: <PrivetRoute><DashboardLayout/></PrivetRoute>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "my-profile",
                element: <MyProfile/>
            },
            {
                path: "my-application",
                element: <MyApplication/>
            },
            {
                path: "my-application/:id",
                element: <EditMyApplication/>
            },
            {
                path: "my-reviews",
                element: <MyReviews/>
            },
            // Moderator
            {
                path: "all-reviews",
                element: <AllReviews/>
            },
            {
                path: "all-applied-scholarship",
                element: <AllAppliedScholarship/>
            },
            {
                path: "add-scholarship", //moderator & admin
                element: <AddScholarship/>
            },
            {
                path: "manage-scholarships", //moderator & admin
                element: <ManageScholarships/>
            },
            {
                path: "manage-scholarships/:id",
                element: <EditScholarship/>
            },
            // admin
            {
                path: "manage-applied-application",
            },
            {
                path: "manage-users",
                element: <ManageUsers/>
            },
            {
                path: "manage-review"
            }
        ]
    }
]);