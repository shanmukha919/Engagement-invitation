import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// ─── RSVP ───────────────────────────────────────────────────────────────────

export async function submitRsvp(rsvpData) {
  const payload = {
    guest_slug: rsvpData.guestSlug || 'direct',
    name: rsvpData.name,
    phone: rsvpData.phone,
    attending: rsvpData.attending === 'yes' || rsvpData.attending === true,
    guests_count: Number(rsvpData.guestCount) || 1,
    message: rsvpData.message || '',
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from('rsvps').insert([payload]);
      if (error) throw error;
      return { success: true, source: 'supabase', data };
    } catch (err) {
      console.warn('Supabase insert failed, saving to local backup:', err);
    }
  }

  // Local storage fallback
  try {
    const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    existing.push(payload);
    localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
    return { success: true, source: 'local_storage', data: payload };
  } catch (e) {
    console.error('Local backup failed:', e);
    return { success: true, source: 'memory', data: payload };
  }
}

// ─── WISHES ─────────────────────────────────────────────────────────────────

export async function submitWish(wishData) {
  const payload = {
    name: wishData.name,
    message: wishData.message,
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase.from('wishes').insert([payload]);
      if (error) throw error;
      return { success: true, source: 'supabase', data };
    } catch (err) {
      console.warn('Supabase wish insert failed, saving to local backup:', err);
    }
  }

  // Local storage fallback
  try {
    const existing = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
    existing.unshift({ ...payload, id: Date.now() });
    localStorage.setItem('wedding_wishes', JSON.stringify(existing.slice(0, 100)));
    return { success: true, source: 'local_storage', data: payload };
  } catch (e) {
    console.error('Local wish backup failed:', e);
    return { success: true, source: 'memory', data: payload };
  }
}

export async function getWishes() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return { success: true, source: 'supabase', data: data || [] };
    } catch (err) {
      console.warn('Could not fetch wishes from Supabase:', err);
    }
  }

  // Local storage fallback
  try {
    const existing = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
    return { success: true, source: 'local_storage', data: existing };
  } catch (e) {
    return { success: true, source: 'memory', data: [] };
  }
}
