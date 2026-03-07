/**
 * Impact point: one geographic location where aid is delivered.
 *
 * To use Supabase: createClient from @/app/lib/supabase/server (or client),
 * then use getFamilies(supabase) from @/app/lib/supabase/data and aggregate
 * by delivery_site or geography as needed.
 */

export type ImpactPoint = {
  zip: string;
  latitude: number;
  longitude: number;
  families: number;
  children: number;
  estimatedAid: number;
};

/** Status label for display (matches data-contract FamilyStatus). */
export type StatusKey =
  | "unmatched"
  | "matched"
  | "packet-sent"
  | "closeout"
  | "fulfilled"
  | "exception";

export type StatusCount = { status: StatusKey; count: number; label: string };

/** Mock status distribution for storytelling (replace with Supabase aggregation by status). */
export const mockStatusDistribution: StatusCount[] = [
  { status: "unmatched", count: 4, label: "Unmatched" },
  { status: "matched", count: 6, label: "Matched" },
  { status: "packet-sent", count: 9, label: "Packet Sent" },
  { status: "closeout", count: 6, label: "Closeout" },
  { status: "fulfilled", count: 5, label: "Fulfilled" },
  { status: "exception", count: 5, label: "Exception" },
];

/** Aggregate stats from impact points (use when no Supabase). */
export function aggregateImpact(points: ImpactPoint[]) {
  const totalChildren = points.reduce((s, p) => s + p.children, 0);
  const totalFamilies = points.reduce((s, p) => s + p.families, 0);
  const deliverySites = points.length;
  const totalAid = points.reduce((s, p) => s + p.estimatedAid, 0);
  return { totalChildren, totalFamilies, deliverySites, totalAid };
}

export const mockImpactData: ImpactPoint[] = [
  {
    zip: "30310",
    latitude: 33.727,
    longitude: -84.430,
    families: 65,
    children: 143,
    estimatedAid: 19500,
  },
  {
    zip: "30318",
    latitude: 33.786,
    longitude: -84.446,
    families: 42,
    children: 96,
    estimatedAid: 12600,
  },
  {
    zip: "30303",
    latitude: 33.752,
    longitude: -84.392,
    families: 31,
    children: 74,
    estimatedAid: 9300,
  },
  {
    zip: "30344",
    latitude: 33.676,
    longitude: -84.455,
    families: 27,
    children: 58,
    estimatedAid: 8100,
  },
];
