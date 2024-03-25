import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Card from "@/components/Card";
import { errorToast, successToast } from "@/utils/toast";
import BaseInputs from "@/components/BaseInputs";
import MainInput from "@/components/BaseInputs/MainInput";
import MainCheckBox from "@/components/BaseInputs/MainCheckBox";
import MainTextArea from "@/components/BaseInputs/MainTextArea";
import Header from "@/components/AdminHeader";
import groupsMutation from "@/hooks/mutation/groups";
import useQueryString from "@/hooks/custom/useQueryString";
import Button from "@/components/Button";
import productMutation from "@/hooks/mutation/product";
import MainSelect from "@/components/BaseInputs/MainSelect";
import useCategories from "@/hooks/useCategories";

const EditAddProducts = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const data = useQueryString("data");
  const product = !!data && JSON.parse(data);

  const { data: categories } = useCategories({});

  const { mutate } = productMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmit = () => {
    const { status, validity, description, qr, category } = getValues();
    mutate(
      {
        status: +status,
        validity: +validity,
        description,
        id: id!,
        qr,
        category_id: category,
      },
      {
        onSuccess: () => {
          successToast("success");
          goBack();
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (data) {
      reset({
        description: product.description,
        status: !!product.status,
        validity: product.validity,
        qr: product.qr,
        category: product.category_id,
      });
    }
  }, [id, data]);

  return (
    <Card>
      <Header title={`${t("edit")} ${product.name}`}>
        <Button green className="btn btn-success btn-fill" onClick={goBack}>
          {t("back")}
        </Button>
      </Header>

      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <BaseInputs label="validity" error={errors.validity}>
          <MainInput
            type="number"
            register={register("validity", { required: t("required_field") })}
          />
        </BaseInputs>
        <BaseInputs label="value_for_qr">
          <MainInput register={register("qr")} />
        </BaseInputs>
        <BaseInputs label="description">
          <MainTextArea register={register("description")} />
        </BaseInputs>

        <BaseInputs label="category">
          <MainSelect
            register={register("category")}
            values={categories?.items}
          />
        </BaseInputs>

        <BaseInputs label="status">
          <MainCheckBox label={"active"} register={register("status")} />
        </BaseInputs>

        <Button green type="submit" className="mt-3">
          {t("save")}
        </Button>
      </form>
    </Card>
  );
};

export default EditAddProducts;
