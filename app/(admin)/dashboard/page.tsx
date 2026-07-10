import DashboardPage from "@/components/admin/dashboard/dashboard-page";
import React from "react";

const page = () => {
  return (
    <div className="space-y-6 md:pt-10 pt-5">
      <div>
        <h1 className="font-display md:text-xl  font-bold text-ink">
          Dashboard
        </h1>
        <p className="mt-1 text-xs md:text-sm text-ink/60">
          What's happening with K-Graphics right now.
        </p>
      </div>

      <DashboardPage />
    </div>
  );
};

export default page;
