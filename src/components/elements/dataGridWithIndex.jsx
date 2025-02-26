/* eslint-disable react/display-name */
import React, { FC, useMemo, useEffect } from "react";
import {
  Datagrid,
  useListContext,
  useRecordContext,
  List,
  TextField,
} from "react-admin";

// Field to display the row index
const CurrentIndexField = (props) => {
  const record = useRecordContext(props);
  return record && record.__index__ !== undefined ? (
    <span>{record.__index__}</span>
  ) : null;
};

// DataGrid that adds an index to each record
const DataGridWithIndex = React.forwardRef((props, ref) => {
  const { children, meta, ...rest } = props;
  const { data: rawData } = useListContext();
  const data = useMemo(
    () => rawData?.map((dt, index) => ({ ...dt, __index__: index + 1 })) || [],
    [rawData]
  );

  useEffect(() => {
    console.log("Meta", meta);
  }, [meta]);
  

  return (
    <Datagrid {...rest} ref={ref} data={data}>
      {/* <CurrentIndexField /> */}
      {children}
    </Datagrid>
  );
});

export default DataGridWithIndex;
