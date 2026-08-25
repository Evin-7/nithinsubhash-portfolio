import { Icon as IconifyIcon } from "@iconify/react";
import { icons as logoCollection } from "@iconify-json/logos";

const brandIconNames = {
  email: "google-gmail",
  linkedin: "linkedin-icon",
  dribbble: "dribbble-icon",
  instagram: "instagram-icon",
};

export default function BrandIcon({ brand, className = "brand-icon", ...props }) {
  const iconName = brandIconNames[brand] || brand;
  const icon = logoCollection.icons[iconName];

  if (!icon) return null;

  return <IconifyIcon icon={icon} className={className} {...props} />;
}
