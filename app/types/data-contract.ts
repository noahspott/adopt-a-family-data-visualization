/**
 * Shared data contract types (single source of truth).
 * See docs/data-contract.md for full spec and DB mapping.
 */

export type FamilyStatus =
  | "unmatched"
  | "matched"
  | "packet-sent"
  | "closeout"
  | "fulfilled"
  | "exception";

export interface FamilyMember {
  name: string;
  age: number;
  gender: "M" | "F";
  sizes: {
    shirt: string;
    pants: string;
    shoe: string;
  };
  gifts: [string, string, string];
  metadata?: Record<string, unknown>;
}

export interface Family {
  id: string;
  churchAbbrev: string;
  familyNumber: number;
  splitLetter?: string;
  lastName: string;
  adults: number;
  members: FamilyMember[];
  householdPreferences: {
    store: string;
    giftCard: string;
    householdItem: string;
  };
  deliverySite: string;
  pickupLocation: string;
  boxesCount?: number;
  bikesCount?: number;
  preferenceTags?: string[];
  notes: string;
  status: FamilyStatus;
  sponsorId?: string;
  metadata?: Record<string, unknown>;
}

export interface Sponsor {
  id: string;
  name: string;
  email: string;
  phone: string;
  familySizePref: "small" | "medium" | "large";
  preferenceNotes: string;
  additionalNotes: string;
  donationAmount?: number;
  logisticsSponsorshipAmount?: number;
  matchedFamilyId?: string;
  metadata?: Record<string, unknown>;
}

export interface PacketChecklist {
  shoppingDone: boolean;
  wrappingDone: boolean;
  labelsApplied: boolean;
  dropOffScheduled: boolean;
  dropOffCompleted: boolean;
  receiptSent: boolean;
  closeoutConfirmed: boolean;
}

/** DB row shape for families (snake_case as returned by Supabase). */
export interface FamilyRow {
  id: string;
  church_abbrev: string;
  family_number: number;
  split_letter: string | null;
  last_name: string;
  adults: number;
  members: FamilyMember[];
  household_preferences: Family["householdPreferences"];
  delivery_site: string;
  pickup_location: string;
  boxes_count: number | null;
  bikes_count: number | null;
  preference_tags: string[] | null;
  notes: string;
  status: FamilyStatus;
  sponsor_id: string | null;
  metadata: Record<string, unknown> | null;
  is_seed_data?: boolean;
  created_at?: string;
  updated_at?: string;
}

/** DB row shape for sponsors (snake_case as returned by Supabase). */
export interface SponsorRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  family_size_pref: Sponsor["familySizePref"];
  preference_notes: string;
  additional_notes: string;
  donation_amount: number | null;
  logistics_sponsorship_amount: number | null;
  matched_family_id: string | null;
  metadata: Record<string, unknown> | null;
  user_id?: string;
  is_seed_data?: boolean;
  created_at?: string;
  updated_at?: string;
}

/** Map a families row from Supabase to the app Family type. */
export function familyFromRow(row: FamilyRow): Family {
  return {
    id: row.id,
    churchAbbrev: row.church_abbrev,
    familyNumber: row.family_number,
    splitLetter: row.split_letter ?? undefined,
    lastName: row.last_name,
    adults: row.adults,
    members: row.members,
    householdPreferences: row.household_preferences,
    deliverySite: row.delivery_site,
    pickupLocation: row.pickup_location,
    boxesCount: row.boxes_count ?? undefined,
    bikesCount: row.bikes_count ?? undefined,
    preferenceTags: row.preference_tags ?? undefined,
    notes: row.notes,
    status: row.status,
    sponsorId: row.sponsor_id ?? undefined,
    metadata: row.metadata ?? undefined,
  };
}

/** Map a sponsors row from Supabase to the app Sponsor type. */
export function sponsorFromRow(row: SponsorRow): Sponsor {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    familySizePref: row.family_size_pref,
    preferenceNotes: row.preference_notes,
    additionalNotes: row.additional_notes,
    donationAmount: row.donation_amount ?? undefined,
    logisticsSponsorshipAmount: row.logistics_sponsorship_amount ?? undefined,
    matchedFamilyId: row.matched_family_id ?? undefined,
    metadata: row.metadata ?? undefined,
  };
}
