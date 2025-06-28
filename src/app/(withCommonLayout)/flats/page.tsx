"use client";

import FlatCard from "@/components/Card/FlatCard/FlatCard";
import Loading from "@/components/Custom/Loading/Loading";
import { useGetAllFlatsQuery } from "@/redux/api/flatApi";
import { RootState } from "@/redux/store";
import { TProperty } from "@/types/Property";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FlatsPage = () => {
  const searchParams = useSelector((state: RootState) => state.flat.params);
  const [flats, setFlats] = useState<TProperty[]>([]);
  const { data, isLoading } = useGetAllFlatsQuery(searchParams);

  useEffect(() => {
    if (data) {
      setFlats(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#EBF0F4] py-20 mt-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {flats.map((flat: TProperty) => (
            <FlatCard key={flat.id} flat={flat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlatsPage;
