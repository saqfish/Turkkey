import React from 'react';
import {DataTable} from 'react-native-paper';

const QueueTable = props => {
  const bank = props.data;
  return (
    <DataTable>
      {bank.map(task => {
        const hit = task.project;
        return (
          <DataTable.Row>
            <DataTable.Cell>{hit.requester_name}</DataTable.Cell>
            <DataTable.Cell numeric>{hit.title}</DataTable.Cell>
          </DataTable.Row>
        );
      })}
      <DataTable.Pagination
        page={1}
        numberOfPages={3}
        onPageChange={page => {
          console.log(page);
        }}
        label={`${bank.length} hits`}
      />
    </DataTable>
  );
};

export default QueueTable;
