import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useCheckin";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState();
  const [addBreakfast, setAddBreakfast] = useState();

  const { booking, isPending } = useBooking();
  const { setting } = useSetting();
  const moveBack = useMoveBack();

  useEffect(() => setConfirmPaid(booking?.ispaid ?? false), [booking]);

  const { checkin, isCheckingIn } = useChecking();

  if (isPending) return <Spinner />;

  const {
    id: bookingId,
    fullname,
    totalprice,
    numguests,
    hasbreakfast,
    numnights,
  } = booking;

  const optionalBreakfastPrice = setting.breakfastprice * numnights * numguests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasbreakfast: true,
          extrasprice: optionalBreakfastPrice,
          totalprice: optionalBreakfastPrice + totalprice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasbreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            {" "}
            Want to add breakfast for {optionalBreakfastPrice}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          disabled={confirmPaid}
          checked={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
        >
          i confirm that {fullname} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalprice)
            : `${formatCurrency(
                totalprice + optionalBreakfastPrice
              )} (${formatCurrency(totalprice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
