import React from 'react';

const TableRow = ( { columnTypes, route, format } ) => {
  return (
    <tr>
      {columnTypes.map((columnType) => {
        const columnValue = route[columnType.property];
        return <td key={ columnType.property + columnValue }>
                 {format(columnType.property, columnValue)}
               </td>
      })}
    </tr>
  )
}

export default TableRow;