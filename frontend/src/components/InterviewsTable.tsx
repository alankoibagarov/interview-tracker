import React, { useState, useEffect } from "react";
import {
  type Interview,
  InterviewType,
  InterviewStatus,
  interviewsApi,
} from "../services/interviewsApi";
import { useInterviewsStore } from "../store/interviewsStore";
import {
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  StarIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { capitalize } from "../helpers";
import { interviewStatuses } from "../const/lists";

interface InterviewsTableProps {
  openDialog: () => void;
  openDetailsDialog: () => void;
}

const InterviewsTable: React.FC<InterviewsTableProps> = ({
  openDialog,
  openDetailsDialog,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Interview>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterStatus, setFilterStatus] = useState<InterviewStatus | "all">(
    "all"
  );
  const interviewsStore = useInterviewsStore();
  const interviews = interviewsStore.interviews;
  const { setInterviews, setSelectedInterview } = interviewsStore;

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      setLoading(true);
      const data = await interviewsApi.getInterviews();
      setInterviews(data);
      setError(null);
    } catch (err) {
      setError("Failed to load interviews");
      console.error("Error loading interviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: keyof Interview) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDelete = async (id: number) => {
    if (globalThis.confirm("Are you sure you want to delete this interview?")) {
      try {
        await interviewsApi.deleteInterview(id);
        setInterviews(interviews.filter((interview) => interview.id !== id));
        alert("Interview deleted successfully");
      } catch (err) {
        setError("Failed to delete interview");
        console.error("Error deleting interview:", err);
      }
    }
  };

  const handleEdit = async (interview: Interview) => {
    setSelectedInterview(interview);

    openDialog();
  };

  const addInterview = () => {
    setSelectedInterview(null);

    openDialog();
  };

  const handleOpenDetails = async (interview: Interview) => {
    setSelectedInterview(interview);

    openDetailsDialog();
  };

  const exportToExcel = async () => {
    alert("Export to Excel functionality is not implemented yet.");
  };

  const getStatusColor = (status: InterviewStatus) => {
    switch (status) {
      case InterviewStatus.Completed:
        return "bg-green-100 text-green-800";
      case InterviewStatus.Scheduled:
        return "bg-blue-100 text-blue-800";
      case InterviewStatus.Pending:
        return "bg-yellow-100 text-yellow-800";
      case InterviewStatus.Cancelled:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: InterviewType) => {
    switch (type) {
      case InterviewType.Phone:
        return "📞";
      case InterviewType.Video:
        return "📹";
      case InterviewType.Onsite:
        return "🏢";
      case InterviewType.Technical:
        return "💻";
      case InterviewType.Behavioral:
        return "🤝";
      default:
        return "📋";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortedAndFilteredInterviews = interviews
    .filter(
      (interview) => filterStatus === "all" || interview.status === filterStatus
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return sortDirection === "asc" ? 1 : -1;
      if (bValue === undefined) return sortDirection === "asc" ? -1 : 1;
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
        <button
          onClick={loadInterviews}
          className="ml-2 text-red-600 hover:text-red-800 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Interview Records
          </h2>
          <div className="flex gap-2">
            <button
              onClick={addInterview}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
            >
              Add Interview
            </button>
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as InterviewStatus | "all")
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Statuses</option>
              {interviewStatuses.map((val) => (
                <option key={val} value={val}>
                  {capitalize(val)}
                </option>
              ))}
            </select>
            <button
              onClick={loadInterviews}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors"
            >
              <ArrowPathIcon title="Refresh" className="h-5 w-5" />
            </button>
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
            >
              <ArrowDownTrayIcon
                title="Download Excel file"
                className="h-5 w-5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("company")}
              >
                <div className="flex items-center gap-1">
                  Company
                  {sortField === "company" && (
                    <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("position")}
              >
                <div className="flex items-center gap-1">
                  Position
                  {sortField === "position" && (
                    <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center gap-1">
                  Date
                  {sortField === "date" && (
                    <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interviewer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAndFilteredInterviews.map((interview) => (
              <tr key={interview.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {interview.company}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {interview.position}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(interview.date)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {getTypeIcon(interview.type)}
                    </span>
                    <span className="text-sm text-gray-900 capitalize">
                      {interview.type}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      interview.status
                    )}`}
                  >
                    {capitalize(interview.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {interview.interviewer || "-"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {interview.rating ? (
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-900">
                        {interview.rating}/5
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < interview.rating!
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            <StarIcon className="h-4 w-4" />
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenDetails(interview)}
                      className="text-indigo-600 hover:text-indigo-900 transition-colors cursor-pointer"
                      title="Details"
                    >
                      <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(interview)}
                      className="text-yellow-600 hover:text-yellow-900 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(interview.id)}
                      className="text-red-600 hover:text-red-900 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {sortedAndFilteredInterviews.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg">No interviews found</div>
          <div className="text-gray-400 text-sm mt-2">
            {filterStatus !== "all"
              ? `No interviews with status "${filterStatus}"`
              : "No interviews recorded yet"}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="text-sm text-gray-600">
          Showing {sortedAndFilteredInterviews.length} of {interviews.length}{" "}
          interviews
        </div>
      </div>
    </div>
  );
};

export default InterviewsTable;
