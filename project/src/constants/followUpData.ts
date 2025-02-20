import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchFollowUpData = async () => {
  const fetchFeesPending = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('member_name, emp_id')
      .eq('state', 'pending');
    if (error) {
      console.error('Error fetching fees pending:', error);
      return [];
    }
    console.log('Fees Pending:', data); // Debugging log
    return data;
  };

  const fetchMembershipExpiring = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('members')
      .select('member_id, member_name')
      .lte('member_end_date', today);
    if (error) {
      console.error('Error fetching membership expiring:', error);
      return [];
    }
    console.log('Membership Expiring:', data); // Debugging log
    return data;
  };

  const feesPending = await fetchFeesPending();
  const membershipExpiring = await fetchMembershipExpiring();

  return [
    { 
      title: "Inquiry",
      count: 0,
      items: []
    },
    {
      title: "Fees Pending",
      count: feesPending.length,
      items: feesPending
    },
    {
      title: "Membership Expiring",
      count: membershipExpiring.length,
      items: membershipExpiring
    },
    {
      title: "Birthday",
      count: 171,
      items: [{ name: "DURAI SHANKER", id: "25/12/1965" }]
    }
  ];
};