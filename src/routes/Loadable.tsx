/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ReactNode, Suspense } from "react";

const Loadable = (Component: React.ComponentType<ReactNode>) => {
  const WrappedComponent = (props: any) => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    );
  };

  WrappedComponent.displayName = `Loadable(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default Loadable;
