import React, { useRef } from "react";
import InterviewsModal from "../components/InterviewsModal";

const Dashboard: React.FC = () => {
  const modalRef = useRef<{ openDialog: () => void }>(null);

  return (
    <>
      <div className="bg-slate-900 pb-5 pt-[7rem] w-full h-fit">
        <header className="text-center text-white mb-10">
          <h1 className="text-5xl font-bold mb-3">Calendar</h1>
        </header>
      </div>
      <InterviewsModal ref={modalRef} />
    </>
  );
};

export default Dashboard;
