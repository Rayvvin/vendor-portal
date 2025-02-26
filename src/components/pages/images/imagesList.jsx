// MediaList.js
import React, { useEffect, useState } from "react";
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
  SearchInput,
} from "react-admin";
import IconEvent from "@mui/icons-material/Event";
import {
  useMediaQuery,
  Fab,
  Box,
  Button,
  Typography,
  CardActions,
  Stack,
  Avatar,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const postFilters = [
  <SearchInput
    alwaysOn
    className="card"
    placeholder="Search Images"
    source="url"
    defaultValue=""
    resettable
    sx={{
      background: "#ffffff",
      borderRadius: "9px",
      // color: '#ffffff',
      marginBottom: "0px",
      "& .MuiOutlinedInput-input": {
        boxShadow: "none",
      },
      "& .MuiInputBase-root, .MuiOutlinedInput-notchedOutline, .notranslate": {
        border: "none",
        outline: "none",
        // color: '#ffffff',
        // maxWidth: '250px'
        // minWidth: "90px",
      },
    }}
  />,
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
              ></Stack>
            </Stack>
          ) : (
            <Stack width={"100%"}>
              {isLarge ? <></> : <></>}
              <Stack
                direction={"row"}
                width={"100%"}
                justifyContent={"space-evenly"}
                fontSize={"14px"}
                padding={"10px 20px"}
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr 1fr"
                gap="20px"
              ></Stack>
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
          <Stack direction="column">
            <p
              className="h1 card-title"
              style={{
                marginTop: "10px",
                fontSize: "1.5rem",
                fontWeight: "700",
                fontFamily: "Rubik",
              }}
            >
              {"Images"}
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
                <Button style={{ padding: "4px 20px" }}>
                  <IconEvent fontSize="small" style={{ marginRight: "2px" }} />
                </Button>
                <CreateButton variant="contained" label="Upload" />
              </Stack>
            ) : isMedium ? (
              <Stack
                direction="row"
                spacing={2}
                style={{ marginBottom: "10px" }}
              >
                <FilterButton variant="contained" filters={postFilters} />
                <CreateButton variant="contained" label="Upload" />
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
                <CreateButton
                  variant="contained"
                  sx={{ padding: "4px 40px", fontSize: "15px" }}
                  label="Upload"
                />
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

const MediaGrid = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;
  return (
    <Grid container spacing={2} marginLeft={'-26px'}>
      {data.map((record) => {
        return (
          <Grid
            item
            key={record.id}
            xs={3}
            sm={3}
            md={3}
            lg={2}
            xl={1}
            // padding={2}
            // gap={4}

            // sx={{ width: "max-content" }}
            // gridTemplateColumns={{
            //   xl: "6fr auto",
            //   lg: "5fr auto",
            //   md: "4fr auto",
            //   sm: "3fr auto",
            //   xs: "2fr auto",
            // }}
            // justifyItems="stretch"
            // alignItems="stretch"
            // justifyContent="space-evenly"
            // alignContent="space-evenly"
          >
            <Card className="card" sx={{ width: "min-content" }}>
              <CardMedia
                component="img"
                //   width="100"
                sx={{ width: "max-content", maxWidth: "90px" }}
                image={record.url}
                alt={record.name}
              />
              {/* <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {record.name}
              </Typography>
            </CardContent> */}
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export const ImageList = (props) => (
  <List
    actions={<ListActions />}
    {...props}
    perPage={20}
    sx={{
      backgroundColor: "transparent",
      boxShadow: "none",
      "& .RaList-content": {
        backgroundColor: "transparent !important",
        boxShadow: "none",
        border: "none",
        padding: "0px",
        margin: "5px",
      },
      "& .RaList-actions": {
        backgroundColor: "transparent !important",
      },
    }}
  >
    <MediaGrid />
  </List>
);
