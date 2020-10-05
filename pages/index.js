import useSWR, { mutate } from "swr";
import { useState } from "react";
import { useCallback } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Spinner from "react-bootstrap/Spinner";
import { fetch } from "../utils/fetch";
import Layout from "../components/Layout";
import { optionalAuth } from "../utils/ssr";
import Button from "react-bootstrap/Button";
import BootstrapTable from "react-bootstrap-table-next";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { getPosts } from "./api/index";
import { serializeDocument } from "../utils/mongodb";
import Head from "next/head";
import LoginMessage from "../components/LoginMessage";
import Results from "../components/Results";
import Overlay from "react-bootstrap/Overlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useToasts } from "../components/Toasts";

// The home page - features searching and display of available textbooks

export const getServerSideProps = async ({ req, res }) => {
  const ssr = await optionalAuth({ req, res });

  ssr.props.initialData = (await getPosts()).map(serializeDocument);

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
      style: (colum, colIndex) => {
        return { width: "150px", textAlign: "left" };
      },
    },
    {
      dataField: "name",
      text: "Name",
      style: (colum, colIndex) => {
        return { width: "500px", textAlign: "left" };
      },
    },
    {
      dataField: "class_for",
      text: "Class Used For",
      style: (colum, colIndex) => {
        return { width: "200px", textAlign: "left" };
      },
    },
    {
      dataField: "professor",
      text: "Professor",
      style: (colum, colIndex) => {
        return { width: "150px", textAlign: "left" };
      },
    },
    /*{
      dataField: "contact",
      text: "Contact Info",
    },*/
    {
      dataField: "price",
      text: "Price",
      style: (colum, colIndex) => {
        return { width: "100px", textAlign: "price" };
      },
      sort: true,
      formatter: (cell, row) => {
        return "$" + cell;
      },
      sortFunc: (a, b, order, dataField, rowA, rowB) => {
        a = parseFloat(a);
        b = parseFloat(b);
        if (order === "asc") {
          return a - b;
        }
        return b - a; // desc
      },
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              &nbsp;&nbsp;
              <IoMdArrowDropdown /> <IoMdArrowDropup />
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              &nbsp;&nbsp;{" "}
              <font color="red">
                <IoMdArrowDropup />
              </font>
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="red">
                <IoMdArrowDropdown />
              </font>
            </span>
          );
        return null;
      },
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      style: (colum, colIndex) => {
        return { width: "100px", textAlign: "left" };
      },
      sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (a === "") {
          a = "00:00 AM\n 00/00/0000";
        }
        if (b === "") {
          b = "00:00 AM\n 00/00/0000";
        }
        let n = a.substr(16).localeCompare(b.substr(16));
        if (n === 0) {
          n = a.substr(10, 5).localeCompare(b.substr(10, 5));
          if (n === 0) {
            n = a.substr(6, 2).localeCompare(b.substr(6, 2));
            if (n === 0) {
              n = a.substr(0, 5).localeCompare(b.substr(0, 5));
            }
          }
        }
        if (order === "asc") {
          return n;
        }
        return -n; // desc
      },
      sortCaret: (order, column) => {
        if (!order)
          return (
            <span>
              &nbsp;&nbsp;
              <IoMdArrowDropdown /> <IoMdArrowDropup />
            </span>
          );
        else if (order === "asc")
          return (
            <span>
              &nbsp;&nbsp;{" "}
              <font color="red">
                <IoMdArrowDropup />
              </font>
            </span>
          );
        else if (order === "desc")
          return (
            <span>
              &nbsp;&nbsp;
              <font color="red">
                <IoMdArrowDropdown />
              </font>
            </span>
          );
        return null;
      },
    },
    {
      dataField: "contact",
      style: (colum, colIndex) => {
        return { width: "100px", textAlign: "left" };
      },
      isDummyField: true,
      text: "Contact Seller",
      formatter: actionsFn,
    },
  ];
}

function refresh() {
  window.location.reload(true);
}

function HomePage(props) {
  const {user, initialData} = props;
  const {data, mutate} = useSWR("/api/index", { initialData });
  const [newISBN, setNewISBN] = useState("");
  const [newName, setNewName] = useState("");
  const [newClass, setNewClass] = useState("");
  const [newProfessor, setNewProfessor] = useState("");
  const {showToast} = useToasts();
  let canSendEmail = 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (let i = 0; i < props.initialData.length; i++) {
      if (newISBN != "") {
        if (props.initialData[i].isbn == newISBN) {
          delete props.initialData[i].id;
          delete props.initialData[i]._id;
          UserPostArr.push(props.initialData[i]);
        }
      }
      if (newName != "") {
        if (props.initialData[i].name == newName) {
          delete props.initialData[i].id;
          delete props.initialData[i]._id;
          UserPostArr.push(props.initialData[i]);
        }
      }
    }
  };

  const search = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      setNewISBN("");
      setNewName("");
      setNewClass("");
      setNewProfessor("");

      try {
        await mutate(
          data.filter(
            (u) =>
              (newISBN === "" ||
                u.isbn.replace(/-/g, "") === newISBN.replace(/-/g, "")) &&
              (newName === "" ||
                u.name.toLowerCase().includes(newName.toLowerCase())) &&
              (newClass === "" ||
                u.class_for.toLowerCase() === newClass.toLowerCase()) &&
              (newProfessor === "" ||
                u.professor.toLowerCase().includes(newProfessor.toLowerCase()))
          ),
          false //with the or, stops if the first part is true (newISBN === "") so doesn't filter by something if it isn't inputted (second part of the or is the filtering)
        );
      } catch (error) {
        console.log(error);
      }
    },
    [newISBN, newName, newClass, newProfessor]
  );

  const sendMail = useCallback(
    async (row) => {
      canSendEmail = 0;
      try {
        const cont = row.contact;
        await fetch("/api/mail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: cont,
            email: user.email,
            name: row.name,
          }),
        });
      } catch {
        // alert();
      }
    },
    [canSendEmail]
  );

  const columns = getColumnsWithActions((_, row) => {
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="tooltip">
            <div class="text-justify">
              <h6>Sample Email:</h6>
              Hello!
              <br />
              Someone is interested in your book:
              <br />
              Please message them at: [your email]
              <br />
              <br />
              Thank you!
              <br />
              The UCSB Textbooks App
            </div>{" "}
          </Tooltip>
        }
      >
        <Button
          variant="secondary"
          onClick={() => {
            if (user && canSendEmail == 1) {
              sendMail(row);
              showToast(
                "An email with your contact information and selected textbook request has been sent to the seller. They will reach out to you with further details"
              );
            } else if (canSendEmail == 0) {
              showToast("Email already sent");
            } else {
              showToast("Please log in to get in contact.");
            }
          }}
        >
          Send Email
        </Button>
      </OverlayTrigger>
    );
  });

  const dat = {
    data: data,
    columns: columns,
  };

  return (
    <Layout user={user}>
      <div>
        <Form onSubmit={search}>
          <Form.Row>
            <Form.Group as={Col} controlId="ISBN Search">
              <Form.Label>ISBN Search</Form.Label>
              <Form.Control
                name="isbn"
                placeholder="Search ISBN"
                value={newISBN}
                onChange={(e) => setNewISBN(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="Name Search">
              <Form.Label>Name Search</Form.Label>
              <Form.Control
                name="name"
                placeholder="Search Book Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="Class Search">
              <Form.Label>Class Search</Form.Label>
              <Form.Control
                name="class"
                placeholder="Search by Class"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="Professor Search">
              <Form.Label>Professor Search</Form.Label>
              <Form.Control
                name="professor"
                placeholder="Search by Professor"
                value={newProfessor}
                onChange={(e) => setNewProfessor(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <div className="btn-toolbar float-right ">
            <Button variant="secondary" type="submit" name="search">
              Search
            </Button>
            &nbsp;&nbsp;
            <Button variant="secondary" onClick={refresh} name="reset_search">
              Reset Search
            </Button>
          </div>
        </Form>
        <p></p>
        <p></p>
        <br></br>
        <p>
          <h3>Textbooks for Sale</h3>
        </p>
        <p></p>
        {}
        <Results data={data} columns={columns} />
      </div>
      <LoginMessage user={user} />
    </Layout>
  );
}

export default HomePage;
