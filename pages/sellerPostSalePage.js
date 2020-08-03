import useSWR from "swr";
import { useState } from "react";
import { useCallback } from "react";
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
import { runInNewContext } from "vm";
import { isbnformatchecker } from "../utils/isbnchecker";
import { currentDate } from "../utils/date";
import { useToasts } from "../components/Toasts";
import Toast from "react-bootstrap/Toast";

export const getServerSideProps = async ({ req, res }) => {
  const ssr = await requiredAuth({ req, res });

  ssr.props.initialData = (await getUsersPosts(ssr.props.user)).map(
    serializeDocument
  );

  return ssr;
};

function SellerPage(props) {
  const { user, initialData } = props;
  const { data, mutate } = useSWR("/api/index", { initialData });
  const [newISBN, setNewISBN] = useState("");
  const [newName, setNewName] = useState("");
  const [newClass, setNewClass] = useState("");
  const [newProfessor, setNewProfessor] = useState("");
  const [newContact, setNewContact] = useState("");
  const { showToast } = useToasts();
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const date = currentDate();
  const email = user.email;

  const newPost = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      setNewISBN("");
      setNewName("");
      setNewClass("");
      setNewProfessor("");
      setNewPrice("");
      setNewImage("");

      try {
        if (!newISBN || !newPrice) {
          showToast("ISBN & Price Required");
        } else if (isNaN(newPrice)) {
          showToast("Price must be a number");
        } else {
          if (!isbnformatchecker(newISBN)) {
            showToast("ISBN is invalid");
          } else {
            await mutate([data, { isbn: newISBN, price: newPrice }], false);

            await fetch("/api", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                image: newImage,
                isbn: newISBN.replace(/-/g, ""),
                name: newName,
                class_for: newClass,
                professor: newProfessor,
                contact: email,
                price: newPrice,
                date: date,
                type: "user",
              }),
            });

            await mutate();
            window.location.reload(true);
            showToast("Submission Successful!");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [newISBN, newName, newClass, newProfessor, newPrice, newImage]
  );

  return (
    <Layout user={user}>
      <Head>Submit Post</Head>
      <h1>Submit Post</h1>
      <p>
        Fill out the information and submit to post your sale. (* are necessary){" "}
      </p>
      <Form onSubmit={newPost} className="mb-5">
        <Form.Row>
          <Form.Group as={Col} controlId="ISBN">
            <Form.Label>*ISBN:</Form.Label>
            <Form.Control
              placeholder="Enter Book ISBN"
              value={newISBN}
              onChange={(e) => setNewISBN(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="Price">
            <Form.Label>*Price:</Form.Label>
            <Form.Control
              placeholder="Enter Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="Class">
            <Form.Label>Class Used For:</Form.Label>
            <Form.Control
              placeholder="Enter Class"
              value={newClass}
              onChange={(e) => setNewClass(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="Professor">
            <Form.Label>Professor Name:</Form.Label>
            <Form.Control
              placeholder="Enter Professor Name"
              value={newProfessor}
              onChange={(e) => setNewProfessor(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="Name">
            <Form.Label>Book Name:</Form.Label>
            <Form.Control
              placeholder="Enter Book Name (Please check your spelling!)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <br></br>
        <p>
          <h3>(Optional) Upload a Picture!</h3>
        </p>
        <p>
          Go to{" "}
          <a href="https://imgur.com/upload" target="_blank">
            {" "}
            Imgur{" "}
          </a>{" "}
          and upload your picture, then scroll your mouse over the picture and
          click on "Copy" when it pops up in the top right of the picture. Then
          paste the copied link here and add .jpg to the end (ie if your image
          link is https://imgur.com/xxx make sure to write
          https://imgur.com/xxx.jpg):
        </p>
        <Form.Row>
          <Form.Group as={Col} controlId="Image">
            <Form.Label>Image:</Form.Label>
            <Form.Control
              placeholder="Paste Imgur Link and Add .jpg"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <p></p>
        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  );
}

export default SellerPage;
