export async function getCabins() {
  const res = await fetch(`http://127.0.0.1:3000/api/v1/cabin/get-cabin`);

  const { data } = await res.json();

  if (!data) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabins(id) {
  const res = await fetch(`http://127.0.0.1:3000/api/v1/cabin/${id}`, {
    method: "DELETE",
  });

  const { message } = await res.json();

  if (message !== "deleted") {
    throw new Error("Cabins could not be Deleted");
  }

  return message;
}

export async function createCabin(newCabin) {
  const formData = new FormData();

  formData.append("name", newCabin.name);
  formData.append("maxCapacity", newCabin.maxcapacity);
  formData.append("regularPrice", newCabin.regularprice);
  formData.append("discount", newCabin.discount);
  formData.append("description", newCabin.description);
  formData.append("image", newCabin.image);

  const res = await fetch(`http://127.0.0.1:3000/api/v1/cabin`, {
    method: "POST",
    body: formData,
  });

  const { message } = await res.json();

  if (message !== "success") {
    throw new Error("Cabins could not be Add");
  }

  return message;
}

export async function editCabin(newCabin, id) {
  const formData = new FormData();

  formData.append("name", newCabin.name);
  formData.append("maxCapacity", newCabin.maxcapacity);
  formData.append("regularPrice", newCabin.regularprice);
  formData.append("discount", newCabin.discount);
  formData.append("description", newCabin.description);
  formData.append("image", newCabin.image);

  const res = await fetch(`http://127.0.0.1:3000/api/v1/cabin/${id}`, {
    method: "PUT",
    body: formData,
  });

  const { message } = await res.json();

  if (message !== "success") {
    throw new Error("Cabins could not be Add");
  }

  return message;
}

export async function createAllCabins(cabins) {
  const res = await fetch(`http://127.0.0.1:3000/api/v1/cabin/allCabins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cabins }),
  });

  const { message } = await res.json();

  if (message !== "success") {
    throw new Error("Cabins could not be added");
  }

  return message;
}
