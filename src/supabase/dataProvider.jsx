import { supabaseDataProvider } from "ra-supabase";
import { supabase } from './SupabaseConfig';
import { useState } from "react";
import { useEffect } from "react";

export const dataProvider = supabaseDataProvider({
    instanceUrl: import.meta.env.VITE_BASE_URL,
    apiKey: import.meta.env.VITE_ANON_KEY,
    supabaseClient: supabase
});

// const subscribers = {};

// const subscribe = (resource, callback) => {
//   if (!subscribers[resource]) {
//     subscribers[resource] = [];
//   }

//   subscribers[resource].push(callback);

//   return () => {
//     subscribers[resource] = subscribers[resource].filter((cb) => cb !== callback);
//   };
// };

// const notifySubscribers = (resource, data) => {
//   if (subscribers[resource]) {
//     subscribers[resource].forEach((callback) => callback(data));
//   }
// };

// export const useSupabaseRealtimeDataProvider = () => {
//     const [realTimeData, setRealTimeData] = useState(null);
  
//     useEffect(() => {
//       const channel = supabase.channel('room1');
  
//       const handlePostgresChanges = (payload) => {
//         setRealTimeData(payload);
//         notifySubscribers(payload?.table, payload);
//       };
  
//       channel
//         .on('postgres_changes', { event: '*', schema: '*' }, handlePostgresChanges)
//         .subscribe();
  
//       return () => {
//         channel.unsubscribe();
//       };
//     }, []);
  
//     return {
//       ...dataProvider,
//       subscribe: (resource, callback) => {
//         return subscribe(resource, callback);
//      },
//     };
//   };