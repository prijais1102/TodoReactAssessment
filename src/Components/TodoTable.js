
import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { Visibility, Edit, Delete } from '@material-ui/icons';
import styled from 'styled-components';
//import { Pagination } from 'react-bootstrap';
// import './TodoTable.css';


const Table = styled.table`
  width: 100%;
  // border-collapse: collapse;
  margin-top: 20px;
  // border-spacing: 0;
  border-spacing: 1em 0.5em;
  padding: 0 2em 1em 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  // padding: 8px;
  // text-align: left;
  // background-color: #FFFFFF ;
  // border: 2px solid #FFFFFF;
  font-family: cursive;
  font-size: 13px;
 
 border: 1px solid rgba(0, 0, 0, 0.1); 
 padding: 8px;
 text-align: left;
 border-radius:21px;
`;

const Td = styled.td`
  // padding: 8px;
  // border: 1px solid #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1); 
  padding: 8px;
  text-align: left;
  border-radius:20px;
  font-family:Trebuchet MS, sans-serif;
  font-size:13px;
`;

const ActionCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
 
  font-family: Trebuchet MS, sans-serif	;

  svg {
    cursor: pointer;
    margin: 0 4px;
  }
`;

export const StyledEditIcon = styled(Edit)`

  cursor: pointer;
  color : #87CEEB;
`;

export const StyledVisibilityIcon = styled(Visibility)`
  color: #007bff; 
  cursor: pointer;
`;

export const StyledDeleteIcon = styled(Delete)`
  
  color: #D11A2A ;
  cursor: pointer;
`;

const DataTable = ({ data, onView, onEdit, onDelete, onCheckboxChange }) => {
    // const [selectedRows, setSelectedRows] = useState([]);
    // const [isChecked, setIsChecked] = useState(false);


    const getStatusStyle = (completed) => ({
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
      borderRadius: '10px',
      width: '90px',
      height: '23px',
      color:'white',
      alignSelf : 'center',
      backgroundColor: completed ? 'green' : 'red',
      fontFamily:'Trebuchet MS, sans-serif',
      fontSize:'13px'
      
    });

  const columns = useMemo(
    () => [
      // {
      //   id:'statuscheckbox',
      //   Header: '',
      //   accessor: 'id',
      //   Cell: ({ row }) => (
      //     <input
      //       type="checkbox"
      //       checked={row.original.completed}
      //       //checked={isChecked}
      //       onChange={() => onCheckboxChange(row.original.id)}
      //     />
      //   ),
      // },
      {
        Header: 'Task ID',
        accessor: 'id',
        Cell: ({ row }) => <span>{`#${row.original.id}`}</span>, 
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Start Date',
        accessor: 'startdate',
      },
      {
        Header: 'End Date',
        accessor: 'enddate',
      },
      
      {
        id:'statuscompleted',
        Header: 'Status',
        accessor: 'completed',
          Cell: ({ row }) => (
        <div style={getStatusStyle(row.original.completed)}>
          {row.original.completed? 'Completed' : 'Pending'}
        </div>
      ),
      },
      {
        Header: 'View Details',
        Cell: ({ row }) => (
            <button style={{fontFamily: 'Trebuchet MS, sans-serif',
             fontSize:'13px', borderRadius:'13px'}} 
            onClick={() => onView(row.original.id)}><b>View Detail</b></button>
        ),
      },
      {
        Header: 'Actions',
        // accessor: 'id',
        Cell: ({ row }) => (
          <ActionCell>
            {/* <StyledVisibilityIcon onClick={() => onView(row.original.id)}  /> */}
            <StyledEditIcon onClick={() => onEdit(row.original.id)} />
            <StyledDeleteIcon onClick={() => onDelete(row.original.id)} /*disabled={!isChecked}*//>
          </ActionCell>
        ),
      },
    ],
    [/*selectedRows ,*/ onView, onEdit, onDelete, onCheckboxChange]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // page,
    // nextPage,
    // previousPage,
    // canNextPage,
    // canPreviousPage,
    // state: { pageIndex, pageSize },
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        // pageSize : 4,
        sortBy: [{ title: 'title', desc: false }],
      },
    },
    useGlobalFilter,
    useSortBy,
    // usePagination
  );

  const { globalFilter } = state;

  return (
    <>
     <input className='searchstyling'
        type="text"
        placeholder="Search..."
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />

  <div className='tablecontainer'>
     <Table {...getTableProps()}>
       <thead>
         {headerGroups.map((headerGroup) => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map((column) => (
               <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                 {column.render('Header')}
                 <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
               </Th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map((row) => {
           prepareRow(row);
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map((cell) => (
                 <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
               ))}
             </tr>
           );
         })}
       </tbody>
     </Table>
     {/* <div>
       <button onClick={() => previousPage()} disabled={!canPreviousPage}>
         Previous
       </button>
       <span>
         Page{' '}
         <strong>
           {pageIndex + 1} of {page.length}
         </strong>{' '}
       </span>
       <button onClick={() => nextPage()} disabled={!canNextPage}>
         Next
       </button>
     </div> */}
     
   </div>
    </>
   
  );
};

export default DataTable;
