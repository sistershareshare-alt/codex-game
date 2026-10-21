# Version boundaries

The user explicitly approved the original Halloween game and requested a separate 2.0 for future changes.

- Treat `v2/` as the active application source. Make future gameplay, UI, curriculum and art changes there unless the user explicitly specifies the original version.
- Keep `docs/index.html` and the original root application source unchanged. `frozen-v1.json` records the approved original page checksum.
- The original public page is `/codex-game/`; 2.0 is `/codex-game/v2/`.
- Root `npm start`, `npm run build` and `npm run generate:bank` target 2.0. Its build writes only `docs/v2/` and the 2.0 standalone artifact.
- Run `npm test` and relevant browser checks before publishing. The version tests verify the original page stays unchanged and browser storage is separate.
- Keep the owner's supplied Founder Kai font and its attribution unless the user asks to change it.
