import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface EventListHeaderButtonProps {
  label: string;
  onClick: () => void;
  icon: any;
  buttonID?: string;
}

const EventListHeaderButton: React.FC<EventListHeaderButtonProps> = ({
  label,
  onClick,
  icon,
  buttonID,
}) => {
  return (
    <button
      className="flex items-center gap-1 group transition"
      id={buttonID}
      onClick={onClick}
    >
      <p className="text-sm text-gray-600 group-hover:text-black">{label}</p>
      <FontAwesomeIcon
        icon={icon}
        className="text-[1.2vh] text-gray-600 group-hover:text-black"
      />
    </button>
  );
};

export default EventListHeaderButton;
