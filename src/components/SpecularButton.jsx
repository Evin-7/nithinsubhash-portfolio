"use client";

import { useRef } from "react";

const variantDefaults = {
  primary: {
    baseColor: "#cdf97d",
    textColor: "#101207",
    lineColor: "#efffcf",
  },
  secondary: {
    baseColor: "#171916",
    textColor: "#f2f2f2",
    lineColor: "rgba(205, 249, 125, 0.62)",
  },
};

export default function SpecularButton({
  children,
  href,
  variant = "secondary",
  size = "md",
  radius = 0,
  tint = "#ffffff",
  tintOpacity = 0.08,
  textColor,
  lineColor,
  baseColor,
  intensity = 1,
  idleIntensity = 0.3,
  shineSize = 10,
  shineFade = 38,
  thickness = 1,
  glow = 0.7,
  followMouse = true,
  proximity = 250,
  className = "",
  style,
  type = "button",
  disabled = false,
  onClick,
  ...props
}) {
  const elementRef = useRef(null);
  const defaults = variantDefaults[variant] ?? variantDefaults.secondary;

  const setSpecularPosition = (event, active) => {
    const element = elementRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = followMouse ? event.clientX - rect.left : rect.width / 2;
    const y = followMouse ? event.clientY - rect.top : rect.height / 2;
    const distance = Math.hypot(x - rect.width / 2, y - rect.height / 2);
    const proximityFactor = active ? Math.max(0, 1 - distance / Math.max(proximity, 1)) : 0;
    const strength = idleIntensity + (intensity - idleIntensity) * proximityFactor;

    element.style.setProperty("--specular-x", `${x}px`);
    element.style.setProperty("--specular-y", `${y}px`);
    element.style.setProperty(
      "--specular-alpha",
      `${Math.max(0, tintOpacity * strength) * 100}%`
    );
    element.style.setProperty("--specular-glow", `${Math.max(0, glow * strength * 16)}px`);
  };

  const buttonStyle = {
    ...style,
    "--specular-radius": `${radius}px`,
    "--specular-tint": tint,
    "--specular-text": textColor ?? defaults.textColor,
    "--specular-line": lineColor ?? defaults.lineColor,
    "--specular-base": baseColor ?? defaults.baseColor,
    "--specular-alpha": `${Math.max(0, tintOpacity * idleIntensity) * 100}%`,
    "--specular-glow": `${Math.max(0, glow * idleIntensity * 16)}px`,
    "--specular-shine-size": `${shineSize}rem`,
    "--specular-shine-fade": `${shineFade}%`,
    "--specular-thickness": `${thickness}px`,
  };

  const sharedProps = {
    ...props,
    ref: elementRef,
    className: `specular-button specular-button--${variant} specular-button--${size} ${className}`.trim(),
    style: buttonStyle,
    onPointerEnter: (event) => {
      setSpecularPosition(event, true);
      props.onPointerEnter?.(event);
    },
    onPointerMove: (event) => {
      setSpecularPosition(event, true);
      props.onPointerMove?.(event);
    },
    onPointerLeave: (event) => {
      setSpecularPosition(event, false);
      props.onPointerLeave?.(event);
    },
  };

  const content = <span className="specular-content">{children}</span>;

  if (href) {
    return (
      <a {...sharedProps} href={href} onClick={onClick} aria-disabled={disabled || undefined}>
        {content}
      </a>
    );
  }

  return (
    <button {...sharedProps} type={type} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
