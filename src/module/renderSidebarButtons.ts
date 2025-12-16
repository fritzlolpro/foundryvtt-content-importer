import { importActorForm as ImportActorForm } from './importActorForm';
import { importTableForm as ImportTableForm } from './importTableForm';
import { importItemForm as ImportItemForm } from './importItemForm';

import { Handler } from './importForm';
import { importJournalForm as ImportJournalForm } from './importJournalForm';

export function renderSidebarButtons(app: any, tab: string, handler: Handler) {
  const name = tab.charAt(0).toUpperCase() + tab.slice(1);
  const html = app.element;
  
  // Check if button already exists
  if (html.querySelector('#inputButton')) return;
  
  // Create button element
  const button = document.createElement('button');
  button.id = 'inputButton';
  button.style.flexBasis = 'auto';
  button.innerHTML = `<i class="fas fa-atlas"></i> Import ${name}`;
  
  // Find header-actions and append button
  const headerActions = html.querySelector('.header-actions');
  if (!headerActions) return;
  
  headerActions.appendChild(button);
  
  // Add click event listener
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    switch (tab) {
      case 'journal': {
        const form = new ImportJournalForm({ handler, tab });
        form.render(true);
        break;
      }
      case 'tables': {
        const form = new ImportTableForm(handler, tab);
        form.render(true);
        break;
      }
      case 'actors': {
        const form = new ImportActorForm({ handler, tab });
        form.render(true);
        break;
      }
      case 'items': {
        const form = new ImportItemForm({ handler, tab });
        form.render(true);
        break;
      }
      default:
        throw new Error(`Unknown tab: ${tab}`);
    }
  });
}
