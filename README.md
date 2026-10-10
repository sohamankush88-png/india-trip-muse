# YatraGenie

A frontend-only Indian travel planner built with React, TypeScript, TanStack Start/Router, Vite and Tailwind CSS v4. TanStack Router is the supported platform router (rather than React Router).

## Run
`bun install` then `bun run dev`.

## Prototype scope
No real bookings, login, provider calls or backend storage. All fares, opening hours, routes and rates are sample estimates. Trip and expense data are session-only and reset on refresh. Shared links contain a read-only snapshot of the plan; they are not private. Itineraries export to PDF using jsPDF. Non-Kashmir destinations use generic sample route labels; detailed place guides currently cover Kashmir and Pune.

## Optional live maps
Maps work as an illustrative mock without a key. To enable Google Maps, configure the **public browser key** `VITE_GOOGLE_MAPS_API_KEY` in your environment (an uncommitted local `.env` may contain this public key). Enable Maps JavaScript API, billing, and restrict the key to authorized app origins. The Lovable managed browser-key variable is also supported. Never place private server credentials in VITE variables or commit them. No Places, directions or travel-provider data calls are made. Live Maps cannot be verified in the agent sandbox; validate on an authorized deployed origin.

## Structure
- `src/data/mockData.ts`: sample destinations, food, stays, places and journey options.
- `src/services/`: mock integration seams for maps, train, flight, hotel, bus and itinerary services.
- `src/components/travel/`: reusable search, destination/place cards, daily itinerary, map, budget and shared layout.
- `src/routes/`: home, planning, results, itinerary, hotels, explore, map, budget, saved trips, help and read-only sharing.
