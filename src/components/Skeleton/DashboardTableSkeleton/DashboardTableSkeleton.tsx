const DashboardTableSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Loading skeleton */}
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="border rounded-lg">
          <div className="h-12 bg-gray-100 border-b"></div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-50 border-b"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTableSkeleton;
