// import { is } from "date-fns/locale";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSetting } from "./useSetting";
import Spinner from "../../ui/Spinner";
import { useUpdateCabin } from "./useUpdateCabin";

function UpdateSettingsForm() {
  const {
    isPending,
    setting: {
      minbookinglength,
      maxbookinglength,
      maxguestsperbooking,
      breakfastprice,
    } = {},
  } = useSetting();

  const { isUpdating, updateSetting } = useUpdateCabin();

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ field, value });
  }

  if (isPending) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minbookinglength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minbookinglength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxbookinglength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxbookinglength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxguestsperbooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxguestsperbooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastprice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastprice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
