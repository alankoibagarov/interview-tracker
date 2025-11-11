import React, { useRef } from "react";
import InterviewsTable from "../components/InterviewsTable";
import InterviewsModal from "../components/InterviewsModal";
import DetailsModal from "../components/DetailsModal";

const Dashboard: React.FC = () => {
  const interviewsModalRef = useRef<{ openDialog: () => void }>(null);
  const detailsModalRef = useRef<{ openDialog: () => void }>(null);

  return (
    <>
      <div className="bg-slate-900 p-5 w-full h-fit">
        <div className="w-full mx-auto">
          {/* Interviews Table */}
          <InterviewsTable
            openDialog={() => interviewsModalRef.current?.openDialog()}
            openDetailsDialog={() => detailsModalRef.current?.openDialog()}
          />
        </div>
      </div>
      <InterviewsModal ref={interviewsModalRef} />
      <DetailsModal ref={detailsModalRef} />
    </>
  );
};

export default Dashboard;
