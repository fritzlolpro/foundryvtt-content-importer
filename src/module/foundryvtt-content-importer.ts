import { Config, registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';
import { processTableJSON } from './table/process';
import { renderSidebarButtons } from './renderSidebarButtons';
import CONSTANTS from './constants';
import { processItemInput } from './item/handleInput';
import { processActorInput } from './actor/handleInput';
import { processInputJSON } from './journal/routes';

// Hook for each specific directory tab render event
Hooks.on('renderJournalDirectory', (app: any, html: JQuery) => {
  if (!(game as Game)?.user?.isGM) return;
  const config = Config._load();
  if (config.journalImporter) {
    renderSidebarButtons(app, 'journal', processInputJSON);
  }
});

Hooks.on('renderRollTableDirectory', (app: any, html: JQuery) => {
  if (!(game as Game)?.user?.isGM) return;
  const config = Config._load();
  if (config.tableImporter) {
    renderSidebarButtons(app, 'tables', processTableJSON);
  }
});

Hooks.on('renderActorDirectory', (app: any, html: JQuery) => {
  if (!(game as Game)?.user?.isGM) return;
  const config = Config._load();
  if (config.actorImporter) {
    renderSidebarButtons(app, 'actors', processActorInput);
  }
});

Hooks.on('renderItemDirectory', (app: any, html: JQuery) => {
  if (!(game as Game)?.user?.isGM) return;
  const config = Config._load();
  if (config.itemImporter) {
    renderSidebarButtons(app, 'items', processItemInput);
  }
});

// Initialize module
Hooks.once('init', async () => {
  console.log(`${CONSTANTS.module.name} | Initializing ${CONSTANTS.module.title}`);
  // Assign custom classes and constants here

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  // Register custom sheets (if any)
});

// When ready
Hooks.once('ready', async () => {
  // Do anything once the module is ready
});
