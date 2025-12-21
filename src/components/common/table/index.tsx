import React from "react";
import Button from "@/components/form/components/button";
import { TableProps } from "./interface";
import Loading from "@/app/loading";
import Select from "@/components/form/components/select";
import { limitOptions as lmOptions } from "@/components/common/variables";

const Table = <T,>({
  columns,
  data,
  pagination,
  loading,
  // continue
  fixed,
  limitOptions = lmOptions,
}: TableProps<T>): React.ReactElement => {
  const { total, limit, page, handleChange } = pagination;
  const totalPages = Math.ceil(total / limit);

  // Continue
  const renderPaginationButtons = () => {
    const buttons: React.ReactNode[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            key={i}
            variant="primary"
            onClick={() => handleChange(i, limit)}
            className={`px-3 py-1 border rounded`}
          >
            {i}
          </Button>
        );
      }
    } else {
      // first page
      buttons.push(
        <Button
          key={1}
          variant="primary"
          onClick={() => handleChange(1, limit)}
          className={`px-3 py-1 border rounded`}
        >
          1
        </Button>
      );

      if (page > 3) {
        buttons.push(<div className="px-2">...</div>);
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(
          <Button
            key={i}
            variant="primary"
            onClick={() => handleChange(i, limit)}
            className={`px-3 py-1 border rounded`}
          >
            {i}
          </Button>
        );
      }

      if (page < totalPages - 2) {
        buttons.push(<div className="px-2">...</div>);
      }

      // last page
      buttons.push(
        <Button
          key={totalPages}
          onClick={() => handleChange(totalPages, limit)}
          className={`px-3 py-1 border rounded`}
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="w-full">
      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  {loading ? <Loading /> : "No data"}
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {column.value(item, rowIndex)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 px-4">
        <div>
          {limitOptions && (
            <Select
              name="limit"
              value={limit}
              onChange={(e) => handleChange(1, Number(e.target.value))}
              className="border rounded px-2 py-1"
              options={limitOptions.map((option) => ({
                value: option,
                label: `${option}`,
              }))}
            />
          )}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleChange(page - 1, limit)}
            disabled={page === 1}
            className={`px-3 py-1 border rounded`}
          >
            {"<"}
          </Button>

          {renderPaginationButtons()}

          <Button
            onClick={() => handleChange(page + 1, limit)}
            disabled={page === totalPages}
            className={`px-3 py-1 border rounded`}
          >
            {">"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Table;
