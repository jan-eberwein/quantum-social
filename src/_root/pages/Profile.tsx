import { Button } from "@/components/ui";
import React from "react";
import { useUserContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useUserContext();

  return (
    <div className="flex flex-1">
      <div className="common-container">
        {/* Profile Heading Section */}
        <div className="max-w-5xl flex items-center gap-3 justify-start w-full">
          <img
            src="/assets/icons/people.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Profile</h2>
          <Link to={`/update-profile/${user?.id}`}>
            <Button className="shad-button_primary whitespace-nowrap">
              Edit Profile
            </Button>
          </Link>
        </div>

        {/* Profile Details Section */}
        <div className="max-w-5xl flex items-center gap-5 w-full mt-4">
          <img
            src={
              user?.imageUrl?.toString() ||
              "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="rounded-full h-10 w-10"
          />
          <div className="profile-info">
            <h4 className="h3-bold">@ {user?.username}</h4>
            <p className="small-medium">{user?.email}</p>
          </div>
        </div>
        <div className="max-w-5xl flex items-center gap-3 justify-start w-full">
          <p className="small-medium">{user?.bio}</p>
        </div>

        {/* Image Feed - show image in Grid with GridPost List  */}
        <div className="max-w-5xl flex items-center gap-3 justify-start w-full">
            {/* --------- TODO --------- /> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
