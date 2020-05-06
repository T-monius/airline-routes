import React from 'react';
import TableRow from './TableRow'

const Table = ( { columns, rows, format } ) => {
  return (
    <table>
      <tr>
        {columns.map((columnHeader) => {
          return <th key={columnHeader.name} >{columnHeader.name}</th>
        })}
      </tr>
      {rows.map((route) => <TableRow columnTypes={columns}
                                     route={route}
                                     format={format}
                           /> )}
    </table>
  );
};

export default Table;