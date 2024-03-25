import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import Card from "@/components/Card";
import EmptyList from "@/components/EmptyList";
import Loading from "@/components/Loader";
import { useTranslation } from "react-i18next";
import { dateTimeFormat } from "@/utils/helpers";
import AdminHeader from "@/components/AdminHeader";
import useProducts from "@/hooks/useProducts";
import { ProductType } from "@/utils/types";
import TableViewBtn from "@/components/TableViewBtn";
import Button from "@/components/Button";
import { ColumnDef } from "@tanstack/react-table";
import VirtualTable from "@/components/VirtualTable";

const Products = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const columns = useMemo<ColumnDef<ProductType>[]>(
    () => [
      {
        accessorFn: (_, idx) => idx + 1,
        cell(props) {
          return <div className="w-4">{props.row.index + 1}</div>;
        },
        header: "№",
        size: 10,
      },
      {
        accessorKey: "name",
        header: t("name_in_table"),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "validity",
        header: t("date_expire"),
      },
      {
        accessorKey: "updated_at",
        header: t("sync_date"),
        cell: ({ row }) =>
          row?.original?.updated_at
            ? dayjs(row?.original?.updated_at).format(dateTimeFormat)
            : t("not_given"),
        // size: 80,
      },
      {
        accessorKey: "action",
        header: "",
        size: 10,
        cell: ({ row }) => (
          <TableViewBtn
            onClick={() =>
              row.original.id &&
              navigate(
                `/products/${row.original.id}?data=${JSON.stringify(
                  row.original
                )}`
              )
            }
          />
        ),
      },
    ],
    []
  );

  const {
    isFetching: productFetching,
    data: prods,
    isLoading: productLoading,
  } = useProducts({ ...(!!id && { parent_id: id }) });

  if (productLoading) return <Loading />;

  return (
    <Card>
      <AdminHeader title={t("products")} className="mb-2">
        <Button green onClick={goBack} className="btn btn-success btn-fill">
          {t("back")}
        </Button>
      </AdminHeader>

      <div className="w-full p-4">
        <VirtualTable
          columns={columns}
          data={prods?.products}
          className="mt-5"
        />
      </div>
      {!prods && !productLoading && <EmptyList />}
      {(productFetching || productLoading) && <Loading />}
    </Card>
  );
};

export default Products;
