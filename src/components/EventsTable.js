import React, { useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";

// Function to format date to dd/mm/yyyy
const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const EventsTable = ({ events }) => {
    // State for filters and sorting
    const [startDateFilter, setStartDateFilter] = useState("");
    const [endDateFilter, setEndDateFilter] = useState("");

    const [sorting, setSorting] = useState([]);

    // Filter events based on start and end dates
    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const eventStart = new Date(event.startDate).getTime();
            const eventEnd = event.endDate ? new Date(event.endDate).getTime() : Infinity;
            const startFilter = startDateFilter ? new Date(startDateFilter).getTime() : -Infinity;
            const endFilter = endDateFilter ? new Date(endDateFilter).getTime() : Infinity;

            return eventStart >= startFilter && eventEnd <= endFilter;
        });
    }, [events, startDateFilter, endDateFilter]);

    // Define table columns with sorting options
    const columns = [
        {
            header: "Title",
            accessorKey: "title",
            sortingFn: "alphanumeric",
        },
        {
            header: "Category",
            accessorKey: "category",
            sortingFn: "alphanumeric",
        },
        {
            header: "Start Date",
            accessorKey: "startDate",
            sortingFn: (rowA, rowB, columnId) => {
                const dateA = new Date(rowA.getValue(columnId));
                const dateB = new Date(rowB.getValue(columnId));
                return dateA - dateB;
            },
            cell: ({ row }) => formatDate(row.getValue("startDate")),
        },
        {
            header: "End Date",
            accessorKey: "endDate",
            sortingFn: (rowA, rowB, columnId) => {
                const dateA = rowA.getValue(columnId) ? new Date(rowA.getValue(columnId)) : Infinity;
                const dateB = rowB.getValue(columnId) ? new Date(rowB.getValue(columnId)) : Infinity;
                return dateA - dateB;
            },
            cell: ({ row }) => (row.getValue("endDate") ? formatDate(row.getValue("endDate")) : ""),
        },
    ];

    // Initialize the table with data, columns, and sorting functionality
    const table = useReactTable({
        data: filteredEvents,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="p-3">
            {/* Date filters for start and end date */}
            <div className="d-flex mb-4 align-items-end">
                <div className="me-3">
                    <label htmlFor="startDateFilter" className="form-label">
                        Start Date:
                    </label>
                    <input
                        type="date"
                        id="startDateFilter"
                        className="form-control"
                        value={startDateFilter}
                        onChange={(e) => setStartDateFilter(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="endDateFilter" className="form-label">
                        End Date:
                    </label>
                    <input
                        type="date"
                        id="endDateFilter"
                        className="form-control"
                        value={endDateFilter}
                        onChange={(e) => setEndDateFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Table displaying the filtered and sorted events */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover rounded">
                    <thead className="table-dark">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="text-center"
                                        style={{ cursor: "pointer" }}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() === "asc" && " ▲"} {/* Display sorting arrows */}
                                        {header.column.getIsSorted() === "desc" && " ▼"}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="align-middle">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventsTable;