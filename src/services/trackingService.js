import { supabase } from '@/services/supabase';

export const trackingService = {
  // Save a daily entry
  async saveDailyEntry(userId, entryData) {
    const { data, error } = await supabase
      .from('daily_entries')
      .upsert({
        user_id: userId,
        date: entryData.date,
        cycle_day: entryData.cycleDay || null,
        cycle_phase: entryData.cyclePhase || null,
        moods: entryData.moods || [],
        energy_score: entryData.energyScore || null,
        water_glasses: entryData.waterGlasses || 0,
        sleep_hours: entryData.sleepHours || 0,
        movement_type: entryData.movementType || null,
        meals: entryData.meals || 0,
        snacks: entryData.snacks || 0,
        journal: entryData.journal || null,
        proud_of: entryData.proudOf || null,
        grateful_for: entryData.gratefulFor || null,
        manifestation: entryData.manifestation || null,
      }, {
        onConflict: 'user_id,date'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get all entries for a user
  async getUserEntries(userId, limit = 30) {
    const { data, error } = await supabase
      .from('daily_entries')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  // Get entry for a specific date
  async getEntryByDate(userId, date) {
    const { data, error } = await supabase
      .from('daily_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
    return data;
  },

  // Get latest entry
  async getLatestEntry(userId) {
    const { data, error } = await supabase
      .from('daily_entries')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },
};
