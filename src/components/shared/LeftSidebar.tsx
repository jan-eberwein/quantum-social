import React from "react";
import { useEffect } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 item-center">
          <img
            src="/assets/images/QuantumLogoWhite.png"
            alt="logo"
            width={170}
            height={35}
          />
        </Link>
        <Link to={"/profile/${user?.id}"} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/images/profile-picture-dummy.png"}
            alt="profile"
            className="rounded-full h-8 w-8"
          />
          <div className="flex flex-col">
            <p className="body-bild">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white w-8 ${isActive ? "invert-white" : ""}`} />
                  {link.label}
                </NavLink>
              </li> 
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default LeftSidebar;
