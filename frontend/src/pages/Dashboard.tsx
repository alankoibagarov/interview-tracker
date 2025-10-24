import React, { useState, useEffect } from "react";
import { interviewsApi } from "../services/interviewsApi";
import type { InterviewStats } from "../services/interviewsApi";
import { formatDate, formatTimeAgo } from "../helpers/date";

const defaultStats: InterviewStats = {
  total: 0,
  completed: 0,
  scheduled: 0,
  pending: 0,
  cancelled: 0,
  successRate: 0,
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<InterviewStats>(defaultStats);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, activityData] = await Promise.all([
        interviewsApi.getInterviewStats(),
        interviewsApi.getRecentActivity(),
      ]);
      setStats(statsData);
      setRecentActivity(activityData);
      setError(null);
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return "📅";
      case "completed":
        return "✅";
      case "cancelled":
        return "❌";
      case "pending":
        return "⏳";
      default:
        return "📝";
    }
  };

  const getActivityStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Interview Scheduled";
      case "completed":
        return "Interview Completed";
      case "cancelled":
        return "Interview Cancelled";
      default:
        return "Interview Updated";
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-900 py-5 w-full">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center gap-5 bg-slate-900 rounded-lg">
        <h1 className="text-2xl">Oops, error happened</h1>

        <div>Error details: {error || "unknown"}</div>
        <button
          onClick={loadDashboardData}
          className="ml-2 bg-red-600 hover:bg-red-800 p-4 rounded-lg text-white transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-5 w-full h-fit rounded">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <div className="grid gap-5">
          {/* Statistics Cards */}
          <div className="bg-slate-900 dark:bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-white dark:text-gray-800 text-2xl font-semibold mb-6">
              Interview Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 auto-rows-fr">
              <div className="stat-card">
                <h3 className="text-white text-gray-600 text-base mb-4 font-semibold">
                  Total Interviews
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.total}
                </div>
                <p className="text-white dark:text-gray-500 text-sm">
                  Interviews tracked
                </p>
              </div>

              <div className="stat-card">
                <h3 className="text-white dark:text-gray-600 text-base mb-4 font-semibold">
                  Completed
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.completed}
                </div>
                <p className="text-white dark:text-gray-500 text-sm">
                  Interviews finished
                </p>
              </div>

              <div className="stat-card">
                <h3 className="text-white dark:text-gray-600 text-base mb-4 font-semibold">
                  Scheduled
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.scheduled}
                </div>
                <p className="text-white dark:text-gray-500 text-sm">
                  Upcoming interviews
                </p>
              </div>

              <div className="stat-card">
                <h3 className="text-white dark:text-gray-600 text-base mb-4 font-semibold">
                  Success Rate
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.successRate}%
                </div>
                <p className="text-white dark:text-gray-500 text-sm">
                  Positive outcomes
                </p>
              </div>
            </div>
          </div>
          {/* Statistics Cards */}
          <div className="bg-slate-900 dark:bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-white dark:text-gray-800 text-2xl font-semibold mb-6">
              Interview Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 auto-rows-fr">
              <div className="stat-card">
                <h3 className="text-white text-gray-600 text-base mb-4 font-semibold">
                  Total Interviews
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.total}
                </div>
                <p className="text-white dark:text-gray-500 text-sm">
                  Interviews tracked
                </p>
              </div>

              <div className="stat-card">
                <h3 className="text-white dark:text-gray-600 text-base mb-4 font-semibold">
                  Completed
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.completed}
                </div>
                <p className="text-white dark:text-gray-500 text-sm">
                  Interviews finished
                </p>
              </div>

              <div className="stat-card">
                <h3 className="text-white dark:text-gray-600 text-base mb-4 font-semibold">
                  Scheduled
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.scheduled}
                </div>
                <p className="text-white dark:text-gray-500 text-sm">
                  Upcoming interviews
                </p>
              </div>

              <div className="stat-card">
                <h3 className="text-white dark:text-gray-600 text-base mb-4 font-semibold">
                  Success Rate
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.successRate}%
                </div>
                <p className="text-white dark:text-gray-500 text-sm">
                  Positive outcomes
                </p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 dark:bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-white dark:text-gray-800 text-2xl font-semibold mb-6">
              Interview Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 auto-rows-fr">
              <div className="stat-card">
                <h3 className="text-white text-gray-600 text-base mb-4 font-semibold">
                  Total Interviews
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.total}
                </div>
                <p className="text-white dark:text-gray-500 text-sm">
                  Interviews tracked
                </p>
              </div>

              <div className="stat-card">
                <h3 className="text-white dark:text-gray-600 text-base mb-4 font-semibold">
                  Completed
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.completed}
                </div>
                <p className="text-white dark:text-gray-500 text-sm">
                  Interviews finished
                </p>
              </div>

              <div className="stat-card">
                <h3 className="text-white dark:text-gray-600 text-base mb-4 font-semibold">
                  Scheduled
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.scheduled}
                </div>
                <p className="text-white dark:text-gray-500 text-sm">
                  Upcoming interviews
                </p>
              </div>

              <div className="stat-card">
                <h3 className="text-white dark:text-gray-600 text-base mb-4 font-semibold">
                  Success Rate
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.successRate}%
                </div>
                <p className="text-white dark:text-gray-500 text-sm">
                  Positive outcomes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900 dark:bg-white rounded-2xl p-8 mb-10 shadow-xl">
          <h2 className="text-white dark:text-gray-800 text-2xl font-semibold mb-6">
            Recent Activity
          </h2>
          <div className="grid grid-cols-1 gap-5 mb-10 bg-white rounded-2xl p-8 shadow-xl">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-1 items-center p-5 bg-gray-50 rounded-xl transition-colors duration-300 hover:bg-gray-100"
                >
                  <div className="text-2xl mr-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md">
                    {getActivityIcon(activity.status)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-semibold mb-1">
                      {getActivityStatusText(activity.status)}
                    </h4>
                    <p className="text-gray-600 mb-1">
                      {activity.company} - {activity.position}
                    </p>
                    <span
                      className="text-gray-400 text-sm"
                      title={formatDate(activity.updatedAt)}
                    >
                      {formatTimeAgo(activity.updatedAt)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
