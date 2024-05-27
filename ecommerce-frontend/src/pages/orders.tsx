import { ReactElement, useState } from "react";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { Link } from "react-router-dom";

type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
};

const column: Column<DataType>[] = [
    {
      Header: "ID",
      accessor: "_id",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "Discount",
      accessor: "discount",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Action",
      accessor: "action",
    },
];

const Orders = () => {
    const [rows] = useState<DataType[]>([
        {
            _id: "erd564erdf6785tfg",
            amount: 12500,
            quantity: 1,
            discount: 5000,
            status: <span>Processing</span>,
            action: <Link to="/order">View</Link>
        },
        {
            _id: "rtyf675tfgr787uhy",
            amount: 95000,
            quantity: 1,
            discount: 5000,
            status: <span>Delivered</span>,
            action: <Link to="/order">View</Link>
        }
    ]);

    const Table = TableHOC<DataType>(
        column,
        rows,
        "dashboard-product-box",
        "Orders",
        rows.length > 6
      )();

      return (
        <div className="container">
          <h1>My Orders</h1>
          {Table}
        </div>
      );

}

export default Orders;