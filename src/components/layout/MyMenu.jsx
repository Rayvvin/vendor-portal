// in src/MyMenu.js
import {
  Menu,
  useGetIdentity,
  useLogout,
  UserMenu,
  useSidebarState,
  useStore,
} from "react-admin";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  CardActions,
  Stack,
  Card,
  Avatar,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PeopleIcon from "@mui/icons-material/People";
import LabelIcon from "@mui/icons-material/Label";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import PasswordIcon from "@mui/icons-material/Password";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RouterIcon from "@mui/icons-material/Router";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ScoreIcon from "@mui/icons-material/Score";
import PaymentIcon from "@mui/icons-material/Payment";
import AddCardIcon from "@mui/icons-material/AddCard";
import SchoolIcon from "@mui/icons-material/School";
import BoltIcon from "@mui/icons-material/Bolt";
import {
  ChevronLeft,
  ChevronRight,
  TaskAlt,
  PendingActions,
  EventRepeat,
  Payments,
  AirplaneTicket,
  Event,
  Api,
  Category,
  ExitToApp,
  ShoppingCart,
  Sell,
  CardGiftcard,
  MoneyOffCsred,
  Settings,
  LocationOn,
  MoneySharp,
  Money,
  LocalShipping,
} from "@mui/icons-material";
import SubMenu from "./SubMenu";
import Divider from "@mui/material/Divider";
import { toTitleCase } from "../helpers/helpers";
const Logo =  '/assets/img/rayvvin_pngs/Logo (1).png?url';
const Icon = '/assets/img/rayvvin_pngs/favicon.png?url';

export const MyMenu = () => {
  // const [user, setUser] = useStore('user');
  const { data, loading } = useGetIdentity();
  const sidebarState = useSidebarState();
  const dividerOpacity = 0.2;
  const logout = useLogout();

  useEffect(() => {
    console.log();
  }, []);
  return (
    <Menu
      sx={{
        height: "100%",
        "& .MuiMenuItem-root": {
          fontFamily: "Rubik !important",
        },
      }}
    >

      <Menu.Item
        sx={{
          color: "white",
          fontFamily: "Rubik",
          "&.RaMenuItemLink-active": {
            borderLeft: "none",
            background: "none",
            color: "#fff",
            fontSize: "15px",
            "& .RaMenuItemLink-icon": {
              color: "#fff",
            },
          },
        }}
        to={false}
        primaryText={
          data && data?.medusa_store
            ? <img src={Logo} alt="Logo" width={100} />
            : "Rayvvin"
              // "Store Name"
        }
        leftIcon={<Category />}
      />
      {/* <Divider
        sx={{ opacity: dividerOpacity, backgroundColor: "white" }}
        variant={sidebarState && sidebarState[0] ? "fullWidth" : "middle"}
        flexItem
      />

      {sidebarState && sidebarState[0] ? (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingRight={2}
        >
          <Stack direction={"row"}>
            <Stack>
              <Menu.Item
                sx={{
                  color: "white",
                  //   fontFamily: "Lemon",
                  "&.RaMenuItemLink-active": {
                    borderLeft: "none",
                    background: "none",
                    color: "#fff",
                    fontSize: "15px",
                    "& .RaMenuItemLink-icon": {
                      color: "#fff",
                    },
                  },
                }}
                to={false}
                primaryText={data?.user?.firstname}
                leftIcon={
                  <Avatar
                    sx={{
                      height: 45,
                      width: 45,
                    }}
                    name={data?.user?.firstname}
                  />
                }
              />
            </Stack>
            <Stack
              justifyContent={"center"}
              sx={{
                "& .MuiTypography-root": { fontFamily: "Rubik !important" },
              }}
            >
              <Typography sx={{ color: "white", fontSize: "12px" }}>
                {data && data.user.type
                  ? toTitleCase(data?.user?.type)
                  : "Account Type"}
              </Typography>
              <Typography sx={{ color: "white", fontSize: "15px" }}>
                {data && data?.medusa_user?.metadata?.username
                  ? toTitleCase(data?.medusa_user?.metadata?.username)
                  : "User Name"}
              </Typography>
            </Stack>
          </Stack>
          <Stack>
            <ExitToApp sx={{ color: "white" }} onClick={logout} />
          </Stack>
        </Stack>
      ) : (
        <Menu.Item
          sx={{
            color: "white",
            fontFamily: "Lemon",
            "&.RaMenuItemLink-active": {
              borderLeft: "none",
              background: "none",
              color: "#fff",
              fontSize: "17px",
              "& .RaMenuItemLink-icon": {
                color: "#fff",
              },
            },
          }}
          to={false}
          primaryText={data?.user?.firstname}
          leftIcon={
            <Avatar
              sx={{
                height: 25,
                width: 25,
              }}
              name={data?.user?.firstname}
            />
          }
        />
      )}

      <Divider
        sx={{
          opacity: dividerOpacity,
          backgroundColor: "white",
          marginBottom: "10px",
        }}
        variant={sidebarState && sidebarState[0] ? "fullWidth" : "middle"}
        flexItem
      /> */}
      <Stack height={15}></Stack>
      <Menu.DashboardItem primaryText="Dashboard" />
      <Menu.Item
        to="/product"
        primaryText="Products"
        leftIcon={<Sell fontSize="small" />}
      />
      <Menu.Item
        to="/order"
        primaryText="Orders"
        leftIcon={<ShoppingCart fontSize="small" />}
      />
      <Menu.Item
        sx={{
          // fontFamily: "Rubik !important",
          "&.RaMenuItemLink-active": {
            borderLeft: "none",
            background: "none",
          },
        }}
        to={"/settings"}
        primaryText="Settings"
        leftIcon={<Settings fontSize="small" />}
      />

      {/* <Menu.Item
        to="/customer"
        primaryText="Customers"
        leftIcon={<PeopleIcon fontSize="small" />}
      /> */}
      {/* <Menu.Item
        to="/discount"
        primaryText="Discounts"
        leftIcon={<MoneyOffCsred fontSize="small" />}
      />
      <Menu.Item
        to="/gift_card"
        primaryText="Giftcards"
        leftIcon={<CardGiftcard fontSize="small" />}
      />

      <SubMenu primaryText="Account" leftIcon={<ChevronRight />}>
        <Menu.Item
          to="/complete-registration"
          primaryText="Update Account"
          leftIcon={<Api fontSize="small" />}
        />
      </SubMenu> */}

      {/* <Menu.Item
        to="/user"
        primaryText="Vendors"
        leftIcon={<PeopleIcon fontSize="small" />}
      />
      <Menu.Item
        sx={{
          // fontFamily: "Rubik !important",
          "&.RaMenuItemLink-active": {
            borderLeft: "none",
            background: "none",
          },
        }}
        to={"/region"}
        primaryText="Regions"
        leftIcon={<LocationOn fontSize="small" />}
      /> */}
      {/* <Menu.Item
          sx={{
            // fontFamily: "Rubik !important",
            "&.RaMenuItemLink-active": {
              borderLeft: "none",
              background: "none",
            },
          }}
          to={"/store-currencies"}
          primaryText="Store Currencies"
          leftIcon={<Paid fontSize="small" />}
        /> */}
      <Menu.Item
        sx={{
          // fontFamily: "Rubik !important",
          // "&.RaMenuItemLink-active": {
          //   borderLeft: "none",
          //   background: "none",
          // },
        }}
        to={"/wallet_account_transaction"}
        primaryText="Wallet"
        leftIcon={<Money fontSize="small" />}
      />

      {/* <Menu.Item
        sx={{
          // fontFamily: "Rubik !important",
          // "&.RaMenuItemLink-active": {
          //   borderLeft: "none",
          //   background: "none",
          // },
        }}
        to={"/logistics_orgs"}
        primaryText="Logistics Orgs"
        leftIcon={<LocalShipping fontSize="small" />}
      />
      <Menu.Item
        sx={{
          // fontFamily: "Rubik !important",
          // "&.RaMenuItemLink-active": {
          //   borderLeft: "none",
          //   background: "none",
          // },
        }}
        to={"/collection_stations"}
        primaryText="Collection Stations"
        leftIcon={<LocalShipping fontSize="small" />}
      />

      <Menu.Item
        sx={{
          // fontFamily: "Rubik !important",
          // "&.RaMenuItemLink-active": {
          //   borderLeft: "none",
          //   background: "none",
          // },
        }}
        to={"/pickup_requests"}
        primaryText="Pickup Requests"
        leftIcon={<LocalShipping fontSize="small" />}
      />

      <Menu.Item
        sx={{
          // fontFamily: "Rubik !important",
          // "&.RaMenuItemLink-active": {
          //   borderLeft: "none",
          //   background: "none",
          // },
        }}
        to={"/deliveries"}
        primaryText="Deliveries"
        leftIcon={<LocalShipping fontSize="small" />}
      /> */}

      {/* <Stack
        sx={{
          position: "absolute",
          bottom: 0,
          zIndex: 1,
          transition: "all 0.2s",
          width: "100%",
        }}
      >
        <Divider
          sx={{ opacity: dividerOpacity, backgroundColor: "white" }}
          variant={sidebarState && sidebarState[0] ? "fullWidth" : "middle"}
          flexItem
        />
        <Menu.Item
          sx={{
            // fontFamily: "Rubik !important",
            "&.RaMenuItemLink-active": {
              borderLeft: "none",
              background: "none",
            },
          }}
          to={"/settings"}
          primaryText="Settings"
          leftIcon={<Settings fontSize="small" />}
        />
      </Stack> */}
      {/* <SubMenu primaryText="Purchase" leftIcon={<ChevronRight />}>
            <Menu.Item to="/airtime" primaryText="Airtime" leftIcon={<PhoneInTalkIcon />}/>
            <Menu.Item to="/data" primaryText="Data" leftIcon={<WifiCalling3Icon />}/>
            <Menu.Item to="/gift-cards" primaryText="Gift Cards" leftIcon={<ReceiptLongIcon />}/>
        </SubMenu>
        <SubMenu primaryText="Trade" leftIcon={<ChevronRight />}>
            <Menu.Item to="/airt-2-cash" primaryText="Airtime 2 Cash" leftIcon={<ReceiptLongIcon />}/>
        </SubMenu>
        <SubMenu primaryText="Pay Bills" leftIcon={<ChevronRight />}>
            <Menu.Item to="/electricity" primaryText="Electric Bills" leftIcon={<BoltIcon />}/>
            <Menu.Item to="/cable" primaryText="Cable Payments" leftIcon={<RouterIcon />}/>
        </SubMenu>
        <SubMenu  primaryText="Purchase Pins" leftIcon={<ChevronRight />}>
            <Menu.Item to="/e-pins" primaryText="E-Pins" leftIcon={<ReceiptLongIcon />}/>
        </SubMenu>
        <SubMenu primaryText="Betting" leftIcon={<ChevronRight />}>
            <Menu.Item to="/bets" primaryText="Fund bet wallet" leftIcon={<ReceiptLongIcon />}/>
            <Menu.Item to="/livescores" primaryText="Live Scores" leftIcon={<ReceiptLongIcon />}/>
        </SubMenu>
        <Menu.Item to="/edu-pins" primaryText="Edu Pins" leftIcon={<SchoolIcon />}/>
        <SubMenu primaryText="Buy Tickets" leftIcon={<ChevronRight />}>
            <Menu.Item to="/tickets" primaryText="Tickets" leftIcon={<Event />}/>
        </SubMenu>
        <Menu.Item to="/wallet" primaryText="My Wallet" leftIcon={<Payments />}/>
        <Menu.Item to="/users" primaryText="My Account" leftIcon={<PeopleIcon />}/> */}
      {/* {
            user && user.role === "admin" ? (
                <>
                    <SubMenu isDropdownOpen={false} primaryText="APIs" leftIcon={<Api />}>
                        <Menu.Item to="/data-apis" primaryText="Data APIs" leftIcon={<Api />}/>
                        <Menu.Item to="/epin-apis" primaryText="Epin APIs" leftIcon={<Api />}/>
                        <Menu.Item to="/bet-apis" primaryText="Bettings APIs" leftIcon={<Api />}/>
                        <Menu.Item to="/gift-card-apis" primaryText="Gift Card APIs" leftIcon={<Api />}/>
                        <Menu.Item to="/airt-2-cash-apis" primaryText="Airt2Cash APIs" leftIcon={<Api />}/>
                    </SubMenu>
                    <Menu.Item to="/stats" primaryText="Statistics" leftIcon={<Api />}/>
                </>
            ) : (
                null
            )
        } */}
    </Menu>
  );
};
