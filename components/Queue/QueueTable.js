import React from 'react';
import {DataTable} from 'react-native-paper';

const QueueTable = props => {
  const bank = props.data;
  return bank.map(task => {
    const hit = task.project;
    return (
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>{hit.requester_name}</DataTable.Cell>
          <DataTable.Cell numeric>{hit.title}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    );
  });
};

export default QueueTable;
