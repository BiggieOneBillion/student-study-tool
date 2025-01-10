import  { ReactNode } from "react";

const Conditions = ({
  children,
  condition,
}: {
  children: ReactNode;
  condition: boolean;
}) => {
  return condition ? children : null;
};

export default Conditions;
