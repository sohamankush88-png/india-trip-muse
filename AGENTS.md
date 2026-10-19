<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep navigation in TanStack file routes and shared chrome in the root route; this preserves the platform's SSR and typed routing.
- Keep mock travel records and service seams separate from UI; this allows future provider integrations without altering page contracts.
- Keep prototype trip and expense state in session React context, with share snapshots in validated URLs; no backend persistence is implied.
- Load optional Google Maps and PDF dependencies only in their appropriate browser interactions; missing credentials must not block mock planning.

- Keep motion centralized in TravelMotion and the shared Button, using in-place viewport entrances and sessionStorage only for the splash flag; this preserves layout and prototype data contracts.
