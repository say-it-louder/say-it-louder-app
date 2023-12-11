import { IconType } from "react-icons";

export type SearchProp = {
  className?: string;
  refProp?: React.MutableRefObject<null>;
};

export type LinkBtnProp = {
  label: string;
  icon: IconType;
  href: string;
};
