import  { ReactNode } from "react";

const TeneryConditions = ({
  ifTrue,
  ifFalse,
  condition,
}: {
  condition: boolean;
  ifTrue: ReactNode;
  ifFalse: ReactNode;
}) => {
  return condition ? ifTrue : ifFalse;
};

export default TeneryConditions;
