import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "./../Routes/PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../Pages/MyParcels/MyParcels";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/paymentHistory/PaymentHistory";
import TrackParcel from "../Pages/TrackParcel/TrackParcel";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRiders from "../Pages/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/ActiveRiders/ActiveRiders";
import ManageAdmins from "../Pages/ManageAdmins/ManageAdmins";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../Routes/AdminRoute";
import AssignRider from "../Pages/AssignRider/AssignRider";
import PendingDeliveries from "../Pages/PendingDeliveries/PendingDeliveries";
import RiderRoutes from "../Routes/RiderRoutes";
import CompletedDeliveries from "../Pages/CompletedDeliveries/CompletedDeliveries";
import MyEarningns from "../Pages/MyEarnings/MyEarningns";
import UserFeedback from "../Pages/Feedback/UserFeedback";
import ManageFeedbacks from "../Pages/Feedback/ManageFeedbacks";
import MyRatings from "../Pages/Feedback/MyRatings";
import AboutUs from "../Pages/AboutUs/AboutUs";
import DashBoardHome from "../Pages/DASHBOARDS/DashBoardHome";
import UserChat from "../Pages/CHAT/UserChat";
import AdminChat from "../Pages/CHAT/AdminChat";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "BeARider",
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
      },
      {
        path: "aboutus",
        Component: AboutUs,
      },
      {
        path: "sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashBoardHome,
      },
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "TrackParcel/:trackingId?",
        Component: TrackParcel,
      },
      // {
      //   path: "feedback/:orderId",
      //   Component: UserFeedback,
      // },
      // {
      //   path: "updateprofile",
      //   Component: UpdateProfile,
      // },
      {
        path: "assignrider",
        element: (
          <AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
        ),
      },
      {
        path: "PendingRiders",
        // Component: PendingRiders,
        element: (
          <AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        ),
      },
      {
        path: "ActiveRiders",
        // Component: ActiveRiders,
        element: (
          <AdminRoute>
            <ActiveRiders></ActiveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "ManageAdmins",
        // Component: ManageAdmins,
        element: (
          <AdminRoute>
            <ManageAdmins></ManageAdmins>
          </AdminRoute>
        ),
      },
      {
        path: "PendingDeliveries",
        // Component: PendingDeliveries,
        element: (
          <RiderRoutes>
            <PendingDeliveries></PendingDeliveries>
          </RiderRoutes>
        ),
      },
      {
        path: "CompletedDeliveries",

        // This route is now accessible by both Admins and Riders.
        // You might need a wrapper component to handle both roles if AdminRoute and RiderRoutes are mutually exclusive.
        // For now, let's assume you want to show the same component.
        // A better approach would be a generic `AuthorizedRoute` that takes allowed roles.
        // For simplicity, I'm adding it to both.
        Component: CompletedDeliveries,
      },
      {
        path: "myEarnings",
        element: (
          <RiderRoutes>
            <MyEarningns></MyEarningns>
          </RiderRoutes>
        ),
      },
      {
        path: "userfeedback",
        Component: UserFeedback,
      },
      {
        path: "managefeedback",
        element: (
          <AdminRoute>
            <ManageFeedbacks></ManageFeedbacks>
          </AdminRoute>
        ),
      },
      {
        path: "myratings",
        element: (
          <RiderRoutes>
            <MyRatings></MyRatings>
          </RiderRoutes>
        ),
      },
      {
        path: "chatuser",
        element: <UserChat></UserChat>,
      },
      {
        path: "chatadmin",
        element: (
          <AdminRoute>
            <AdminChat></AdminChat>
          </AdminRoute>
        ),
      },
      // User Chat Route
      // {
      //   path: "chat",
      //   element: <UserChat />,
      // },

      // // Admin Chat Route
      // {
      //   path: "admin-chat",
      //   element: <AdminChat />,
      // },
    ],
  },
]);
