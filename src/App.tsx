import { lazy, useEffect } from "react";
import i18n from "./localization";
import { useAppDispatch, useAppSelector } from "./store/rootConfig";
import { langSelector } from "@/store/reducers/selects";
import { Route, Routes, useNavigate } from "react-router-dom";
import Suspend from "./components/Suspend";
import { logoutHandler, tokenSelector } from "./store/reducers/auth";
import useToken from "@/hooks/useToken";
import Loading from "./components/Loader";
import "dayjs/locale/ru";
import "react-datepicker/dist/react-datepicker.css";

const Login = lazy(() => import("@/pages/Login"));
const AdminRoutes = lazy(() => import("@/components/AdminRoutes"));
const EditAddProducts = lazy(() => import("@/pages/EditAddProducts"));
const Products = lazy(() => import("@/pages/Products"));
const Groups = lazy(() => import("@/pages/Groups"));
const Templates = lazy(() => import("@/pages/Templates"));
const Categories = lazy(() => import("@/pages/Categories"));
const Users = lazy(() => import("@/pages/Users"));
const EditUser = lazy(() => import("@/pages/EditUser"));
const EditAddCategory = lazy(() => import("@/pages/EditAddCategory"));
const CategoriesFactory = lazy(() => import("@/pages/CategoriesFactory"));
const EditAddCategoryFactory = lazy(
  () => import("@/pages/EditAddCategoryFactory")
);

const App = () => {
  const lang = useAppSelector(langSelector);
  const token = useAppSelector(tokenSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error, isLoading } = useToken({});

  useEffect(() => {
    if (!token) navigate("/login");
    if (!!error) dispatch(logoutHandler());
  }, [token, error]);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  if (isLoading) return <Loading />;

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
            <AdminRoutes />
          </Suspend>
        }
        path={"/"}
      >
        <Route
          path={"*"}
          element={
            <Suspend>
              <Products />
            </Suspend>
          }
        />
        <Route
          path={"products"}
          element={
            <Suspend>
              <Products />
            </Suspend>
          }
        />
        <Route
          path={"users"}
          element={
            <Suspend>
              <Users />
            </Suspend>
          }
        />
        <Route
          path={"users/:id"}
          element={
            <Suspend>
              <EditUser />
            </Suspend>
          }
        />
        <Route
          path={"templates"}
          element={
            <Suspend>
              <Templates />
            </Suspend>
          }
        />
        <Route
          path={"groups"}
          element={
            <Suspend>
              <Groups />
            </Suspend>
          }
        />
        <Route
          path={"categories"}
          element={
            <Suspend>
              <Categories />
            </Suspend>
          }
        />
        <Route
          path={"categories/:id"}
          element={
            <Suspend>
              <EditAddCategory />
            </Suspend>
          }
        />
        <Route
          path={"categories/add"}
          element={
            <Suspend>
              <EditAddCategory />
            </Suspend>
          }
        />
        <Route
          path={"groups/:id"}
          element={
            <Suspend>
              <Products />
            </Suspend>
          }
        />
        <Route
          path={"products/:id"}
          element={
            <Suspend>
              <EditAddProducts />
            </Suspend>
          }
        />

        <Route
          path={"category_factory"}
          element={
            <Suspend>
              <CategoriesFactory />
            </Suspend>
          }
        />
        <Route
          path={"category_factory/:id"}
          element={
            <Suspend>
              <EditAddCategoryFactory />
            </Suspend>
          }
        />
        <Route
          path={"category_factory/add"}
          element={
            <Suspend>
              <EditAddCategoryFactory />
            </Suspend>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
