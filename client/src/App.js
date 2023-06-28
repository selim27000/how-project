import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "./scenes/loginPage";
import { useState, createContext } from "react";
import { useMemo } from "react";
import { useSelector, Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const MenuContext = createContext();


function App() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const [snack, setSnack] = useState({
    open: false,
    message: null,
    severity: "success",
  });

  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
      <MenuContext.Provider value={{ showMenu, toggleMenu, snack, setSnack }}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </MenuContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
