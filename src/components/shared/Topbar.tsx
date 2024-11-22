import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 item-center">
          <img src="/assets/images/QuantumLogoWhite.png" alt="logo" width={130} height={325} />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/LogoutIcon.png" alt="logout" width={40} height={40} />
          </Button>
          <Link to={"/profile/${user?.id}"} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/images/profile-placeholder.png"}
              alt="profile"
              className="rounded-full h-8 w-8"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
