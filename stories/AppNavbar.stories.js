import React from "react";
import { select, text } from "@storybook/addon-knobs";
import AppNavbar from "../components/AppNavbar";

export default {
  title: "AppNavbar",
  component: AppNavbar,
};

export const loggedOut = () => {
  return <AppNavbar />;
};

export const loggedIn = () => {
  const name = text("Name", "Joe Gaucho");
  const picture = text(
    "Image URL",
    "https://avatars3.githubusercontent.com/u/48100562"
  );
  const user = { name, picture };
  return <AppNavbar user={user} />;
};
