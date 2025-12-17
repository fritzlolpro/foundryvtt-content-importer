# Foundry VTT Content Parser - AI Coding Agent Instructions

## Project Overview

A Foundry VTT module enabling GMs to import actors, items, tables, and journals from text sources (PDFs, Reddit, ChatGPT output). Designed for D&D 5e system with extensible parser architecture.

## Architecture & Data Flow

### Parser Chain Pattern

The codebase uses a **try-catch parser chain** - multiple parser implementations attempt to parse input sequentially until one succeeds:

```typescript
// See: src/module/actor/parsers/typeGuardParserRunners.ts
function tryParser<T>(parsers: Parser[], lines: string[], typeGuard: (value: unknown) => T) {
  for (const parser of parsers) {
    try {
      const result = parser(lines);
      return typeGuard(result); // Type guards validate result structure
    } catch (e) {
      // Try next parser
    }
  }
  throw new Error('No parser succeeded');
}
```

**Key locations:**
- Actor parsers: [src/module/actor/parsers/](../src/module/actor/parsers/) - `available.ts` registers parsers, `wtcTextBlock.ts` is primary WTC stat block parser
- Item parsers: [src/module/item/parsers/](../src/module/item/parsers/)
- Table parsers: [src/module/table/process.ts](../src/module/table/process.ts) - `tryParseTables()` function

### Import Flow

1. **UI Hook** → `renderSidebarButtons()` adds import buttons to Foundry sidebar tabs
2. **Form Display** → `importActorForm.ts`, `importItemForm.ts`, etc. show clipboard paste UI
3. **Route Handler** → `processActorInput()`, `processTableJSON()` determine input type (JSON, text, CSV, Reddit)
4. **Parser Selection** → Appropriate parser chain attempts parsing
5. **Conversion** → `convert.ts` transforms parsed intermediate format to Foundry 5e data structure
6. **Creation** → Foundry API creates Actor/Item/Table/Journal

### Type System

Two-stage typing:
1. **Universal import types** (`ImportActor`, `ImportItem`) - game-system agnostic intermediate representation
2. **Fifth Edition types** (`FifthItem`, `FifthAbilities`) - Foundry 5e-specific data structures

See [src/module/actor/interfaces.ts](../src/module/actor/interfaces.ts) and [src/module/actor/templates/fifthedition.ts](../src/module/actor/templates/fifthedition.ts)

## Adding a New Parser

### For Actors

1. Create parser functions in `src/module/actor/parsers/`:
   ```typescript
   export const ParseMyFormat: ImportActorParser = {
     parseName: [parseNameMyFormat],
     parseHealth: [parseHealthMyFormat],
     parseAbilities: [parseAbilitiesMyFormat],
     // ... all required fields from ImportActorParser interface
   };
   ```

2. Register in `src/module/actor/parsers/available.ts`:
   ```typescript
   export const ACTOR_PARSERS = [ParseActorWTC, ParseMyFormat];
   ```

3. Add test fixtures in `test/actor/__fixtures__/` with actual stat block text

4. Parser functions receive `string[]` (split by newlines) and use regex/string matching to extract data

**Pattern**: Use `parseGenericFormula()` helper for common stat block patterns (see `wtcTextBlock.ts` line ~100)

### For Tables

Extend `tryParseTables()` in [src/module/table/process.ts](../src/module/table/process.ts) - parsers return `FoundryTable` structure

## Build System

**Gulp + Rollup** (not Webpack/Vite):

```bash
npm run build        # One-time build
npm run build:watch  # Watch mode for development
gulp link            # Symlink to Foundry user data (requires foundryconfig.json)
```

**Build flow:**
1. Rollup compiles TypeScript ([rollup.config.js](../rollup.config.js))
2. Gulp copies static files (templates, lang, styles) from `src/` to root
3. Output: `module/foundryvtt-content-importer.js` + copied assets

**Critical:** Files in root (`module/`, `templates/`, `styles/`, `lang/`) are build artifacts - edit sources in `src/` only

## Testing

Jest with fixture-based tests:

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
```

**Test pattern:**
- Fixtures in `test/actor/__fixtures__/` contain real stat block text as string constants
- Tests parse fixture text and validate output structure
- See [test/actor/parsers.test.ts](../test/actor/parsers.test.ts) for examples

**Config:** `jest.config.js` uses `test/tsconfig.test.json` for test-specific TypeScript settings

## Foundry VTT Integration

**Module initialization** in [src/module/foundryvtt-content-importer.ts](../src/module/foundryvtt-content-importer.ts):
- `Hooks.on('renderSidebarTab')` → Adds import buttons to sidebar
- Settings in [src/module/settings.ts](../src/module/settings.ts) enable/disable importers per type

**Compendium access:** `src/module/item/compendium/item.ts` queries Foundry compendium packs for icons and pre-filled items

## Project Conventions

- **No explicit file extension in imports** - TypeScript resolves automatically
- **Use existing parsers as templates** - Don't reinvent pattern matching, copy from `wtcTextBlock.ts`
- **Type guards validate at runtime** - See `isAbilities()` in [src/module/actor/interfaces.ts](../src/module/actor/interfaces.ts)
- **Parser functions throw on failure** - Chain relies on try-catch flow control

## Common Gotchas

1. **Source vs. build artifacts:** Always edit `src/`, never root `module/` directory
2. **Parser order matters:** First matching parser wins - put specific parsers before generic ones in `ACTOR_PARSERS` array
3. **Foundry global types:** `@league-of-foundry-developers/foundry-vtt-types` provides `Actor`, `Item`, `RollTable` globals
4. **Line-based parsing:** Input is split on `\n` - parsers receive string array, not single string

## Version Management

```bash
npm run bump-version -- --release=patch   # Patch version
npm run bump-version -- --release=minor   # Minor version
npm run bump-version -- --release=major   # Major version
```

Updates both `package.json` and `src/module.json` via [manifest-version-updater.js](../manifest-version-updater.js)
