import React from "react";
import Button from "@/components/form/components/button";
import { TableProps } from "./interface";
import Loading from "@/app/loading";

const Table = <T,>({
  columns,
  data,
  pagination,
  loading,
  // continue
  fixed,
}: TableProps<T>): React.ReactElement => {
  const { total, limit, page, handleChange } = pagination;
  const totalPages = Math.ceil(total / limit);

  // Continue
  const renderPaginationButtons = () => {
    return;
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
      {totalPages > 1 && (
        // Continue
        <div className="flex items-center justify-end mt-4 px-4">
          <div className="flex gap-2">
            <Button
              onClick={() => handleChange(page - 1)}
              disabled={page === 1}
              className={`px-3 py-1 border rounded`}
            >
              {"<"}
            </Button>

            {/* renderPaginationButtons() */}

            <Button
              onClick={() => handleChange(page + 1)}
              disabled={page === totalPages}
              className={`px-3 py-1 border rounded`}
            >
              {">"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
