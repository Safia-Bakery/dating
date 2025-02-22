import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "@/components/Card";
import useCategories from "@/hooks/useCategories";
import { errorToast, successToast } from "@/utils/toast";
import BaseInput from "@/components/BaseInputs";
import { useTranslation } from "react-i18next";
import Header from "@/components/AdminHeader";
import Button from "@/components/Button";
import { userMutation, useUser } from "@/hooks/useUsers";
import Select, { MultiValue } from "react-select";
import Loading from "@/components/Loader";

interface SelectType {
  label: string;
  value: number;
}

const EditUser = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [categs, $categs] = useState<MultiValue<SelectType>>([]);

  const goBack = () => navigate(-1);

  const { data, isLoading, refetch } = useUser({ id: Number(id) });
  const { isLoading: categoryLoading, data: categories } = useCategories({});
  const { mutate } = userMutation();

  const onSubmit = () => {
    mutate(
      {
        user_id: Number(id),
        category_id: categs.map((item) => item.value),
      },
      {
        onSuccess: () => {
          successToast(!!id ? "updated" : "created");
          goBack();
          if (id) refetch();
        },
        onError: (e) => errorToast(e.message),
      }
    );
  };

  useEffect(() => {
    if (data?.categories?.length) {
      $categs(
        data?.categories?.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      );
    }
  }, [data]);

  if (isLoading || categoryLoading) return <Loading />;

  return (
    <Card className="pb-3 min-h-96">
      <Header title={`Изменить ${data?.full_name}`}>
        <Button className="btn-primary" onClick={goBack}>
          {t("back")}
        </Button>
      </Header>
      <div className="p-3">
        <BaseInput label="category">
          <Select
            isMulti
            name="colors"
            placeholder={t("select_category")}
            value={categs}
            options={categories?.items?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            onChange={(e) => $categs(e)}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </BaseInput>

        <Button onClick={onSubmit} className="mt-4 float-end btn-primary">
          {t("save")}
        </Button>
      </div>
    </Card>
  );
};

export default EditUser;
