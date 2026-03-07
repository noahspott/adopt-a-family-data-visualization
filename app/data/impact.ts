/**
 * Impact point: one geographic location where aid is delivered.
 *
 * In production, replace mock data with a Supabase query:
 * const { data } = await supabase.from("families").select(...)
 */

export type ImpactPoint = {
  zip: string;
  latitude: number;
  longitude: number;
  families: number;
  children: number;
  estimatedAid: number;
};

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
