import React from "react";
import { select, text } from "@storybook/addon-knobs";
import LoginMessage from "../components/LoginMessage";

export default {
  title: "LoginMessage",
  component: LoginMessage,
};

export const loggedOut = () => {
  return <LoginMessage />;
};

export const loggedIn = () => {
  const name = text("Name", "Joe Gaucho");
  const picture = text(
    "Image URL",
    "https://avatars3.githubusercontent.com/u/48100562"
  );
  const user = { name, picture };
  return <LoginMessage user={user} />;
};
