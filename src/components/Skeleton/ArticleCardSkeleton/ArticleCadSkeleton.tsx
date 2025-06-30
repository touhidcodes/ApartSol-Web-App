import { Card, CardContent } from "@/components/ui/card";

const ArticleCadSkeleton = () => {
  return (
    <div className="bg-[#EBF0F4] py-10 mt-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="bg-white rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-300" />
              <CardContent className="p-6">
                <div className="h-4 bg-gray-300 rounded mb-3" />
                <div className="h-6 bg-gray-300 rounded mb-3" />
                <div className="h-16 bg-gray-300 rounded mb-6" />
                <div className="h-10 bg-gray-300 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleCadSkeleton;
