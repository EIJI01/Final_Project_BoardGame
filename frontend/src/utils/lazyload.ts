import { lazy } from "react";

export const lazyLoadWithDelay = (modulePath: string, componentName: string, delay = 500) =>
  lazy(
    () =>
      new Promise<any>((resolve) =>
        setTimeout(
          () =>
            resolve(
              import(/* @vite-ignore */ modulePath).then((module) => ({
                default: module[componentName] as React.ComponentType<any>,
              }))
            ),
          delay
        )
      )
  );
