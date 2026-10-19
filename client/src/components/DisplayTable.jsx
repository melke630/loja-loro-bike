//codigo cmentado no dia 13/10/2026
/*
import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DisplayTable = ({ data, column }) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="w-full py-0 px-0 border-collapse">
        <thead className="bg-black text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th>Codigo</th>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border whitespace-nowrap">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row,index) => (
            <tr key={row.id}>
              <td className="border px-2 py-1">{index+1}</td>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border px-2 py-1 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4"/>
    </div>
  );
};

export default DisplayTable; */

import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DisplayTable = ({ data, column }) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 w-full overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[560px] sm:min-w-0 py-0 px-0 border-collapse">
          <thead className="bg-black text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th className="border whitespace-nowrap text-xs sm:text-base">Codigo</th>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border whitespace-nowrap text-xs sm:text-base">
                    {header.isPlaceholder
                     ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row,index) => (
              <tr key={row.id}>
                <td className="border px-2 py-1 whitespace-nowrap text-xs sm:text-base">{index+1}</td>
                {row.getVisibleCells().map(cell => {
                  const isWrapColumn = cell.column.id === 'name' || cell.column.id === 'category';
                  return (
                    <td
                      key={cell.id}
                      className={`border px-2 py-1 ${isWrapColumn? 'whitespace-normal break-words max-w-[120px] sm:max-w-none text-xs sm:text-base' : 'whitespace-nowrap text-xs sm:text-base'}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-4"/>
    </div>
  );
};

export default DisplayTable;