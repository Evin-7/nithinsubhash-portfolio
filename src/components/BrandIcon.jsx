import { icons as logoCollection } from "@iconify-json/logos";
import { FaInstagram } from "react-icons/fa6";

const brandIconNames = {
  email: "google-gmail",
  linkedin: "linkedin-icon",
  dribbble: "dribbble-icon",
  instagram: "instagram-icon",
};

const brandIconViewBoxes = {
  email: "0 0 256 193",
  linkedin: "0 0 256 256",
  dribbble: "0 0 256 256",
  instagram: "0 0 256 256",
};

export default function BrandIcon({ brand, className = "brand-icon", ...props }) {
  if (brand === "instagram") {
    return <FaInstagram className={className} aria-hidden="true" {...props} />;
  }

  const iconName = brandIconNames[brand] || brand;
  const icon = logoCollection.icons[iconName];

  if (!icon) return null;

  const viewBox = brandIconViewBoxes[brand] || "0 0 24 24";

  return (
    <svg
      className={className}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      {...props}
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
