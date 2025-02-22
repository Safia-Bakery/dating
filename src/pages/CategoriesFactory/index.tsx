import { useLocation, useNavigate } from "react-router-dom";
import Card from "@/components/Card";
import { handleIdx } from "@/utils/helpers";
import TableViewBtn from "@/components/TableViewBtn";
import useQueryString from "custom/useQueryString";

import EmptyList from "@/components/EmptyList";
import Loading from "@/components/Loader";
import { useTranslation } from "react-i18next";
import Header from "@/components/AdminHeader";
import Button from "@/components/Button";
import { getFactoryCategories } from "@/hooks/categoriesFactory";
import TableHead from "@/components/TableHead";

const column = [
  { name: "№", key: "" },
  { name: "name_in_table", key: "name" },
  { name: "status", key: "status" },
  { name: "", key: "" },
];

const CategoriesFactory = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();
  const page = Number(useQueryString("page")) || 1;
  const { data: categories, isLoading } = getFactoryCategories({});
  const handleNavigate = (route: string) => navigate(route);

  return (
    <Card>
      <Header title={"categories"}>
        <div className="flex gap-2">
          <Button
            className="btn btn-fill btn-primary"
            onClick={() => handleNavigate(`add${search}`)}
          >
            {t("add")}
          </Button>
          <Button
            onClick={() => navigate(-1)}
            className="btn btn-primary btn-fill"
          >
            {t("back")}
          </Button>
        </div>
      </Header>

      <div className="p-4">
        <div className="table-responsive grid-view">
          <table className="table table-hover">
            <TableHead column={column} data={categories} />

            <tbody>
              {!!categories?.length &&
                categories?.map((category, idx) => (
                  <tr key={idx} className="bg-blue">
                    <td width="40">{handleIdx(idx)}</td>
                    <td>{category?.name}</td>
                    <td>{category?.status ? t("active") : t("inactive")}</td>
                    <td width={40}>
                      <TableViewBtn
                        onClick={() => handleNavigate(category.id.toString())}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isLoading && <Loading />}

          {!categories?.length && !isLoading && <EmptyList />}
        </div>
      </div>
    </Card>
  );
};

export default CategoriesFactory;
