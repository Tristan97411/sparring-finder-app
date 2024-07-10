import React, { PropsWithChildren } from "react";
import { AuthContextProvider } from "../auth.ctx";

const RootProvider: React.FC<PropsWithChildren> = (props) => {
  return <AuthContextProvider>{props.children}</AuthContextProvider>;
};

export default RootProvider;
