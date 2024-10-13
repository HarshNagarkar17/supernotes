import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const ProfileBanner = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage
            src={data?.user?.image || "/placeholder-user.jpg"}
            alt={data?.user?.name || "User"}
          />
          <AvatarFallback>{data?.user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit p-4 bg-white rounded-lg shadow-lg"
        align="end"
      >
        <div className="flex items-center space-x-4 pb-2 border-b border-gray-200">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={data?.user?.image || "/placeholder-user.jpg"}
              alt={data?.user?.name || "User"}
            />
            <AvatarFallback>
              {data?.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-900">
              {data?.user?.name}
            </p>
            <p className="text-xs text-gray-500">{data?.user?.email}</p>
          </div>
        </div>
        <div className="mt-2">
          <Button
            variant="outline"
            className="w-full text-sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileBanner;
