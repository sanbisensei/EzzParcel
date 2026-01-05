import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaBox,
  FaDollarSign,
  FaMotorcycle,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaClock,
  FaTruck,
} from "react-icons/fa";

const AdminDashBoard = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalParcels: 0,
    totalRevenue: 0,
    totalRiders: 0,
    totalUsers: 0,
    pendingParcels: 0,
    deliveredParcels: 0,
    inTransitParcels: 0,
    paidParcels: 0,
    unpaidParcels: 0,
    pendingRiderApplications: 0,
    activeRiders: 0,
    totalFeedbacks: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState({
    recentParcels: [],
    recentPayments: [],
    recentRiders: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch all data in parallel
      const [
        parcelsRes,
        paymentsRes,
        pendingRidersRes,
        activeRidersRes,
        feedbacksRes,
      ] = await Promise.all([
        axiosSecure.get("/parcels"),
        axiosSecure.get("/payments"),
        axiosSecure.get("/riders/pending"),
        axiosSecure.get("/riders/active"),
        axiosSecure.get("/feedbacks"),
      ]);

      const parcels = parcelsRes.data || [];
      const payments = paymentsRes.data || [];
      const pendingRiders = pendingRidersRes.data || [];
      const activeRiders = activeRidersRes.data || [];
      const feedbacks = feedbacksRes.data || [];

      // Calculate statistics
      const totalRevenue = payments.reduce(
        (sum, payment) => sum + (payment.amount || 0),
        0
      );

      const paidParcels = parcels.filter(
        (p) => p.payment_status === "paid"
      ).length;
      const unpaidParcels = parcels.filter(
        (p) => p.payment_status === "unpaid"
      ).length;

      const deliveredParcels = parcels.filter(
        (p) => p.delivery_status === "delivered"
      ).length;
      const inTransitParcels = parcels.filter(
        (p) => p.delivery_status === "in-transit"
      ).length;
      const pendingParcels = parcels.filter(
        (p) =>
          p.delivery_status === "not collected" ||
          p.delivery_status === "assigned" ||
          p.delivery_status === "pending"
      ).length;

      // Calculate average rating from feedbacks
      const averageRating =
        feedbacks.length > 0
          ? (
              feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) /
              feedbacks.length
            ).toFixed(2)
          : 0;

      // Get unique users from parcels
      const uniqueUserEmails = [
        ...new Set(parcels.map((p) => p.created_by)),
      ].filter(Boolean);

      setStats({
        totalParcels: parcels.length,
        totalRevenue: totalRevenue.toFixed(2),
        totalRiders: pendingRiders.length + activeRiders.length,
        totalUsers: uniqueUserEmails.length, // Estimate from parcels
        pendingParcels,
        deliveredParcels,
        inTransitParcels,
        paidParcels,
        unpaidParcels,
        pendingRiderApplications: pendingRiders.length,
        activeRiders: activeRiders.length,
        totalFeedbacks: feedbacks.length,
        averageRating,
      });

      // Set recent activity
      setRecentActivity({
        recentParcels: parcels.slice(0, 5),
        recentPayments: payments.slice(0, 5),
        recentRiders: [
          ...pendingRiders.slice(0, 3),
          ...activeRiders.slice(0, 2),
        ],
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, subtitle, bgColor }) => (
    <div
      className={`${bgColor} border-4 border-base-content p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all`}
    >
      <div className="flex-1">
        <p className="text-sm font-bold uppercase opacity-80">{title}</p>
        <h3 className="text-4xl font-black mt-2">{value}</h3>
        {subtitle && (
          <p className="text-sm font-bold mt-2 opacity-70">{subtitle}</p>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-primary border-4 border-base-content p-6 mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-4xl font-black uppercase text-primary-content">
          Admin Dashboard
        </h1>
        <p className="text-primary-content font-bold mt-2">
          Overview of your parcel delivery system
        </p>
      </div>

      {error && (
        <div className="alert alert-error mb-6">
          <span>{error}</span>
          <button className="btn btn-sm btn-ghost" onClick={fetchDashboardData}>
            Retry
          </button>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Parcels"
          value={stats.totalParcels}
          subtitle={`${stats.deliveredParcels} delivered`}
          bgColor="bg-secondary text-secondary-content"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          subtitle={`${stats.paidParcels} paid parcels`}
          bgColor="bg-accent text-accent-content"
        />
        <StatCard
          title="Total Riders"
          value={stats.totalRiders}
          subtitle={`${stats.activeRiders} active`}
          bgColor="bg-success text-success-content"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          bgColor="bg-info text-info-content"
        />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-warning text-warning-content border-4 border-base-content p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-4">
            <FaClock className="text-4xl" />
            <div>
              <p className="text-sm font-bold uppercase opacity-80">Pending</p>
              <h3 className="text-3xl font-black">{stats.pendingParcels}</h3>
            </div>
          </div>
        </div>

        <div className="bg-info text-info-content border-4 border-base-content p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-4">
            <FaTruck className="text-4xl" />
            <div>
              <p className="text-sm font-bold uppercase opacity-80">
                In Transit
              </p>
              <h3 className="text-3xl font-black">{stats.inTransitParcels}</h3>
            </div>
          </div>
        </div>

        <div className="bg-success text-success-content border-4 border-base-content p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-4">
            <FaCheckCircle className="text-4xl" />
            <div>
              <p className="text-sm font-bold uppercase opacity-80">
                Delivered
              </p>
              <h3 className="text-3xl font-black">{stats.deliveredParcels}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Rider & Feedback Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-base-200 border-4 border-base-content p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-base-content pb-2 inline-block">
            Rider Applications
          </h3>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold">Pending Applications</span>
              <span className="badge badge-warning border-2 border-base-content font-black text-lg p-4">
                {stats.pendingRiderApplications}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold">Active Riders</span>
              <span className="badge badge-success border-2 border-base-content font-black text-lg p-4">
                {stats.activeRiders}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-primary text-primary-content border-4 border-base-content p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-base-content pb-2 inline-block">
            Customer Feedback
          </h3>
          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-4">
              <FaStar className="text-5xl text-yellow-300" />
              <div>
                <p className="text-sm font-bold uppercase opacity-80">
                  Average Rating
                </p>
                <h3 className="text-4xl font-black">{stats.averageRating}</h3>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold">Total Feedbacks</span>
              <span className="badge bg-base-100 text-base-content border-2 border-base-content font-black text-lg p-4">
                {stats.totalFeedbacks}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="bg-accent text-accent-content border-4 border-base-content p-6 mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-base-content pb-2 inline-block">
          Payment Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-base-100 text-base-content border-4 border-base-content p-4">
            <p className="text-sm font-bold uppercase">Paid Parcels</p>
            <h3 className="text-3xl font-black">{stats.paidParcels}</h3>
          </div>
          <div className="bg-base-100 text-base-content border-4 border-base-content p-4">
            <p className="text-sm font-bold uppercase">Unpaid Parcels</p>
            <h3 className="text-3xl font-black">{stats.unpaidParcels}</h3>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-base-200 border-4 border-base-content p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-base-content pb-2 inline-block">
          Recent Activity
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Recent Parcels */}
          <div>
            <h4 className="font-black text-lg uppercase mb-3">
              Latest Parcels
            </h4>
            <div className="space-y-2">
              {recentActivity.recentParcels.length > 0 ? (
                recentActivity.recentParcels.map((parcel) => (
                  <div
                    key={parcel._id}
                    className="bg-base-100 border-2 border-base-content p-3"
                  >
                    <p className="font-bold text-sm">
                      {parcel.tracking_id || "No Tracking ID"}
                    </p>
                    <p className="text-xs opacity-70">
                      {parcel.title || "Untitled Parcel"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`badge badge-sm font-bold ${
                          parcel.payment_status === "paid"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {parcel.payment_status || "unpaid"}
                      </span>
                      <span className="badge badge-sm badge-info font-bold">
                        {parcel.delivery_status || "pending"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4">No recent parcels</p>
              )}
            </div>
          </div>

          {/* Recent Payments */}
          <div>
            <h4 className="font-black text-lg uppercase mb-3">
              Latest Payments
            </h4>
            <div className="space-y-2">
              {recentActivity.recentPayments.length > 0 ? (
                recentActivity.recentPayments.map((payment) => (
                  <div
                    key={payment._id}
                    className="bg-base-100 border-2 border-base-content p-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-sm">
                          ${payment.amount || "0.00"}
                        </p>
                        <p className="text-xs opacity-70">
                          {payment.userEmail || "Unknown"}
                        </p>
                      </div>
                      <span className="badge badge-success badge-sm font-bold">
                        {payment.paymentMethod || "Unknown"}
                      </span>
                    </div>
                    <p className="text-xs mt-2 opacity-60">
                      {payment.paid_at_string ||
                        payment.paymentDate ||
                        "Unknown date"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center py-4">No recent payments</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
