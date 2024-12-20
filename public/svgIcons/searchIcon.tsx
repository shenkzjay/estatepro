interface SearchIconProps {
  IconColor: string;
}

export const SearchBoxIcon = ({ IconColor }: SearchIconProps) => {
  return (
    <div style={{ color: IconColor }}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.58342 1.66663C5.21116 1.66663 1.66675 5.21104 1.66675 9.58329C1.66675 13.9555 5.21116 17.5 9.58342 17.5C11.4694 17.5 13.2013 16.8405 14.5612 15.7396L16.9108 18.0892C17.2363 18.4147 17.7639 18.4147 18.0893 18.0892C18.4148 17.7638 18.4148 17.2361 18.0893 16.9107L15.7397 14.5611C16.8406 13.2012 17.5001 11.4692 17.5001 9.58329C17.5001 5.21104 13.9557 1.66663 9.58342 1.66663ZM3.33341 9.58329C3.33341 6.13151 6.13164 3.33329 9.58342 3.33329C13.0352 3.33329 15.8334 6.13151 15.8334 9.58329C15.8334 13.0351 13.0352 15.8333 9.58342 15.8333C6.13164 15.8333 3.33341 13.0351 3.33341 9.58329Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
