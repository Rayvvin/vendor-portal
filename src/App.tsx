import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  CustomRoutes,
} from "react-admin";
import Landing from "./landing";
// import { Route } from "react-router";
// import { BrowserRouter, Routes } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import theme from "./theme/Theme";
import darkTheme from "./theme/DarkTheme";
import SignUp from "./components/pages/auth/signup";
import { dataProvider } from "./supabase/dataProvider";
import { authProvider } from "./supabase/authProvider";
import { useEffect } from "react";
import useSupabaseRealtime from "./supabase/realTime";
import SignUpWizard from "./components/pages/auth/signup-wizard";
import SignInWizard from "./components/pages/auth/signin-wizard";
import PhoneVerificationWizard from "./components/pages/auth/phone-verification-wizard";
import VerificationWizard from "./components/pages/auth/verification-wizard"
import CompleteRegistrationWizard from "./components/pages/auth/complete-registration-wizard";
import AccountUpdateWizardForm from "./components/pages/auth/update-account-wizard";
import AuthPage from "./components/pages/auth/auth";
import { ToastContainer, toast } from "react-toastify";
import { MyLayout } from "./components/layout/MyLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./home";
import { ProductList } from "./components/pages/products/ProductsList";
import { WalletList } from "./components/pages/wallet/WalletsList";
import { CustomerList } from "./components/pages/customers/CustomersList";
import { OrderList } from "./components/pages/orders/OrdersList";
import { DiscountList } from "./components/pages/discounts/DicountsList";
import { GiftcardList } from "./components/pages/giftcards/GiftcardsList";
import Settings from "./settings";
import { ProductShow } from "./components/pages/products/ProductsShow";
import { CustomerShow } from "./components/pages/customers/CustomersShow";
import { ProductCreate } from "./components/pages/products/ProductsCreate";
import { ProductEdit } from "./components/pages/products/ProductsEdit";
import { OrderShow } from "./components/pages/orders/OrdersShow";
import { UserList } from "./components/pages/users/UsersList";
import { UserShow } from "./components/pages/users/UsersShow";
import { RegionList } from "./components/pages/regions/RegionsList";
import { RegionShow } from "./components/pages/regions/RegionsShow";
import { RegionCreate } from "./components/pages/regions/RegionsCreate";
import { RegionEdit } from "./components/pages/regions/RegionsEdit";
import PersonalSettings from "./personalSettings";
import StoreCurrencies from "./storeCurrencies";
import AnalyDashboard from "./components/pages/analytics/analyDashboard";
import SuperAdminAnalytics from "./components/pages/analytics/superAdminAnalytics";
import SellerAnalytics from "./components/pages/analytics/sellerAnalytics";
import SellerAdminDash from "./components/pages/analytics/sellerAdminDash";
import { ImageList } from "./components/pages/images/imagesList";
import { MediaCreate } from "./components/pages/images/imagesCreate";
import { LogisticsOrgsList } from "./components/pages/logistics_orgs/LogisticsOrgsList";
import { LogisticsOrgShow } from "./components/pages/logistics_orgs/LogisticsOrgsShow";
import { CollectionStationsList } from "./components/pages/collection_stations/CollectionStationsList";
import { CollectionStationsShow } from "./components/pages/collection_stations/CollectionStationsShow";
import { PickupRequestsList } from "./components/pages/pickup_requests/PickupRequestsList";
import { PickupRequestsShow } from "./components/pages/pickup_requests/PickupRequestsShow";
import { DeliveriesShow } from "./components/pages/deliveries/DeliveriesShow";
import { DeliveriesList } from "./components/pages/deliveries/DeliveriesList";
import { PickupRequestCreate } from "./components/pages/pickup_requests/PickupRequestsCreate";
import { PickupRequestEdit } from "./components/pages/pickup_requests/PickupRequestsEdit";
import { DeliveriesCreate } from "./components/pages/deliveries/DeliveriesCreate";
import { DeliveriesEdit } from "./components/pages/deliveries/DeliveriesEdit";
// Create a client
const queryClient = new QueryClient();

export const App = () => {
  // Use the custom hook to get real-time updates
  const realtimeData = useSupabaseRealtime();

  useEffect(() => {
    if (realtimeData) {
      console.log("Change received!", realtimeData);
      // Do something with the real-time data
    }
  }, [realtimeData]);

  return (
    <BrowserRouter>
      <Admin
        dashboard={Home}
        layout={MyLayout}
        theme={theme}
        loginPage={AuthPage}
        dataProvider={dataProvider}
        authProvider={authProvider}
        // basename="/admin"
        title={"Rayvvin Vendor Admin"}
        darkTheme={darkTheme}
      >
        <Resource
          name="currency"
          recordRepresentation={(record) => `${record.code}`}
        />
        <Resource
          name="product"
          list={ProductList}
          create={ProductCreate}
          edit={ProductEdit}
          show={ProductShow}
        />
        <Resource
          name="customer"
          list={CustomerList}
          // create={PostCreate}
          edit={EditGuesser}
          show={CustomerShow}
        />
        <Resource
          name="order"
          list={OrderList}
          // create={PostCreate}
          edit={EditGuesser}
          show={OrderShow}
        />
        <Resource name="wallet_account_transaction" list={WalletList} />
        <Resource
          name="logistics_orgs"
          list={LogisticsOrgsList}
          show={LogisticsOrgShow}
        />
        <Resource
          name="collection_stations"
          list={CollectionStationsList}
          show={CollectionStationsShow}
        />
        <Resource
          name="pickup_requests"
          list={PickupRequestsList}
          show={PickupRequestsShow}
          create={PickupRequestCreate}
          edit={PickupRequestEdit}
        />
        <Resource
          name="deliveries"
          list={DeliveriesList}
          show={DeliveriesShow}
          create={DeliveriesCreate}
          edit={DeliveriesEdit}
        />
        <Resource
          name="user"
          list={UserList}
          // create={PostCreate}
          // edit={AccountUpdateWizardForm}
          show={UserShow}
        />
        <Resource
          name="region"
          list={RegionList}
          create={RegionCreate}
          edit={RegionEdit}
          show={RegionShow}
        />
        <Resource
          name="discount"
          list={DiscountList}
          // create={PostCreate}
          edit={EditGuesser}
          show={ShowGuesser}
        />
        <Resource
          name="gift_card"
          list={GiftcardList}
          // create={PostCreate}
          edit={EditGuesser}
          show={ShowGuesser}
        />
        {/* <Resource name="image" list={ImageList} create={MediaCreate} />; */}
        <CustomRoutes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/personal-settings" element={<PersonalSettings />} />
          <Route path="/store-currencies" element={<StoreCurrencies />} />
        </CustomRoutes>
        <CustomRoutes noLayout={true}>
          <Route path="/verify-phone" element={<PhoneVerificationWizard />} />
          <Route path="/verify-email" element={<VerificationWizard />} />
          <Route
            path="/complete-registration"
            element={<AccountUpdateWizardForm />}
          />
          <Route path="/update-account" element={<AccountUpdateWizardForm />} />
        </CustomRoutes>
      </Admin>
    </BrowserRouter>
  );
};
