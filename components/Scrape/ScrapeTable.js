import React from 'react';
import {DataTable} from 'react-native-paper';

const ScrapeTable = props => {
  const bank = props.data;
  return (
    <DataTable>
      {bank.map(hit => {
        return (
          <DataTable.Row key={hit.hit_set_id}>
            <DataTable.Cell>{hit.requester_name}</DataTable.Cell>
            <DataTable.Cell numeric>{hit.title}</DataTable.Cell>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
};

export default ScrapeTable;
