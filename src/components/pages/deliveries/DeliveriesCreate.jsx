import {
  BooleanField,
  DateField,
  ListButton,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  useRecordContext,
  useRedirect,
  useResourceContext,
  useShowContext,
  useStore,
  EditButton,
  useGetIdentity,
  Create,
  Toolbar,
  SaveButton,
} from "react-admin";
import DeliveriesShowComp from "./DeliveriesShowComp";
import { useMediaQuery, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CardActions,
  Stack,
  Card,
  Avatar,
} from "@mui/material";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import DeliveriesAsideComp from "./DeliveriesAsideComp";
import Medusa from "@medusajs/medusa-js";
import DeliveriesCreateComp from "./DeliveriesCreateComp";

const cardActionStyle = {
  // zIndex: 2,
  // display: 'inline-block',
  // float: 'right',
  // backgroundColor: 'red'
  marginY: "20px",
};

const RecordField = ({ field, basePath }) => {
  const [user, setUser] = useStore("user");
  const record = useRecordContext();
  if (!record) return null;
  // console.log(
  //   user,
  //   user.event_org_id,
  //   record._id,
  //   user && user.event_org_id === record._id,
  //   user && user.event_org_id === record.host.org
  // );
  return (
    <>
      <Button color="primary" onClick={null}>
        <ChevronRight />
        {record[field]}
        ...
      </Button>
      <EditButton basePath={basePath} />
    </>
  );
};

const DeliveriesCreateActions = ({ basePath, data, resource }) => {
  const res = useResourceContext();
  const record = useRecordContext();
  const redirect = useRedirect();
  return (
    <CardActions style={cardActionStyle}>
      <ListButton
        basePath={basePath}
        label={`Back to ${res}`}
        icon={<ChevronLeft />}
      />
      {/* <RecordField basePath={basePath} field="handle" /> */}
      {/* Add your custom actions */}
      {/* <Button className={'btn btn-primary'} color="primary" onClick={
            ()=>{
              redirect(`general`)
            }
          } >Custom Action</Button> */}
      {/* <button className="btn btn-primary m-4">
                <span>Custom Action</span>
            </button> */}
    </CardActions>
  );
};



const Aside = ({ product, setDeliveries }) => {
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const redirect = useRedirect();

  return (
    <>
      {isLarge ? null : (
        <Stack
          minWidth={"400px"}
          spacing={1}
          position={"sticky"}
          //   top={"5px"}
          sx={{ order: 1, mr: 2, mt: "12px", width: "350px" }}
        >
          <DeliveriesAsideComp product={product} setDeliveries={setDeliveries} />
        </Stack>
      )}
    </>
  );
};

export const DeliveriesCreate = () => {
  const [showTitle, setShowTitle] = useState(" ");
  const identity = useGetIdentity();
  const [product, setDeliveries] = useState(null);

  return (
    <Create
      title={"Create Pickup Request"}
      
      actions={<DeliveriesCreateActions />}
      // aside={<Aside product={product} setDeliveries={setDeliveries} />}
      sx={{
        "& .MuiToolbar-root, .RaShow-card": {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
        "& .RaCreate-card": {
          margin: {
            sm: "0px !important",
            md: "10px !important"
          },
        },
      }}
    >
      <DeliveriesCreateComp type={'create'} />
    </Create>
  );
};
