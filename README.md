# Adopt-a-Family Data Visualization

A public-facing impact dashboard built for **Adopt a Family** (Cathedral of Christ the King, Atlanta) during the **March 2026 BuildWithChrist.ai Hackathon**.

**[→ View live site](https://adopt-a-family-data-visualization.vercel.app/)** *(deployed on Vercel)*

---

## Context

- **BuildWithChrist.ai** runs time-boxed hackathons to solve high-impact social problems; the March 2026 event focused on tooling for Adopt a Family.
- The **main builder track** had ~4 weeks of planning and built an operational system: bilingual family intake, sponsor sign-up, matching console, packet builder, and coordinator dashboard—all backed by a shared **Supabase** database and [data contract](docs/data-contract.md).
- **This project** was developed in parallel by a small team that joined the hackathon with two days’ notice. The constraint was to deliver something useful without duplicating the main track’s work—ideation and build had to fit into **about 4 hours**.

---

## What This Project Does

We chose to build a **public impact visualization** so the organization can show donors and partners the reach of the program. The dashboard is designed to plug into the main team’s Supabase instance and surface aggregate, non-PII metrics.

**Features:**

- **Summary metrics** — Total families sponsored, total children served, number of communities/delivery sites.
- **Status funnel** — Distribution of families across the pipeline (`unmatched` → `matched` → `packet-sent` → `closeout` → `fulfilled`).
- **Impact map** — Geographic view of where families are served (by delivery site).
- **Total aid** — Progress toward a program-level aid goal (e.g. dollar value or equivalent).

*Screenshots:* Add a `docs/screenshots/` folder and reference images there (e.g. `docs/screenshots/stats-cards.png`, `docs/screenshots/status-funnel.png`, `docs/screenshots/impact-map.png`, `docs/screenshots/total-aid.png`) in this section or in a short **Screenshots** subsection below.

---

## Tech & Data

- **Stack:** Next.js, TypeScript; optional Supabase client for live data.
- **Data source:** Reads from the same Supabase schema as the main system (`families`, `sponsors`, per the [data contract](docs/data-contract.md)). The app can run on mock data or be wired to real credentials for production use.

---

## Acknowledgments

Built for the March 2026 BuildWithChrist.ai Hackathon. Thanks to Adopt a Family, BuildWithChrist.ai, and Catholic Coders Guild. The hackathon was a strong opportunity to contribute to a charity and connect with other builders—looking forward to the next one.
