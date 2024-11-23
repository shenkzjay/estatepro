interface fillType {
  color: string;
}

export const LinkArrow = () => {
  return (
    <div className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="currentColor"
      >
        <path
          d="M1 13.75L13.5 1.25M13.5 1.25L4.125 1.25M13.5 1.25V10.625"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
