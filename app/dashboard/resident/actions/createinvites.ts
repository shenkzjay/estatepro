import { formdataProp } from "../dashboard/dash-home";

export const CreateCodeInvites = async (formdata: formdataProp) => {
  const url = "https://www.example.com";

  try {
    const createInvites = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",

      body: JSON.stringify(formdata),
    });

    const response = createInvites.json();

    return response;
  } catch (error) {
    return `Error fetching invites :${error}`;
  }
};
