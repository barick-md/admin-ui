import React, { useContext, useState } from "react";
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Icon from "../Elements/Icon";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from "../../context/darkModeContext";
import { logoutService } from "../../services/authService";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function MainLayout(props) {
  const { children } = props;
  const [loggingOut, setLoggingOut] = useState(false);

  const themes = [
    { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
    { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
    { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
    { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
    { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
  ];

  const { theme, setTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    { id: 3, name: "Transaction", icon: <Icon.Transaction />, link: "/transaction" },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expense" },
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutService();
      logout();
    } catch (err) {
      console.error(err);
      if (err.status === 401) logout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      {/* Soal 5: Backdrop saat logout */}
      <Backdrop open={loggingOut} sx={{ color: "#fff", zIndex: 9999, flexDirection: "column", gap: 1 }}>
        <CircularProgress color="inherit" />
        <span>Logging Out</span>
      </Backdrop>

      <div className={`flex min-h-screen ${theme.name}`}>
        <aside className={`bg-defaultBlack w-28 sm:w-64 text-special-bg2 flex flex-col justify-between px-7 py-12 "bg-gray-900" : "bg-defaultBlack"}`}>
          <div>
            {/* Logo */}
            <div className="mb-10">
              <Logo variant="secondary" />
            </div>

            {/* Menu */}
            <nav>
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex px-4 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 ${
                      isActive ? "bg-primary text-white font-bold" : "hover:bg-special-bg3"
                    }`
                  }
                >
                  <div className="mx-auto sm:mx-0">{item.icon}</div>
                  <div className="ms-3 hidden sm:block">{item.name}</div>
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            Themes
            <div className="flex flex-col sm:flex-row gap-2 items-center flex-wrap">
              {themes.map((t) => (
                <div
                  key={t.name}
                  className={`${t.bgcolor} w-6 h-6 rounded-md cursor-pointer mb-2`}
                  onClick={() => setTheme(t)}
                />
              ))}
              {/* Soal 6: Dark mode toggle */}
              <div
                className="w-6 h-6 rounded-full cursor-pointer mb-2 bg-gray-600 flex items-center justify-center"
                onClick={toggleDarkMode}
                title={darkMode ? "Light Mode" : "Dark Mode"}
                >
                {darkMode ? (
                    // Icon matahari (light mode)
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                ) : (
                    // Icon bulan (dark mode)
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                )}
                </div>
            </div>
          </div>

          <div>
            {/* Logout */}
            <div onClick={handleLogout} className="cursor-pointer">
              <div className="flex bg-special-bg3 text-white px-4 py-3 rounded-md">
                <div className="mx-auto sm:mx-0 [&_path]:!stroke-primary">
                  <Icon.Logout />
                </div>
                <div className="ms-3 hidden sm:block">Logout</div>
              </div>
            </div>

            <div className="border my-10 border-b-special-bg"></div>

            {/* Profile */}
            <div className="flex justify-between items-center">
              <div>Avatar</div>
              <div className="hidden sm:block">
                <div>{user?.name}</div>
                <div>View Profile</div>
              </div>
              <div className="hidden sm:block">
                <Icon.Detail size={15} />
              </div>
            </div>
          </div>
        </aside>

        <div className={`flex-1 flex flex-col ${darkMode ? "bg-dark-bg" : "bg-special-mainBg"}`}>
          {/* Header */}
          <header className={`border-b px-6 py-7 flex justify-between items-center
      ${darkMode ? "border-gray-700 bg-dark-bg text-white" : "border-gray-05"}`}>
            <div className="flex items-center">
              <div className="font-bold text-2xl me-6">{user?.name}</div>
              <div className="text-gray-03 flex">
                <Icon.ChevronRight size={20} />
                <span>May 19, 2023</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="me-10"><NotificationsIcon className="text-primary scale-110" /></div>
              <Input backgroundColor="bg-white" border="border-white" />
            </div>
          </header>

          {/* Main */}
          <main className="flex-1 px-6 py-4">{children}</main>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
