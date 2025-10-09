import React, { useState, useEffect } from "react";
import { interviewsApi } from "../services/interviewsApi";
import type { InterviewStats } from "../services/interviewsApi";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<InterviewStats | null>(null);
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

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "1 day ago";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 py-5 w-full">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-900 pb-5 pt-[7rem] w-full h-fit">
        <header className="text-center text-white mb-10">
          <h1 className="text-5xl font-bold mb-3">Interview Flow Dashboard</h1>
          <p className="text-xl opacity-90">
            Manage your interview process and track your progress
          </p>
        </header>

        <div className="w-full max-w-7xl mx-auto px-5">
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 bg-white rounded-2xl p-8 mb-10 shadow-xl">
              <div className="stat-card">
                <h3 className="text-gray-600 text-base mb-4 font-semibold">
                  Total Interviews
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.total}
                </div>
                <p className="text-gray-500 text-sm">Interviews tracked</p>
              </div>

              <div className="stat-card">
                <h3 className="text-gray-600 text-base mb-4 font-semibold">
                  Completed
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.completed}
                </div>
                <p className="text-gray-500 text-sm">Interviews finished</p>
              </div>

              <div className="stat-card">
                <h3 className="text-gray-600 text-base mb-4 font-semibold">
                  Scheduled
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.scheduled}
                </div>
                <p className="text-gray-500 text-sm">Upcoming interviews</p>
              </div>

              <div className="stat-card">
                <h3 className="text-gray-600 text-base mb-4 font-semibold">
                  Success Rate
                </h3>
                <div className="text-5xl font-bold text-primary-500 mb-3">
                  {stats.successRate}%
                </div>
                <p className="text-gray-500 text-sm">Positive outcomes</p>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-10">
              {error}
              <button
                onClick={loadDashboardData}
                className="ml-2 text-red-600 hover:text-red-800 underline"
              >
                Retry
              </button>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-xl">
            <h2 className="text-gray-800 text-2xl font-semibold mb-6">
              Recent Activity
            </h2>
            <div className="space-y-5">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center p-5 bg-gray-50 rounded-xl transition-colors duration-300 hover:bg-gray-100"
                  >
                    <div className="text-2xl mr-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md">
                      {getActivityIcon(activity.status)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-800 font-semibold mb-1">
                        {activity.status === "scheduled"
                          ? "Interview Scheduled"
                          : activity.status === "completed"
                          ? "Interview Completed"
                          : activity.status === "cancelled"
                          ? "Interview Cancelled"
                          : "Interview Updated"}
                      </h4>
                      <p className="text-gray-600 mb-1">
                        {activity.company} - {activity.position}
                      </p>
                      <span className="text-gray-400 text-sm">
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
    </>
  );
};

export default Dashboard;
