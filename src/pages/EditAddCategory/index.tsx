import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Card from "@/components/Card";
import useCategories from "@/hooks/useCategories";
import { errorToast, successToast } from "@/utils/toast";
import BaseInput from "@/components/BaseInputs";
import MainInput from "@/components/BaseInputs/MainInput";
import MainCheckBox from "@/components/BaseInputs/MainCheckBox";
import { useTranslation } from "react-i18next";
import categoryMutation from "@/hooks/mutation/category";
import Header from "@/components/AdminHeader";
import Button from "@/components/Button";

const EditAddCategory = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const { data, isLoading, refetch } = useCategories({ id: Number(id) });
  const { refetch: categoryRefetch } = useCategories({
    enabled: false,
  });
  const category = data?.items?.[0];
  const { mutate } = categoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmit = () => {
    const { name, status } = getValues();
    mutate(
      {
        name,
        status: +!!status,
        id,
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
      });
    }
  }, [category, reset]);

  if (isLoading && !!id) return;

  return (
    <Card className="overflow-hidden pb-3">
      <Header title={!id ? "add_category" : "edit_category"}>
        <Button green onClick={goBack}>
          {t("back")}
        </Button>
      </Header>
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <BaseInput label="name_in_table" error={errors.name}>
          <MainInput
            register={register("name", { required: t("required_field") })}
          />
        </BaseInput>

        <MainCheckBox label={"active"} register={register("status")} />

        <Button green type="submit" className="mt-4 float-end">
          {t("save")}
        </Button>
      </form>
    </Card>
  );
};

export default EditAddCategory;
