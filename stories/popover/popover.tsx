interface PopoverProps {
  children: React.ReactNode;
}

export const Popover = ({ children }: PopoverProps) => {
  return <div className="popover-wrapper">{children}</div>;
};
