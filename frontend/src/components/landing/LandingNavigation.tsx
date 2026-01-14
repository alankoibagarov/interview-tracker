import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useConfirm } from "../ConfirmModal";
import DesktopLandingNavigation from "./DesktopLandingNavigation";
import MobileLandingNavigation from "./MobileLandingNavigation";

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const { confirm } = useConfirm();

  const logout = async () => {
    const confirmed = await confirm({
      title: "Confirm Logout",
      message: "Are you sure you want to logout?",
      confirmText: "Logout",
      cancelText: "Cancel",
      variant: "warning",
    });

    if (!confirmed) return;

    localStorage.removeItem("access_token");
    setUser(null);
    if (location.pathname !== "/") {
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <DesktopLandingNavigation scrolled={scrolled} user={user} logout={logout} />
      <MobileLandingNavigation scrolled={scrolled} user={user} logout={logout} />
    </>
  );
};

export default Navigation;
