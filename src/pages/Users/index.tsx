import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/Card";
import EmptyList from "@/components/EmptyList";
import Loading from "@/components/Loader";
import { useTranslation } from "react-i18next";
import AdminHeader from "@/components/AdminHeader";
import { UserRes } from "@/utils/types";
import TableViewBtn from "@/components/TableViewBtn";
import Button from "@/components/Button";
import { ColumnDef } from "@tanstack/react-table";
import VirtualTable from "@/components/VirtualTable";
import { useUsers } from "@/hooks/useUsers";

const Users = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const columns = useMemo<ColumnDef<UserRes>[]>(
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
        accessorKey: "full_name",
        header: t("name_in_table"),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "action",
        header: "",
        size: 10,
        cell: ({ row }) => (
          <TableViewBtn
            onClick={() =>
              row.original.id && navigate(`/users/${row.original.id}`)
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
  } = useUsers({});

  if (productLoading) return <Loading />;

  return (
    <Card>
      <AdminHeader title={t("users")} className="mb-2">
        <Button green onClick={goBack} className="btn btn-success btn-fill">
          {t("back")}
        </Button>
      </AdminHeader>

      <div className="w-full p-4">
        <VirtualTable columns={columns} data={data} className="mt-5" />
      </div>
      {!data && !productLoading && <EmptyList />}
      {(productFetching || productLoading) && <Loading />}
    </Card>
  );
};

export default Users;
