# Claude Multi-Character State & Lore Tracker

> **MODULE**: Context Memory Tagging & Dynamic State Ledger  
> **TARGET MODELS**: Claude 3.5 Sonnet, Claude 3.7 Sonnet, Claude 3 Opus  
> **ESTIMATED TOKENS**: `~1,750 Tokens`  
> **SYNTAX**: Structured XML Memory Schema & Dynamic State Updates

---

## Architectural Purpose

In long-running campaigns and complex multi-character scenarios (100+ turns), language models lose track of spatial coordinates, inventory changes, injuries, and evolving relationship dynamics.

This module introduces a lightweight, high-density **XML State Ledger** that Claude updates at the head or tail of turns to ensure mathematical continuity and flawless lorebook integration.

---

## Master System Prompt Block

```xml
<narrative_state_and_lore_system>
<state_ledger_schema>
Whenever a turn involves significant environmental movement, injury, inventory exchange, or relationship shift, include an understated state ledger in the output to maintain persistent continuity:

```xml
<state_tracker>
  <scene_location>Obsidian Keep — Courtyard (Night, Heavy Rain)</scene_location>
  <active_characters>
    <character name="{{char}}">
      <disposition>Suspicious, Guarded (Tension: 7/10)</disposition>
      <physical_state>Slight limp in right knee; dagger drawn</physical_state>
      <inventory_delta>-1 Health Vial, +1 Iron Key</inventory_delta>
    </character>
    <character name="Lord Vane">
      <disposition>Hostile, Calculating (Distance: 15 feet away)</disposition>
      <physical_state>Uninjured; mounted on warhorse</physical_state>
    </character>
  </active_characters>
  <narrative_flags>
    <flag id="truce_broken">TRUE</flag>
    <flag id="reinforcements_eta">3 Turns</flag>
  </narrative_flags>
</state_tracker>
```
</state_ledger_schema>

<lorebook_integration_rules>
1. DYNAMIC LORE RECALL:
   - When world information or character background is retrieved via context lorebooks/World Info, prioritize lore continuity over generic fantasy/sci-fi tropes.
   - Respect established factions, political tensions, magical limitations, technology tiers, and geographical distances.

2. SUBTLE LORE WEAVING:
   - Never output encyclopedic lore dumps into dialogue.
   - Weave world lore naturally through colloquial references, historical scars on architecture, cultural superstitions, and political cynicism.
</lorebook_integration_rules>
</narrative_state_and_lore_system>
```
