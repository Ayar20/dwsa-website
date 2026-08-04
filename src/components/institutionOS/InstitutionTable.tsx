"use client";

import React from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  align?: "left" | "right" | "center";
}

interface InstitutionTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
}

export function InstitutionTable<T>({ columns, data, keyExtractor, emptyMessage = "No records found." }: InstitutionTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-[#8899b4] bg-[#061428] rounded-2xl border border-[#1a2f4a]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#1a2f4a] overflow-hidden bg-[#061428]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#030e1f] text-[#8899b4] text-[10px] uppercase font-black tracking-wider border-b border-[#1a2f4a]">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className={`p-4 ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a2f4a] text-white">
            {data.map((row) => (
              <tr key={keyExtractor(row)} className="hover:bg-[#0f223d]/50 transition-colors">
                {columns.map((col, idx) => (
                  <td key={idx} className={`p-4 ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}`}>
                    {typeof col.accessor === "function" ? col.accessor(row) : (row[col.accessor] as unknown as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
