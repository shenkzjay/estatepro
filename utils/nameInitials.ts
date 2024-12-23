export const nameInitials = (name: string) => {
  let result = "";

  const words = name.split(" ");

  for (let i = 0; i < words.length; i++) {
    result += words[i].charAt(0);
  }

  return result;
};
