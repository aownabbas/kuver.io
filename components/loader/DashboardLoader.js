import React from "react";
import SkeletonLoader from "./SkeletonLoader";

function DashboardLoader() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-3">
          <SkeletonLoader className="bg-danger" width="100%" height={120} />
        </div>
        <div className="col-lg-3">
          <SkeletonLoader className="bg-danger" width="100%" height={120} />
        </div>
        <div className="col-lg-3">
          <SkeletonLoader className="bg-danger" width="100%" height={120} />
        </div>
        <div className="col-lg-3">
          <SkeletonLoader className="bg-danger" width="100%" height={120} />
        </div>
        </div>
        <div className="row mt-4">
          <div className="col-6">
            <SkeletonLoader className="bg-danger" width="100%" height={330} />
          </div>
          <div className="col-6 ">
            <SkeletonLoader className="bg-danger" width="100%" height={330} />
          </div>
        </div>
      
    </div>
  );
}

export default DashboardLoader;
