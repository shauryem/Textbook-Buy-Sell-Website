import React from "react";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { select, text } from "@storybook/addon-knobs";

export default {
  title: "Layout",
  component: Layout,
};

export const loggedOutEmpty = () => {
  return <Layout />;
};

export const loggedInWithContentInContainer = () => {
  const content = text("Sample Content", "This is sample content");
  const name = text("Name", "Joe Gaucho");
  const picture = text(
    "Image URL",
    "https://avatars3.githubusercontent.com/u/48100562"
  );
  const user = { name, picture };
  return (
    <Layout user={user}>
      <Container className="py-3">{content}</Container>
    </Layout>
  );
};
