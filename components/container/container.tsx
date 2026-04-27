"use client";

import { useMemo } from "react";
import useWindowWidth from "@/hooks/useWindowWidth";
import { getBreakpointLabel } from "./container.helper";
import styles from "./container.module.css";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  onBreakpointChange?: (width: number) => void;
};

const Container = ({
  children,
  className = "",
  onBreakpointChange,
}: ContainerProps) => {
  const windowWidth = useWindowWidth(onBreakpointChange);

  const responsiveMaxWidth = useMemo(() => {
    if (windowWidth === 0) return "sm";
    return getBreakpointLabel(windowWidth);
  }, [windowWidth]);

  const containerClass = [
    styles.container,
    styles[`container-${responsiveMaxWidth}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={containerClass}>{children}</div>;
};

export default Container;
