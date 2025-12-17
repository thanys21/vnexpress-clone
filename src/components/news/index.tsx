import React from "react";
import Table from "../common/table";
import { New } from "./interface";

const NewLists = (): React.ReactElement => {
  const columns = [
    {
      title: "ID",
      type: "number",
      value: (item: New) => <span>{item.new_id}</span>,
    },
    {
      title: "Title",
      type: "text",
      value: (item: New) => <span>{item.title}</span>,
    },
    {
      title: "Category",
      type: "text",
      value: (item: New) => <span>{item.category}</span>,
    },
    {
      title: "Publish Date",
      type: "date",
      value: (item: New) => (
        <span>{new Date(item.publish_date).toUTCString()}</span>
      ),
    },
  ];

  return (
    <Table<New>
      columns={columns}
      data={[
        {
          title: "Sample Title",
          new_id: 0,
          content: "",
          category: "",
          publish_date: new Date(),
          views: 0,
        },
        {
          title: "Sample Title",
          new_id: 0,
          content: "",
          category: "",
          publish_date: new Date(),
          views: 0,
        },
      ]}
      pagination={{ total: 2, limit: 10, page: 1, handleChange: () => {} }}
    />
  );
};

export default NewLists;
