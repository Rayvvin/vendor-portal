import { supabaseAuthProvider } from "ra-supabase";
import { supabase } from "./SupabaseConfig";
import { useStore } from "react-admin";

// const [user, setUser] = useStore('user');
// const publicRoutes = ["/signup"];

export const authProvider = supabaseAuthProvider(supabase, {
  // getPermissions: () => {
  //   const role = localStorage.getItem("permissions");
  //   return role ? Promise.resolve(role) : Promise.resolve("guest"); // default 'guest'
  // },

  getIdentity: async (user) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .match({ email: user.email })
      .single();

    if (!data || error) {
      throw new Error();
    }

    const { data: medusa_user, error: medusa_error } = await supabase
      .from("user")
      .select("*")
      .match({ email: user.email })
      .single();

    if (!medusa_user || medusa_error) {
      throw new Error();
    }

    const { data: medusa_store, error: medusa_store_error } = await supabase
      .from("store")
      .select("*")
      .match({ id: medusa_user.store_id })
      .single();

    if (!medusa_store || medusa_store_error) {
      throw new Error();
    }

    const { data: medusa_wallet, error: medusa_wallet_error } = await supabase
      .from("wallet")
      .select("*")
      .match({ user_id: medusa_user.id })
      .maybeSingle();

    if (medusa_wallet_error) {
      throw new Error();
    }

    const { data: medusa_wallet_account, error: medusa_wallet_account_error } =
      medusa_wallet
        ? await supabase
            .from("wallet_account")
            .select("*")
            .match({ wallet_id: medusa_wallet?.id })
            .maybeSingle()
        : {
            data: [],
          };

    if (!medusa_wallet_account || medusa_wallet_account_error) {
      throw new Error();
    }

    // console.log(data);
    // setUser(data);

    return {
      user: data,
      medusa_user,
      medusa_store,
      medusa_wallet,
      medusa_wallet_account,
    };
  },
});
