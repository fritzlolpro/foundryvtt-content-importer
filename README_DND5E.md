# D&D 5e Documentation (Untested)

**Warning: This documentation has not been tested after recent changes to the module. Use at your own risk.**

## Actors (D&D 5e)

Actors can be created by copying the text of a monster block into the clipboard tool.

The tool is designed to handle several standard formats of monster blocks, and attempts to resolve as many elements as possible into Foundry Actor items.

### D&D 5e Actor Import

- Parse standard 5e monster stat blocks
- Import MCDM Action Oriented monsters (e.g., from [Flee, Mortals!](https://files.mcdmproductions.com/FleeMortals/FleeMortalsPreview.pdf))
- Build [Universal NPC Roleplay Templates](https://thealexandrian.net/wordpress/37916/roleplaying-games/universal-npc-roleplaying-template) using [ChatGPT](https://openai.com/blog/chatgpt/) and auto-import the stat block

An example monster block could look like the below Swashbuckler:

```txt
Swashbuckler
Armor Class 17 (leather armor)
Hit Points 66 (12d8 + 12)
Speed 30 ft.Armor Class 12 (15 with mage armor)
Hit Points 78 (12d8 + 24)
Speed 30 ft.
Medium humanoid (any race), any non-lawful alignment
STR
12 (+1)
DEX
18 (+4)
CON
12 (+1)
INT
14 (+2)
WIS
11 (+0)
Medium humanoid (any race), any alignment
CHA
15 (+2)
Skills Acrobatics +8, Athletics +5, Persuasion +6
Senses passive Perception 10
Languages any one language (usually Common)
Challenge 3 (700 XP)
Lightfooted. The swashbuckler can take the Dash or Disengage
action as a bonus action on each of its turns.
Suave Defense. While the swashbuckler is wearing light or no
armor and wielding no shield, its AC includes its Charisma
modifier.
Actions
Multiattack. The swashbuckler makes three attacks: one with
a dagger and two with its rapier.
Dagger. Melee or Ranged Weapon Attack: +6 to hit, reach 5
ft. or range 20/60 ft., one target. Hit: 6 (1d4 + 4) piercing
damage.
Rapier. Melee Weapon Attack: +6 to hit, reach 5 ft., one target.
Hit: 8 (1d8 + 4) piercing damage.
```

### Generate an NPC block with GPT

Build a [Universal NPC Roleplay Template](https://thealexandrian.net/wordpress/37916/roleplaying-games/universal-npc-roleplaying-template) using [Chat GPT](https://openai.com/blog/chatgpt/) and auto import the stat block.
Just start your NPC template with the following:

```txt
Provide an NPC description with the sections - (appearance, quote, roleplaying tips, voice description, background, key info, copyable dnd 5e stat block) for a
```

As an example:

```txt
Provide an NPC description with the sections - (appearance, quote, roleplaying tips, voice description, background, key info, copyable dnd 5e stat block) for a male scholarly tiefling who is a coward and a wizard, named Theral
```

This should generate something similar to the following:

```txt
Appearance: Theral is a male tiefling with pale, almost sickly looking skin, dark eyes and a thin, angular face. He has small, pointed horns on his forehead and a thin, curled tail. He is small in stature and appears somewhat frail.

Quote: "Please, don't hurt me! I'm just a simple scholar, I don't want any trouble!"

Roleplaying Tips: Theral is a coward at heart and will do anything to avoid danger. He is intelligent and knowledgeable, but lacks confidence and bravery. He can be easily intimidated and manipulated, and may make poor decisions as a result. When roleplaying as Theral, try to portray him as someone who is constantly on edge and looking for ways to avoid conflict.

Voice Description: Theral has a high-pitched, nasally voice that quivers when he speaks. He tends to speak quickly, as if he is afraid of being interrupted.

Background: Theral was born into a wealthy, scholarly family and was raised to value knowledge and learning above all else. However, his cowardice and lack of physical prowess made him an outcast among his peers. He turned to magic as a means of gaining power and respect, but his lack of courage often hinders his abilities.

Key Info: Theral is a wizard and has a deep knowledge of magic and the arcane. However, he is afraid to use his powers and will only do so if he feels he has no other choice. He is also a skilled scholar and can provide valuable information on a wide range of subjects.

Copyable D&D 5e Stat Block:

Copy code
Theral

Medium humanoid (tiefling), lawful neutral

Armor Class 12

Hit Points 5 (1d6 + 1)

Speed 30 ft.

STR 8 (-1) DEX 14 (+2) CON 12 (+1) INT 18 (+4) WIS 8 (-1) CHA 14 (+2)

Saving Throws Int +6, Cha +4

Skills Arcana +6, History +6, Religion +6

Senses darkvision 60 ft., passive Perception 9

Languages Common, Infernal, two others

Challenge 1/8 (25 XP)

Magic Resistance. Theral has advantage on saving throws against spells and other magical effects.

Spellcasting. Theral is a 1st-level spellcaster. His spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). He has the following wizard spells prepared:

Cantrips (at will): fire bolt, prestidigitation, light

1st level (4 slots): detect magic, mage armor, magic missile

ACTIONS

Dagger. Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage.
```

You can copy and paste the stat block to create a matching NPC in Foundry.

## Items (5e only)

Import items copied from text blocks from PDFs. Will best effort parse and generate an item based on the elements.