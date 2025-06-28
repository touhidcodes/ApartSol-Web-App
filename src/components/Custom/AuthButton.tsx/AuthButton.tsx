import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logoutUser";
import Link from "next/link";
import { useState } from "react";
import useUserInfo from "@/hooks/useUserInfo";
import AuthLoading from "../Loading/AuthLoading";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = useUserInfo();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogOut = async () => {
    setIsLoggingOut(true);
    await logoutUser();
    router.push("/login");
  };

  if (isLoggingOut) {
    return <AuthLoading />;
  }

  return (
    <>
      {userInfo ? (
        <Link href="/properties" passHref>
          <Button
            onClick={handleLogOut}
            variant="outline"
            className="bg-transparent border-slate-600 text-white hover:bg-white hover:text-primary hover:border-white rounded-full px-6 py-2 font-medium transition-all duration-200 group"
          >
            <span className="font-medium">Log Out</span>
            <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      ) : (
        <Link href="/login" passHref>
          <Button
            variant="outline"
            className="bg-transparent border-slate-600 text-white hover:bg-white hover:text-primary hover:border-white rounded-full px-6 py-2 font-medium transition-all duration-200 group"
          >
            <span className="font-medium">Login</span>
            <LogIn className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
