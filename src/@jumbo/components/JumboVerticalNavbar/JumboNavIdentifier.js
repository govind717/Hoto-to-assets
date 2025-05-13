import React from "react";
import JumboNavSection from "@jumbo/components/JumboVerticalNavbar/JumboNavSection";
import JumboNavCollapsible from "@jumbo/components/JumboVerticalNavbar/JumboNavCollapsible";
import JumboNavItem from "@jumbo/components/JumboVerticalNavbar/JumboNavItem";
import { useSelector } from "react-redux";

const NAV_VARIANTS = {
  section: JumboNavSection,
  collapsible: JumboNavCollapsible,
  "nav-item": JumboNavItem,
};

const JumboNavIdentifier = ({ item, isNested, translate }) => {
  const permissions = useSelector(
    (state) =>
      state?.singleUserDataReducer?.user_data?.result?.role?.hoto_assets ||
      JSON.parse(localStorage.getItem("permissions"))
  );
  if (!item) return null;
//   if (
//     !Array.isArray(item?.permission) &&
//     !permissions?.[item?.permission]?.view
//   )
//     return null;

  if (
    Array.isArray(item?.permission) &&
    item?.permission?.length > 0 &&
    item?.permission?.every((perm) => !permissions?.[perm]?.view)
  ) {
    return null;
  }

  if (item.type && ["section", "collapsible", "nav-item"].includes(item.type)) {
    const NavComponent = NAV_VARIANTS[item.type];
    return <NavComponent translate item={item} isNested={isNested} />;
  }
};

JumboNavIdentifier.defaultProps = {
  isNested: false,
};

export default JumboNavIdentifier;
