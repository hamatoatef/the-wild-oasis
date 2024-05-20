import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { Textarea } from "../../ui/Textarea";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModel }) {
  const { isCreating, createCabinMutate } = useCreateCabin();
  const { isEditing, editCabinMutate } = useEditCabin();
  const isPending = isEditing || isCreating;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {

    if (isEditSession) {
      const image = typeof data.image === "string" ? data.image : data.image[0];
      editCabinMutate(
        {
          newCainDate: { ...data, image: image },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModel?.();
          },
        }
      );
    } else {
      createCabinMutate(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onCloseModel?.();
          },
        }
      );
    }
  }

  function onError(data) {}

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModel ? "modal" : "regular"}
    >
      <FormRow label="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="maxcapacity" error={errors?.maxcapacity?.message}>
        <Input
          type="number"
          id="maxcapacity"
          disabled={isPending}
          {...register("maxcapacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="regularprice" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularprice"
          disabled={isPending}
          {...register("regularprice", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              value * 1 <= getValues().regularprice * 1 ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isPending}
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label="image">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModel?.()}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isEditSession ? "Edit cabin" : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
