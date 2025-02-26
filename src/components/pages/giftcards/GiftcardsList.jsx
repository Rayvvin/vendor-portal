import { useEffect, useState } from "react";
import {
  BooleanField,
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  useListContext,
  useNotify,
  useRedirect,
  useRefresh,
  useResourceContext,
  useStore,
  TopToolbar,
  CreateButton,
  FilterButton,
  TextInput,
  DateInput,
  FilterForm,
} from "react-admin";
import { useMediaQuery, Fab } from "@mui/material";
import IconEvent from "@mui/icons-material/Event";
import {
  Box,
  Button,
  Typography,
  CardActions,
  Stack,
  Card,
  Avatar,
} from "@mui/material";
import CustomerListComp from "./GiftcardsListComp";
import { toTitleCase } from "../../helpers/helpers";
import OrderListComp from "./GiftcardsListComp";
import GiftcardListComp from "./GiftcardsListComp";

const postFilters = [
  <TextInput label="Title" source="title" defaultValue="" />,
  <TextInput label="Description" source="description" defaultValue="" />,
  <TextInput label="Handle" source="handle" defaultValue="" />,
];

const ListActions = () => {
  const { data } = useListContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [payl, setPayl] = useState(null);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useStore("user");
  const listContext = useListContext();
  const refresh = useRefresh();
  const resource = useResourceContext();

  useEffect(() => {}, []);

  if (!user) {
    // client.authenticate().then((value) => {
    //   setUser(value.user);
    // });
  }

  useEffect(() => {
    if (data) {
      setPayl(data.length);
    }
  }, [data]);

  return (
    <>
      <Stack width={"100%"}>
        {/* <BreadCrumbs resource={[listContext.resource]} showpage={false} /> */}
        <Stack
          direction="row"
          justifyContent="space-around"
          spacing={2}
          marginTop="20px"
          flexWrap={{ md: "nowrap", sm: "nowrap", lg: "nowrap" }}
          width={"100%"}
          overflow="auto"
        >
          {isSmall ? (
            <Stack width={"100%"}>
              
              <Stack
                direction={"row"}
                width={"100%"}
                justifyContent={"space-evenly"}
                fontSize={"14px"}
                padding={"5px 5px"}
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr 1fr"
                gap="5px"
              >
                
              </Stack>
            </Stack>
          ) : (
            <Stack width={"100%"}>
              {isLarge ? (
                <>
                  
                </>
              ) : (
                <></>
              )}
              <Stack
                direction={"row"}
                width={"100%"}
                justifyContent={"space-evenly"}
                fontSize={"14px"}
                padding={"10px 20px"}
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr 1fr"
                gap="20px"
              >
                
              </Stack>
            </Stack>
          )}
        </Stack>
        <TopToolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "baseline",
            marginInline: "15px",
            "& .filter-field": {
              marginBottom: "10px",
            },
          }}
        >
          <Stack
            direction="column"
          >
            <p
              className="h1 card-title"
              style={{
                marginTop: "10px",
                fontSize: "1.5rem",
                fontWeight: "700",
                fontFamily: "Rubik",
              }}
            >
              {"Giftcards"}
            </p>
            <FilterForm filters={postFilters} />
          </Stack>
          {/* Add your custom actions */}
          <>
            {isSmall ? (
              <Stack
                direction="row"
                spacing={2}
                style={{ marginBottom: "10px" }}
              >
                <FilterButton filters={postFilters} />
                <Button
                      style={{padding: '4px 20px'}}
                  >
                      <IconEvent fontSize='small' style={{marginRight: '2px' }} />
                  </Button>
                {/* <CreateButton variant="contained" label="Create" /> */}
              </Stack>
            ) : isMedium ? (
              <Stack
                direction="row"
                spacing={2}
                style={{ marginBottom: "10px" }}
              >
                <FilterButton variant="contained" filters={postFilters} />
                {/* <CreateButton variant="contained" label="Create" /> */}
                {/* <Button
                          variant='contained'
                          style={{padding: '4px 40px'}}
                      >
                          <IconEvent fontSize='small' style={{marginRight: '2px' }}/>
                          <p style={{fontSize: '13px'}}>Schedule</p>
                      </Button> */}
              </Stack>
            ) : (
              <Stack
                direction="row"
                spacing={2}
                style={{ marginBottom: "10px" }}
              >
                <FilterButton filters={postFilters} />
                {/* <CreateButton
                  variant="contained"
                  sx={{ padding: "4px 40px", fontSize: "15px" }}
                  label="Create"
                /> */}
                {/* <Button
                          variant='contained'
                          style={{padding: '4px 40px'}}
                      >
                          <IconEvent fontSize='small' style={{marginRight: '2px' }}/>
                          <p style={{fontSize: '13px'}}>Schedule</p>
                      </Button> */}
              </Stack>
            )}
          </>
        </TopToolbar>
        <div
          className="divider card-divider"
          style={{ marginInline: "10px", margin: "5px" }}
        />
      </Stack>
    </>
  );
};

export const GiftcardList = () => (
  <List
    actions={<ListActions />}
    title={" "}
    // filter={user.role && user.role === "user" ? { email: user.email } : null}
    // aside={<Aside quickLinks={quickLinks} />}
    empty={false}
    sort={{ field: "updated_at", order: "DESC" }}
    sx={{
      backgroundColor: "transparent",
      boxShadow: "none",
      "& .RaList-content": {
        backgroundColor: "transparent !important",
        boxShadow: "none",
        border: "none",
        padding: "0px",
        margin: '5px'
      },
      "& .RaList-actions": {
        backgroundColor: "transparent !important",
      },
    }}
  >
    <GiftcardListComp />
  </List>
);
