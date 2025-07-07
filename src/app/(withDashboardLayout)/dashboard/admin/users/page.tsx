"use client";

import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} from "@/redux/api/userApi";
import Loading from "@/components/Custom/Loading/Loading";
import DashboardUserCard from "@/components/Card/DashboardUserCard/DashboardUserCard";

const AllUserPage = () => {
  const { data: users, isLoading } = useGetAllUserQuery({});
  const [updateUser] = useUpdateUserStatusMutation();

  const handleUpdate = async (updatedData: FieldValues, userId: string) => {
    try {
      const res = await updateUser({ userId, updatedData });

      if (res?.data?.id) {
        toast.success("User status successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6 mt-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Users</h2>
      </div>
      <DashboardUserCard users={users?.data} handleUpdate={handleUpdate} />
    </div>
  );
};

export default AllUserPage;
