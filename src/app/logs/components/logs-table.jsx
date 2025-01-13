'use client';
import { formatDistance } from 'date-fns';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Clock3 } from 'lucide-react';

import Badge from '@/components/tremor/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableFoot,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
} from '@/components/tremor/table';

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor(row => row, {
        id: 'location',
        header: () => <span>Location</span>,
        cell: info => (
            <div className='flex flex-col gap-2 items-start'>
                <span>{info.getValue().ip_location}</span>
                <Badge variant='neutral'>{info.getValue().ip}</Badge>
            </div>
        ),
    }),
    columnHelper.accessor(row => row, {
        id: 'quote',
        header: () => 'Quote',
        cell: info => (
            <div className='flex flex-col gap-2 items-start'>
                <Badge variant={info.getValue().type}>{info.getValue().type}</Badge>
                <span className='text-gray-900'>{info.getValue().quotes.quote}</span>
                <span className='text-gray-500 flex gap-1 items-center'>
                    <Clock3 size='0.85rem' />
                    {formatDistance(new Date(info.getValue().created_at + 'Z'), new Date())}
                </span>
            </div>
        ),
    }),
];

export default function LogsTable({ data = [] }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <TableRoot>
            <Table>
                <TableHead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHeaderCell key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </TableHeaderCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id} className='align-top'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <TableRow key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <TableCell key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.footer,
                                              header.getContext(),
                                          )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableFoot>
            </Table>
        </TableRoot>
    );
}
