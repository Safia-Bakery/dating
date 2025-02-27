import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Card from "@/components/Card";
import { errorToast, successToast } from "@/utils/toast";
import BaseInput from "@/components/BaseInputs";
import MainInput from "@/components/BaseInputs/MainInput";
import MainCheckBox from "@/components/BaseInputs/MainCheckBox";
import { useTranslation } from "react-i18next";
import Header from "@/components/AdminHeader";
import Button from "@/components/Button";
import TableHead from "@/components/TableHead";
import {
  factoryCategoryMutation,
  factoryProductMutation,
  getFactoryCategories,
  getFactoryCategory,
  getFactoryCategoryProd,
  getFactoryProduct,
} from "@/hooks/categoriesFactory";
import Loading from "@/components/Loader";
import EmptyList from "@/components/EmptyList";
import TableViewBtn from "@/components/TableViewBtn";
import useQueryString from "@/hooks/custom/useQueryString";
import { handleIdx } from "@/utils/helpers";
import Modal from "@/components/Modal";
import { useNavigateParams } from "@/hooks/custom/useCustomNavigate";

const column = [
  { name: "№", key: "" },
  { name: "name_in_table", key: "name" },
  { name: "date_expire", key: "date_expire" },
  { name: "is_returnable", key: "is_returnable" },
  { name: "", key: "" },
];

const EditAddCategoryFactory = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const name = useQueryString("name");
  const navigateParams = useNavigateParams();
  const [modal, $modal] = useState(false);
  const [selectedProd, $selectedProd] = useState<string>();

  const closeModal = () => {
    reset({});
    $modal((prev) => !prev);
  };

  const openEditProdModal = (id: string) => {
    $modal(true);
    $selectedProd(id);
  };

  const goBack = () => navigate(-1);

  const {
    data: category,
    isLoading,
    refetch,
  } = getFactoryCategory({ id: Number(id), enabled: !!id });

  const {
    data: categoryProd,
    isLoading: prodLoading,
    refetch: prodRefetch,
  } = getFactoryProduct({ id: selectedProd!, enabled: !!selectedProd });

  const { refetch: categoryRefetch } = getFactoryCategories({
    enabled: false,
  });
  const { mutate, isPending } = factoryCategoryMutation();
  const { mutate: categoryProdMutation, isPending: prodPending } =
    factoryProductMutation();

  const {
    data: products,
    isLoading: prodsLoading,
    refetch: prodsRefetch,
  } = getFactoryCategoryProd({
    category_id: Number(id),
    enabled: !!id,
    ...(name && { name }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const prodSubmit = () => {
    const { name, validity, is_returnable } = getValues();
    categoryProdMutation(
      {
        name: name,
        validity: Number(validity),
        is_returnable: Number(is_returnable),
        category_id: Number(id),
        ...(!!id && { id: selectedProd }),
      },
      {
        onSuccess: () => {
          prodsRefetch();
          successToast(!!selectedProd ? "updated" : "created");
          closeModal();
          if (selectedProd) prodRefetch();
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  const onSubmit = () => {
    const { name, status } = getValues();
    mutate(
      {
        name,
        status: !id ? 1 : +!!status,
        ...(!!id && { id: Number(id) }),
      },
      {
        onSuccess: () => {
          categoryRefetch();
          successToast(!!id ? "updated" : "created");
          goBack();
          if (id) refetch();
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (category) {
      reset({
        name: category?.name,
        status: !!category.status,
        prod_name: name,
      });
    }
  }, [category]);

  useEffect(() => {
    if (categoryProd && !!selectedProd) {
      reset({
        name: categoryProd?.name,
        is_returnable: categoryProd.is_returnable,
        validity: categoryProd.validity,
      });
    }
  }, [categoryProd, selectedProd]);

  if (((isLoading || prodsLoading) && !!id) || (prodLoading && selectedProd))
    return <Loading />;

  return (
    <>
      <Card className="overflow-hidden pb-3">
        <Header title={!id ? "add_category" : "edit_category"}>
          <Button className="btn-primary" onClick={goBack}>
            {t("back")}
          </Button>
        </Header>
        <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
          <BaseInput label="name_in_table" error={errors.name}>
            <MainInput register={register("name")} />
          </BaseInput>

          {!!id && (
            <MainCheckBox label={"active"} register={register("status")} />
          )}

          <Button type="submit" className="mt-4 float-end btn-primary">
            {t("save")}
          </Button>
        </form>
      </Card>

      {/* =========================================================================== */}
      {!!id && (
        <Card>
          <Header title={"products"}>
            <div className="flex gap-2">
              <Button className="btn btn-success btn-fill" onClick={closeModal}>
                {t("add")}
              </Button>
            </div>
          </Header>

          <div className="p-4">
            <div className="table-responsive grid-view">
              <table className="table table-hover">
                <TableHead column={column} data={products} />

                <tbody>
                  <tr>
                    <td></td>
                    <td>
                      <MainInput
                        register={register("prod_name")}
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          navigateParams({ name: getValues("prod_name") })
                        }
                      />
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  {!!products?.length &&
                    products?.map((product, idx) => (
                      <tr key={idx} className="bg-blue">
                        <td width="40">{handleIdx(idx)}</td>
                        <td>{product?.name}</td>
                        <td>{product?.validity}</td>
                        <td>{product?.is_returnable ? t("yes") : t("no")}</td>
                        <td width={40}>
                          <TableViewBtn
                            onClick={() => openEditProdModal(product.id)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {(isLoading || isPending) && <Loading />}
              {!products?.length && !isLoading && <EmptyList />}
            </div>
            <Modal isOpen={modal} onClose={closeModal} className="min-w-96">
              <Header
                title={!selectedProd ? t("add") : t("edit_product")}
                className="p-3"
              >
                <button onClick={closeModal} className="close" type="button">
                  <span aria-hidden="true">&times;</span>
                </button>
              </Header>
              <form onSubmit={handleSubmit(prodSubmit)} className="p-4">
                <BaseInput label="name_in_table" error={errors.name}>
                  <MainInput register={register("name")} />
                </BaseInput>

                <BaseInput label="validity">
                  <MainInput type="number" register={register("validity")} />
                </BaseInput>

                <MainCheckBox
                  label={"is_returnable"}
                  register={register("is_returnable")}
                />
                <Button className="btn btn-success w-full mt-4">
                  {!selectedProd ? t("add") : t("edit_product")}
                </Button>
              </form>
            </Modal>
          </div>
        </Card>
      )}
    </>
  );
};

export default EditAddCategoryFactory;
