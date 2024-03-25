import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { handleIdx } from "@/utils/helpers";
import TableHead from "@/components/TableHead";
import TableViewBtn from "@/components/TableViewBtn";
import useCategories from "@/hooks/useCategories";
import ItemsCount from "@/components/ItemsCount";
import useQueryString from "custom/useQueryString";

import EmptyList from "@/components/EmptyList";
import Loading from "@/components/Loader";
import { useTranslation } from "react-i18next";
import { CategoryType } from "@/utils/types";
import Header from "@/components/AdminHeader";
import Button from "@/components/Button";

const column = [
  { name: "№", key: "" },
  { name: "name_in_table", key: "name" },
  { name: "status", key: "status" },
  { name: "", key: "" },
];

const Categories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sort, $sort] = useState<CategoryType[]>();
  const { search } = useLocation();
  const page = Number(useQueryString("page")) || 1;
  const { data: categories, isLoading } = useCategories({
    page,
  });
  const handleNavigate = (route: string) => navigate(route);

  return (
    <Card>
      <Header title={"categories"}>
        <div className="flex gap-2">
          <Button
            green
            className="btn btn-success btn-fill"
            onClick={() => handleNavigate(`add${search}`)}
          >
            {t("add")}
          </Button>
          <Button
            green
            onClick={() => navigate(-1)}
            className="btn btn-primary btn-fill"
          >
            {t("back")}
          </Button>
        </div>
      </Header>

      <div className="p-4">
        <div className="table-responsive grid-view">
          <ItemsCount data={categories} />
          <table className="table table-hover">
            <TableHead
              column={column}
              onSort={(data) => $sort(data)}
              data={categories?.items}
            />

            <tbody>
              {!!categories?.items?.length &&
                (sort?.length ? sort : categories?.items)?.map(
                  (category, idx) => (
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
                  )
                )}
            </tbody>
          </table>
          {isLoading && <Loading />}

          {!categories?.items?.length && !isLoading && <EmptyList />}
          {!!categories && <Pagination totalPages={categories.pages} />}
        </div>
      </div>
    </Card>
  );
};

export default Categories;
