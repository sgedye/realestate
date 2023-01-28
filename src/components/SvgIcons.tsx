/* https://remixicon.com/ */
import remixIcons from "~/assets/remixicon.symbol.svg?url";
import propertyIcons from "~/assets/propertyicon.symbol.svg?url";

export const SvgIcon = ({
  icon,
  ...rest
}: { icon: string } & React.SVGAttributes<SVGElement>): JSX.Element => {
  const iconGroup = icon.startsWith("ri-") ? remixIcons : propertyIcons;

  return (
    <svg {...rest}>
      <use xlinkHref={`${iconGroup}#${icon}`}></use>
    </svg>
  );
};
