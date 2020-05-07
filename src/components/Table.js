import React from 'react';
import TableRow from './TableRow'

const Table = ( { columns, rows, format } ) => {
    return (
      <table className="routes-table" >
        <tbody>
          <tr key='header'>
            {columns.map((columnHeader) => {
              return <th key={columnHeader.name} >{columnHeader.name}</th>
            })}
          </tr>
          {rows.map((route) => <TableRow columnTypes={columns}
                                         route={route}
                                         format={format}
                               /> )}
        </tbody>
      </table>
    );
};

export default Table;