import { TUser } from "@/types/User";
import { FieldValues } from "react-hook-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UpdateUserModal from "@/components/Modal/UpdateUserModal/UpdateUserModal";
import { useState } from "react";

type TUserCardProps = {
  users: TUser[];
  handleUpdate: (user: FieldValues, userId: string) => void;
};

const DashboardUserCard = ({ users, handleUpdate }: TUserCardProps) => {
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const handleEditClick = (user: TUser) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUpdatedUser = (updatedUser: FieldValues, userId: string) => {
    handleUpdate(updatedUser, userId);
    setUpdateModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {users.map((user) => (
        <Card key={user.id} className="shadow-sm border">
          <CardHeader className="flex items-center text-center">
            <Avatar className="mx-auto">
              {/* Remove AvatarImage if image doesn't exist */}
              <AvatarFallback className="bg-muted text-muted-foreground">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="mt-2 text-base">{user.username}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-center space-y-1">
            <p className="text-muted-foreground">{user.email}</p>
            <p className="font-medium">{user.role}</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              size="icon"
              className="hover:text-primary hover:border-white px-6 py-2 font-medium transition-all duration-200 group  bg-[#1C2D37] hover:bg-slate-700 hover:text-white text white w-full"
              onClick={() => handleEditClick(user)}
            >
              Update
            </Button>
          </CardFooter>
        </Card>
      ))}

      {/* Update User Modal */}
      <UpdateUserModal
        open={isUpdateModalOpen}
        user={selectedUser}
        onClose={handleCloseUpdateModal}
        onSave={handleSaveUpdatedUser}
      />
    </div>
  );
};

export default DashboardUserCard;
