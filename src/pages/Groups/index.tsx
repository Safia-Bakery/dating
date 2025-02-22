import Card from "@/components/Card";
import Loading from "@/components/Loader";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useNavigateParams } from "@/hooks/custom/useCustomNavigate";
import useQueryString from "@/hooks/custom/useQueryString";
import EmptyList from "@/components/EmptyList";
import cl from "classnames";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import useProducts from "@/hooks/useProducts";
import AdminHeader from "@/components/AdminHeader";
import Button from "@/components/Button";
import { ColumnDef } from "@tanstack/react-table";
import { ProductType } from "@/utils/types";
import VirtualTable from "@/components/VirtualTable";
import TableViewBtn from "@/components/TableViewBtn";
import dayjs from "dayjs";
import { dateTimeFormat } from "@/utils/helpers";
import GroupsFilter from "./filter";

const InventoryRemains = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateParams = useNavigateParams();

  const parent_id = useQueryString("parent_id");
  const parent_name = useQueryString("parent_name");
  const name = useQueryString("name");

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
      },
      {
        accessorKey: "validity",
        header: t("date_expire"),
      },
      {
        accessorKey: "qr",
        header: t("value_for_qr"),
        cell: ({ row }) =>
          !!row.original.qr ? row.original.qr : t("not_given"),
      },
      {
        accessorKey: "updated_at",
        header: t("sync_date"),
        cell: ({ row }) =>
          row?.original?.updated_at
            ? dayjs(row?.original?.updated_at).format(dateTimeFormat)
            : t("not_given"),
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ row }) =>
          !!row.original.status ? t("active") : t("inactive"),
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
    data,
    isLoading: productLoading,
  } = useProducts({
    ...(!!parent_id && { parent_id }),
    ...(!!name && { name }),
  });

  const goBack = () => navigate(-1);

  const handleParentId = (id: string, name: string) => () =>
    navigateParams({ parent_id: id, parent_name: name });

  const renderItems = useMemo(() => {
    return (
      <VirtualTable columns={columns} data={data?.products} className="mt-5">
        <GroupsFilter />
      </VirtualTable>
    );
  }, [data?.products]);

  if (productFetching || productLoading) return <Loading />;

  return (
    <Card className="pb-4">
      <AdminHeader title={parent_name || t("products")} className="mb-2">
        <Button onClick={goBack} className="btn btn-primary btn-fill">
          {t("back")}
        </Button>
      </AdminHeader>

      <ul>
        {data?.groups?.map((folder) => (
          <li
            className={cl(styles.folder, "bg-gray-300")}
            onClick={handleParentId(folder.id, folder.name)}
            key={folder.id}
          >
            <img src="/icons/folder.svg" alt="folder" />
            <span>{folder.name}</span>
          </li>
        ))}
        <hr />
        {renderItems}
      </ul>

      {!data?.products?.length && <EmptyList />}
      {(productLoading || productFetching) && <Loading />}
    </Card>
  );
};

export default InventoryRemains;
