import React, { useRef } from "react";
import InterviewsTable from "../components/InterviewsTable";
import InterviewsModal from "../components/InterviewsModal";

const Dashboard: React.FC = () => {
  const modalRef = useRef<{ openDialog: () => void }>(null);

  return (
    <>
      <div className="bg-slate-900 p-5 w-full h-fit">
        <div className="w-full mx-auto">
          {/* Quick Actions */}
          {/* <div className="bg-white rounded-2xl p-8 mb-10 shadow-xl">
            <h2 className="text-gray-800 text-2xl font-semibold mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="action-btn action-btn-primary">
                Schedule Interview
              </button>
              <button className="action-btn action-btn-secondary">
                Add Notes
              </button>
              <button className="action-btn action-btn-secondary">
                View Calendar
              </button>
              <button className="action-btn action-btn-secondary">
                Export Data
              </button>
            </div>
          </div> */}

          {/* Interviews Table */}
          <div className="mb-10">
            <InterviewsTable
              openDialog={() => modalRef.current?.openDialog()}
            />
          </div>
        </div>
      </div>
      <InterviewsModal ref={modalRef} />
    </>
  );
};

export default Dashboard;
