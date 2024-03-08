import { lazy, useEffect } from "react";
import i18n from "./localization";
import { useAppSelector } from "./store/rootConfig";
import { langSelector } from "@/store/reducers/selects";
import { Route, Routes, useNavigate } from "react-router-dom";
import Suspend from "./components/Suspend";
import Dishes from "./admin-pages/Dishes";

const Login = lazy(() => import("@/user-pages/Login"));
const UserRoutes = lazy(() => import("@/components/UserRoutes"));
const AdminRoutes = lazy(() => import("@/components/AdminRoutes"));
const Items = lazy(() => import("@/user-pages/Items"));
const PrintPreview = lazy(() => import("@/user-pages/PrintPreview"));

const App = () => {
  const lang = useAppSelector(langSelector);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) navigate("/login");
  //   if (!!error) dispatch(logoutHandler());
  // }, [token, error]);

  useEffect(() => {
    navigate("/users/items");
  }, []);

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
      <Route
        element={
          <Suspend>
            <UserRoutes />
          </Suspend>
        }
        path={"/users"}
      >
        <Route
          path={"items"}
          element={
            <Suspend>
              <Items />
            </Suspend>
          }
        >
          <Route
            path={":id"}
            element={
              <Suspend>
                <Items />
              </Suspend>
            }
          />
        </Route>
        <Route
          path={"items/:id/:checkid"}
          element={
            <Suspend>
              <PrintPreview />
            </Suspend>
          }
        />
      </Route>

      <Route
        element={
          <Suspend>
            <AdminRoutes />
          </Suspend>
        }
        path={"/admin"}
      >
        <Route
          path={"dishes"}
          element={
            <Suspend>
              <Dishes />
            </Suspend>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
