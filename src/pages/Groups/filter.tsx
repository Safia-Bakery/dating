import { useEffect } from "react";
import BaseInputs from "@/components/BaseInputs";
import MainInput from "@/components/BaseInputs/MainInput";
import { useNavigateParams } from "custom/useCustomNavigate";
import useQueryString from "custom/useQueryString";

import { useForm } from "react-hook-form";

const GroupsFilter = () => {
  const navigate = useNavigateParams();
  const name = useQueryString("name");
  const { reset, register, getValues } = useForm();

  const handleSubmit = () => navigate({ name: getValues("name") });

  useEffect(() => {
    reset({
      name,
    });
  }, []);

  return (
    <>
      <td></td>
      <td className="p-0">
        <BaseInputs className="!m-1">
          <MainInput
            className="!mb-0"
            register={register("name")}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </BaseInputs>
      </td>
      <td className="p-0">
        <BaseInputs className="!m-1">
          <MainInput className="!mb-0" disabled />
        </BaseInputs>
      </td>
      <td className="p-0">
        <BaseInputs className="!m-1">
          <MainInput className="!mb-0" disabled />
        </BaseInputs>
      </td>
      <td className="p-0">
        <BaseInputs className="!m-1">
          <MainInput className="!mb-0" disabled />
        </BaseInputs>
      </td>
      <td className="p-0">
        <BaseInputs className="!m-1">
          <MainInput className="!mb-0" disabled />
        </BaseInputs>
      </td>
      <td></td>
    </>
  );
};

export default GroupsFilter;
