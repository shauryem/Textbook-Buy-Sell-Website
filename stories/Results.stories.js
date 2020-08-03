import React from "react";
import { select, text } from "@storybook/addon-knobs";
import Results from "../components/Results";
import Overlay from "react-bootstrap/Overlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useToasts } from "../components/Toasts";
import Button from "react-bootstrap/Button";

export default {
  title: "Results",
  component: Results,
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

export const empty_results_table = () => {
  const columns = getColumnsWithActions((_, row) => {});

  const data = [];

  return <Results data={data} columns={columns} />;
};

export const results_with_data = () => {
  const image = "https://avatars3.githubusercontent.com/u/48100562";
  const isbn = text("ISBN", "1234");
  const name = text("Name", "name");
  const class_for = text("Class", "class");
  const professor = text("Professor", "professor");
  const contact = text("Contact Info", "contact info");
  const price = text("Price", "20");
  const date = text("Date", "10:00 AM\n 06/10/2020");
  let canSendEmail = 1;

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
              canSendEmail = 0;
              //sendMail(row);
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

  const data = [
    {
      image: image,
      isbn: isbn,
      name: name,
      class_for: class_for,
      professor: professor,
      contact: contact,
      price: price,
      date: date,
      type: "user",
    },
  ];

  return <Results data={data} columns={columns} />;
};
