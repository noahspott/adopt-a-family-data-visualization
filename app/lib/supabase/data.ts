/**
 * Data access helpers for Supabase tables from the data contract.
 * Use createClient() from ./client (browser) or ./server (server components).
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { FamilyRow, SponsorRow } from "@/app/types/data-contract";
import { familyFromRow, sponsorFromRow } from "@/app/types/data-contract";
import type { Family, Sponsor } from "@/app/types/data-contract";

const familiesColumns =
  "id,church_abbrev,family_number,split_letter,last_name,adults,members,household_preferences,delivery_site,pickup_location,boxes_count,bikes_count,preference_tags,notes,status,sponsor_id,metadata";

const sponsorsColumns =
  "id,name,email,phone,family_size_pref,preference_notes,additional_notes,donation_amount,logistics_sponsorship_amount,matched_family_id,metadata";

/** Fetch all families (or use .eq/.in etc. on the query). */
export async function getFamilies(
  supabase: SupabaseClient<unknown>
): Promise<Family[]> {
  const { data, error } = await supabase
    .from("families")
    .select(familiesColumns)
    .order("church_abbrev")
    .order("family_number");

  if (error) throw error;
  return (data ?? []).map((row) => familyFromRow(row as FamilyRow));
}

/** Fetch a single family by id. */
export async function getFamilyById(
  supabase: SupabaseClient<unknown>,
  id: string
): Promise<Family | null> {
  const { data, error } = await supabase
    .from("families")
    .select(familiesColumns)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // no rows
    throw error;
  }
  return data ? familyFromRow(data as FamilyRow) : null;
}

/** Fetch all sponsors. */
export async function getSponsors(
  supabase: SupabaseClient<unknown>
): Promise<Sponsor[]> {
  const { data, error } = await supabase
    .from("sponsors")
    .select(sponsorsColumns)
    .order("name");

  if (error) throw error;
  return (data ?? []).map((row) => sponsorFromRow(row as SponsorRow));
}

/** Fetch a single sponsor by id. */
export async function getSponsorById(
  supabase: SupabaseClient<unknown>,
  id: string
): Promise<Sponsor | null> {
  const { data, error } = await supabase
    .from("sponsors")
    .select(sponsorsColumns)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data ? sponsorFromRow(data as SponsorRow) : null;
}
