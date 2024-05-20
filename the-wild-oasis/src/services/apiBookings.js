// import { getToday } from "../utils/helpers";
// import supabase from "./supabase";

export async function getAllBooking(filter, sort) {
  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/booking/all-booking?${filter}&${sort}`
  );

  const { data } = await res.json();

  if (!data) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createBooking(bookings) {
  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/booking/create-booking`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookings }),
    }
  );

  const { token } = await res.json();

  if (!token) {
    throw new Error("error in login");
  }

  return token;
}

export async function getBooking(id) {
  const res = await fetch(`http://127.0.0.1:3000/api/v1/booking/booking/${id}`);

  const { data } = await res.json();

  if (!data) {
    throw new Error("guests could not be added");
  }

  return data;
}

export async function updateBooking(obj) {
  const res = await fetch(`http://127.0.0.1:3000/api/v1/booking/checkin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  const { message } = await res.json();

  if (message !== "success") {
    throw new Error("guests could not be added");
  }

  return message;
}

export async function deleteBooking(id) {
  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/booking/booking/${id}`,
    {
      method: "DELETE",
    }
  );

  const { message } = await res.json();

  if (message !== "deleted") {
    throw new Error("Booking could not be Deleted");
  }

  return message;
}

export async function getBookingsAfterDate(days) {
  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/booking/bookingAfterDate/${days}`
  );

  const { data } = await res.json();

  if (!data) {
    throw new Error("Error in fetch Booking after Date");
  }

  return data;
}

export async function getStaysAfterDate(days) {
  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/booking/staysAfterDate/${days}`
  );

  const { data } = await res.json();

  if (!data) {
    throw new Error("Error in fetch stays after Date");
  }

  return data;
}

export async function getStaysTodayActivity() {
  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/booking/today-activity`
  );

  const { data } = await res.json();

  if (!data) {
    throw new Error("Error in fetch stays after Date");
  }

  return data;
}

// export async function getBooking(id) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("*, cabins(*), guests(*)")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking not found");
//   }

//   return data;
// }

// // Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// export async function getBookingsAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("created_at, totalPrice, extrasPrice")
//     .gte("created_at", date)
//     .lte("created_at", getToday({ end: true }));

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

// // Returns all STAYS that are were created after the given date
// export async function getStaysAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     // .select('*')
//     .select("*, guests(fullName)")
//     .gte("startDate", date)
//     .lte("startDate", getToday());

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

// // Activity means that there is a check in or a check out today
// export async function getStaysTodayActivity() {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("*, guests(fullName, nationality, countryFlag)")
//     .or(
//       `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
//     )
//     .order("created_at");

//   // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
//   // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
//   // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }
//   return data;
// }

// export async function updateBooking(id, obj) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .update(obj)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be updated");
//   }
//   return data;
// }

// export async function deleteBooking(id) {
//   // REMEMBER RLS POLICIES
//   const { data, error } = await supabase.from("bookings").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be deleted");
//   }
//   return data;
// }
