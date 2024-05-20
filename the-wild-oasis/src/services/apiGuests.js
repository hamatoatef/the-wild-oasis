export async function createAllGuests(guests) {
  const res = await fetch(`http://127.0.0.1:3000/api/v1/guest/create-guests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ guests }),
  });

  const { message } = await res.json();

  if (message !== "success") {
    throw new Error("guests could not be added");
  }

  return message;
}
