import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { createPortal } from "react-dom";

// Bootstrap tables used in all pages are structured in the following way

function Results(props) {
  const data = props.data;
  const columns = props.columns;

  return (
    <BootstrapTable
      keyField="_id"
      data={data}
      columns={columns}
      striped
      pagination={paginationFactory()}
      hover
    />
  );
}

export default Results;
