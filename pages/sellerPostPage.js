import useSWR from "swr";
import { useState } from "react";
import { useCallback } from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import { fetch } from "../utils/fetch";
import Layout from "../components/Layout";
import { requiredAuth } from "../utils/ssr";
import Button from "react-bootstrap/Button";
import BootstrapTable from "react-bootstrap-table-next";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { getUsersPosts } from "./api/index";
import { serializeDocument } from "../utils/mongodb";
import Head from "next/head";

export const getServerSideProps = async ({ req, res }) => {
  const ssr = await requiredAuth({ req, res });

  ssr.props.initialData = (await getUsersPosts(ssr.props.user)).map(
    serializeDocument
  );

  return ssr;
};

function imageFormatter(cell, row) {
  return (
    <a href={cell} target="_blank">
      <img style={{ width: 50 }} src={cell} />
    </a>
  );
}

function getColumnsWithActions(actionsFn) {
  return [
    {
      dataField: "image",
      text: "Image",
      formatter: imageFormatter,
    },
    {
      dataField: "isbn",
      text: "ISBN",
    },
    {
      dataField: "name",
      text: "Book Name",
    },
    {
      dataField: "class_for",
      text: "Class Used For",
    },
    {
      dataField: "professor",
      text: "Professor Name",
    },
    {
      dataField: "price",
      text: "Price",
      formatter: (cell, row) => {
        return "$" + cell;
      },
    },
    {
      dataField: "date",
      text: "Date",
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Delete",
      formatter: actionsFn,
    },
  ];
}

function SellerPage(props) {
  function refreshPage() {
    window.location.reload(true);
  }
  const { user, initialData } = props;
  const { data, mutate } = useSWR("/api/index", { initialData });
  const [newISBN, setNewISBN] = useState("");
  const [newContact, setNewContact] = useState("");

  const deletePost = useCallback(async (postId) => {
    try {
      await mutate(
        data.filter((u) => u._id !== postId),
        false
      );
      await fetch(`/api/${postId}`, { method: "DELETE" });
      window.location.reload(true);
    } catch {
      window.location.reload(true);
    }
  }, []);

  const columns = getColumnsWithActions((_, row) => {
    return (
      <Button
        variant="danger"
        onClick={() =>
          window.confirm("Are you sure you wish to delete this item?") &&
          deletePost(row._id)
        }
      >
        Delete
      </Button>
    );
  });
  return (
    <Layout user={user}>
      <Head>Your Posts</Head>
      <h1>Your Posts</h1>
      <BootstrapTable
        keyField="_id"
        data={data}
        columns={columns}
        striped
        pagination={paginationFactory()}
        hover
      />
    </Layout>
  );
}

export default SellerPage;
