interface fillType {
  color: string;
}

export const ArrowIcon = ({ color }: fillType) => {
  return (
    <div className={`text-[${color}]`}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.4026 11.1422C14.0066 10.5004 14.0066 9.4994 13.4026 8.85765L7.27348 2.34545C6.95805 2.01031 6.43066 1.99432 6.09551 2.30975C5.76037 2.62518 5.74438 3.15258 6.05982 3.48773L12.1889 9.99992L6.05982 16.5121C5.74439 16.8473 5.76037 17.3747 6.09551 17.6901C6.43066 18.0055 6.95805 17.9895 7.27348 17.6544L13.4026 11.1422Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
