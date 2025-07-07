"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Phone,
  Calendar,
  Settings,
  Edit3,
  Camera,
  Star,
  Award,
  TrendingUp,
  Clock,
  Loader2,
} from "lucide-react";

// Import your custom components and Redux hooks
import {
  useGetUserWithProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/api/userApi";
import { TUserWithProfile } from "@/types/User";
import UpdateUserProfileModal from "@/components/Modal/UpdateUserProfileModal/UpdateUserProfileModal";
import Loading from "@/components/Custom/Loading/Loading";
import { toast } from "sonner";

// Your MUI cover image
const coverImage =
  "https://images.unsplash.com/photo-1636690424408-4330adc3e583";
const placeholder =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUOdfo4lewXJYT_2xPo_Xu2Lj6XPn78X9UJA&s";

const ProfileDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const { data, isLoading } = useGetUserWithProfileQuery({});
  const [updateUser] = useUpdateUserProfileMutation();

  const profileData = data?.data;
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (updatedUser: Partial<TUserWithProfile>) => {
    try {
      const res = await updateUser(updatedUser);
      if (res?.data?.id) {
        toast.success("Profile updated successfully!");
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">No profile data available</p>
        </div>
      </div>
    );
  }

  const InfoCard = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string;
  }) => (
    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <Icon className="h-5 w-5 text-gray-600" />
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">{value}</p>
      </div>
    </div>
  );

  const StatCard = ({
    icon: Icon,
    label,
    value,
    color,
  }: {
    icon: any;
    label: string;
    value: string | number;
    color: string;
  }) => (
    <div className="flex items-center space-x-3 p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Your MUI Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Profile Header */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end space-x-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                  <AvatarImage
                    src={profileData?.userProfile.image || placeholder}
                    alt={profileData?.userProfile?.name || profileData.username}
                  />
                  <AvatarFallback className="text-2xl font-bold">
                    {profileData.name
                      ? profileData.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 h-8 w-8 rounded-full p-0 bg-white text-gray-600 hover:bg-gray-100"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 text-white pb-4">
                <h1 className="text-3xl font-bold mb-2">
                  {profileData?.userProfile?.name || profileData.username}
                </h1>
                <p className="text-lg opacity-90 mb-2">
                  {profileData?.userProfile?.profession ||
                    "Profession not provided"}
                </p>
                <div className="flex items-center space-x-4 text-sm opacity-80">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {profileData?.userProfile?.country ||
                        "Address not provided"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{profileData.email}</span>
                  </div>
                </div>
              </div>

              <div className="pb-4">
                <Button
                  variant="outline"
                  className="bg-white/90 text-gray-800 hover:bg-white"
                  onClick={handleOpenModal}
                  disabled={isButtonDisabled}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 mt-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={User}
            label="Username"
            value={profileData.username}
            color="bg-blue-500"
          />
          <StatCard
            icon={Mail}
            label="Email Status"
            value="Verified"
            color="bg-green-500"
          />
          <StatCard
            icon={Briefcase}
            label="Profile Status"
            value="Active"
            color="bg-yellow-500"
          />
          <StatCard
            icon={Settings}
            label="Account Type"
            value="Premium"
            color="bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard
                    icon={User}
                    label="Username"
                    value={profileData.username}
                  />
                  <InfoCard
                    icon={Mail}
                    label="Email"
                    value={profileData.email}
                  />
                  <InfoCard
                    icon={User}
                    label="Full Name"
                    value={profileData?.userProfile?.name || "Not provided"}
                  />
                  <InfoCard
                    icon={Briefcase}
                    label="Profession"
                    value={
                      profileData?.userProfile?.profession || "Not provided"
                    }
                  />
                  <InfoCard
                    icon={MapPin}
                    label="Address"
                    value={profileData?.userProfile?.country || "Not provided"}
                  />
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2 flex items-center space-x-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Professional Summary</span>
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {profileData?.userProfile?.bio ||
                      "No bio provided yet. Click 'Edit Profile' to add your professional summary."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Activity */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={handleOpenModal}
                  disabled={isButtonDisabled}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Profile Completion</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Profile Picture</span>
                    <Badge
                      variant={
                        profileData?.userProfile?.image
                          ? "default"
                          : "secondary"
                      }
                    >
                      {profileData?.userProfile?.image ? "✓" : "Missing"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Full Name</span>
                    <Badge
                      variant={
                        profileData?.userProfile?.name ? "default" : "secondary"
                      }
                    >
                      {profileData?.userProfile?.name ? "✓" : "Missing"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Profession</span>
                    <Badge
                      variant={
                        profileData?.userProfile?.profession
                          ? "default"
                          : "secondary"
                      }
                    >
                      {profileData?.userProfile?.profession ? "✓" : "Missing"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Address</span>
                    <Badge
                      variant={
                        profileData?.userProfile?.country
                          ? "default"
                          : "secondary"
                      }
                    >
                      {profileData?.userProfile?.address ? "✓" : "Missing"}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      {Math.round(
                        ([
                          profileData?.userProfile?.image,
                          profileData?.userProfile?.name,
                          profileData?.userProfile?.profession,
                          profileData?.userProfile?.country,
                        ].filter(Boolean).length /
                          4) *
                          100
                      )}
                      % Complete
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Your Custom Modal */}
      {profileData && (
        <UpdateUserProfileModal
          open={isModalOpen}
          userProfile={profileData}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProfileDashboard;
