import React from "react";
import { useEffect } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { INavLink } from "@/types";

const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/explore1.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: "/assets/icons/createpost1.svg",
    route: "/create-post",
    label: "Create Post",
  },
];

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess, navigate]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 item-center">
          <img
            src="/assets/images/QuantumLogoWhite.png"
            alt="logo"
            width={220}
            height={35}
          />
        </Link>
        <Link to={`/profile/${user?.id}`} className="flex items-center gap-3">
          <img
            src={
              (user.imageUrl instanceof URL
                ? user.imageUrl.toString()
                : user.imageUrl) || "/assets/images/profile-picture-dummy.png"
            }
            alt="profile"
            className="rounded-full h-8 w-8"
          />
          <div className="flex flex-col">
            <p className="body-bild">{user.name}</p>
            <p className="small-regular text-off-white">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  link.label === "Create Post"
                    ? `mt-20 ${
                        isActive
                          ? "bg-primary-500 text-white"
                          : "bg-white text-dark-1 hover:bg-primary-500 hover:text-white"
                      }`
                    : isActive
                    ? "bg-primary-500 text-white"
                    : "text-light-1 hover:bg-primary-500 hover:text-white"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`w-8 ${
                      isActive || (link.label === "Create Post" && isActive)
                        ? "invert-white"
                        : "text-blue-500 group-hover:invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        <img
          src="/assets/icons/LogoutIcon.png"
          alt="logout"
          width={40}
          height={40}
        />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
