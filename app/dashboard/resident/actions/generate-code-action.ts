"use server";

export const GenerateCodeFormAction = (formdata: FormData) => {
  const data = {
    visitorname: formdata.get("visitorname"),
    visitoremail: formdata.get("Email address"),
    Date_of_visit: formdata.get("Date of visitation"),
    phone_number: formdata.get("Phone number"),
  };

  console.log(data, "data");
};
