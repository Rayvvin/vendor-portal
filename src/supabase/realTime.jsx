import { supabase } from "./SupabaseConfig"
import { useEffect, useState } from 'react';


const useSupabaseRealtime = () => {
  const [realtimeData, setRealtimeData] = useState(null);

  useEffect(() => {
    // Create a Supabase channel and subscribe to real-time updates
    const channel = supabase.channel('room1');

    const handlePostgresChanges = (payload) => {
      // Update state with the received real-time data
      setRealtimeData(payload);
    };

    // Subscribe to 'postgres_changes' event with wildcard filters
    channel
      .on('postgres_changes', { event: '*', schema: '*' }, handlePostgresChanges)
      .subscribe();

    // Cleanup the subscription when the component unmounts
    return () => {
      channel.unsubscribe();
    };
  }, [realtimeData]); // Re-run effect when channelName changes

  return realtimeData;
};

export default useSupabaseRealtime;