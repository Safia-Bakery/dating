import { lazy, useEffect } from "react";
import i18n from "./localization";
import { useAppSelector } from "./store/rootConfig";
import { langSelector } from "reducers/language";
import { Route, Routes } from "react-router-dom";
import Suspend from "./components/Suspend";
import WebUsers from "@/components/WebUsers";

const Login = lazy(() => import("@/pages/Login"));
const Items = lazy(() => import("@/pages/Items"));
const PrintPreview = lazy(() => import("@/pages/PrintPreview"));

const App = () => {
  const lang = useAppSelector(langSelector);

  // useEffect(() => {
  //   if (!token) navigate("/login");
  //   if (!!error) dispatch(logoutHandler());
  // }, [token, error]);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <Routes>
      <Route
        element={
          <Suspend>
            <Login />
          </Suspend>
        }
        path={"/login"}
      />
      <Route element={<WebUsers />} path={"/users"}>
        <Route
          path={"items"}
          element={
            <Suspend>
              <Items />
            </Suspend>
          }
        />
        <Route
          path={"items/:id"}
          element={
            <Suspend>
              <Items />
            </Suspend>
          }
        />
        <Route
          path={"items/:id/:checkid"}
          element={
            <Suspend>
              <PrintPreview />
            </Suspend>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
