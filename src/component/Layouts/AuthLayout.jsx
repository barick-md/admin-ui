import React, { useContext } from 'react';
import Logo from '../Elements/Logo';
import { ThemeContext } from "../../context/themeContext";
import { DarkModeContext } from "../../context/darkModeContext";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


function AuthLayout(props) {
  const { children } = props;
  const { theme } = useContext(ThemeContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <main
        className={`min-h-screen flex justify-center items-center ${theme.name} ${
          darkMode ? "bg-gray-900 text-white" : "bg-special-mainBg"
        }`}
      >
        {/* container start */}
        <div className="w-full max-w-sm ">
          <Logo />
          {children}

            <div
                className="w-6 h-6 rounded-full cursor-pointer mb-2 bg-gray-600 flex items-center justify-center "
                onClick={toggleDarkMode}
                title={darkMode ? "Light Mode" : "Dark Mode"}
                >
                {darkMode ? (
                    // Icon matahari (light mode)
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                )}
            </div>
        </div>
        {/* container end */}
      </main>
    </>
  );
}

export default AuthLayout;
