export const GetInvites = async () => {
  const url = "";

  try {
    const getInviteCode = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    const inviteData = await getInviteCode.json();

    return inviteData;
  } catch (error) {
    return `Error getting all invites ${error}`;
  }
};
