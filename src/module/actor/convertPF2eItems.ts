import { PF2eStrike, PF2eFeature } from './interfaces';

/**
 * Convert a PF2eStrike to a Foundry Item (Melee type)
 * Strikes in PF2e are represented as "melee" items
 */
export function strikeToMeleeItem(strike: PF2eStrike, actorLevel: number): any {
  // Parse damage formula: "1d10+4 piercing" -> { damage: "1d10+4", damageType: "piercing" }
  const damageParts = strike.damage?.split(' ') || [];
  const damageFormula = damageParts[0] || '1d4';
  const damageType = damageParts[1] || 'bludgeoning';

  return {
    name: strike.name,
    type: 'melee',
    system: {
      description: {
        value: strike.description || '',
      },
      action: 'strike',
      bonus: {
        value: strike.attackBonus || 0,
      },
      damageRolls: {
        '0': {
          damage: damageFormula,
          damageType: damageType,
          category: null,
        },
      },
      traits: {
        value: strike.traits || [],
        otherTags: [],
      },
      // Set range for ranged attacks
      ...(strike.description?.toLowerCase().includes('ranged')
        ? {
            range: {
              increment: 10, // Default, could be parsed from description
              max: null,
            },
          }
        : {}),
      attackEffects: {
        value: [], // Effects like "Grab" would go here
      },
    },
  };
}

/**
 * Convert a PF2eFeature to a Foundry Item (Action type)
 * Features/abilities are represented as "action" items in PF2e
 */
export function featureToActionItem(feature: PF2eFeature): any {
  // Map action cost to PF2e action values
  let actionType: string = 'passive';
  let actionValue: number | null = null;

  if (feature.actionCost !== undefined) {
    if (typeof feature.actionCost === 'number') {
      actionType = 'action';
      actionValue = feature.actionCost;
    } else if (feature.actionCost === 'reaction') {
      actionType = 'reaction';
    } else if (feature.actionCost === 'free') {
      actionType = 'free';
    }
  }

  return {
    name: feature.name,
    type: 'action',
    system: {
      description: {
        value: feature.description || '',
      },
      actionType: {
        value: actionType,
      },
      actions: {
        value: actionValue,
      },
      traits: {
        value: feature.traits || [],
        otherTags: [],
      },
    },
  };
}
