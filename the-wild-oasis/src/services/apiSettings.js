export async function getSetting() {
  const res = await fetch(`http://127.0.0.1:3000/api/v1/setting/get-setting`);

  const { data } = await res.json();

  if (!data) {
    throw new Error("setting could not be loaded");
  }

  return data;
}

export async function editSetting(field, value) {
  // console.log(newSetting);
  // console.log(newSetting.imgae);
  const data = { field: field, value: value };

  // formData.append("regularPrice", newCabin.regularprice);
  // formData.append("discount", newCabin.discount);
  // formData.append("description", newCabin.description);
  // formData.append("image", newCabin.image);

  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  // console.log(newSetting);

  const res = await fetch(`http://127.0.0.1:3000/api/v1/setting/update`, {
    method: "PATCH",
    body: JSON.stringify(data), // Convert object to JSON string
    headers: { "Content-Type": "application/json" },
  });

  const { message } = await res.json();

  if (message !== "success") {
    throw new Error("Setting could not be updated");
  }

  return message;
}

// import supabase from "./supabase";

// export async function getSettings() {
//   const { data, error } = await supabase.from("settings").select("*").single();

//   if (error) {
//     console.error(error);
//     throw new Error("Settings could not be loaded");
//   }
//   return data;
// }

// // We expect a newSetting object that looks like {setting: newValue}
// export async function updateSetting(newSetting) {
//   const { data, error } = await supabase
//     .from("settings")
//     .update(newSetting)
//     // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
//     .eq("id", 1)
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Settings could not be updated");
//   }
//   return data;
// }
