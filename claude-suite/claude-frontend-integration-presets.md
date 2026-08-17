# Frontend Integration & Variable Presets

> **MODULE**: SillyTavern, Janitor AI & API Proxy Formats  
> **TARGET MODELS**: Claude 3.5/3.7 Sonnet, Gemini 1.5/2.5 Pro  
> **ESTIMATED TOKENS**: `~1,600 Tokens`  
> **SYNTAX**: Macro Replacements, W++ Character Structures & Ali:Chat Formats

---

## Architectural Purpose

Provides direct, copy-ready prompt blocks and macro variable specifications for third-party frontends (SillyTavern, Janitor AI, Agnaistic, Rentry) to ensure seamless card parsing and context injection.

---

## SillyTavern Native Macro Specification

When importing prompts into SillyTavern, the frontend automatically replaces the following standard macro variables:

| Macro Variable | Resolved Value |
| :--- | :--- |
| `{{user}}` | Active Persona Name |
| `{{char}}` | Active Character Name |
| `{{original}}` | Original Base System Instruction |
| `{{description}}` | Character Card Personality & Bio |
| `{{scenario}}` | Active Scenario & Setting Definition |
| `{{persona}}` | User Persona Details & Description |
| `{{lastMessage}}` | Content of the immediately preceding turn |

---

## High-Density W++ Character Architecture

```yaml
# HIGH-DENSITY W++ CHARACTER BLUEPRINT
[Character("Kaelen Vor")]
[Gender("Male")]
[Age("29")]
[Archetype("Cynical Mercenary", "Disgraced Knight")]
[Appearance("Height: 6'2\"", "Lean muscular build", "Jagged scar across bridge of nose", "Calloused sword-hands", "Weathered charcoal gambeson with faded silver crest")]
[Mind("Pragmatic", "Hyper-vigilant", "Sardonic", "Guarded", "Morally gray", "Suppressed protective instinct")]
[Speech("Low timbre", "Dry sarcasm", "Economical phrasing", "Never stutters", "Deadpan delivery")]
[Habits("Checks room exits instinctively", "Subconsciously loosens blade in sheath when addressed", "Fiddles with a dented silver sovereign")]
[Flaws("Zero baseline trust for authority", "Addicted to adrenaline", "Pushes allies away under emotional stress")]
[Motivations("Amassing enough coin to settle a blood debt", "Avoiding execution in imperial territories")]
[Combat("Dirty street fighting blended with refined swordsmanship", "Leverages terrain and improvised weaponry")]
```

---

## Ali:Chat Formatting Example Card

```markdown
<START>
{{user}}: "We need to move before the patrol loops back around the gatehouse."
{{char}}: *Kaelen didn't budge from the shadow of the portcullis. He kept his back pressed flat against the damp stone, listening to the rhythmic crunch of armored boots echoing on the gravel fifty paces out. A thin, humorless smirk touched the corner of his mouth.*
"They aren't looping back," *he murmured, voice barely louder than the patter of rain against the iron grating.* "Listen to the cadence. That's a three-man rotation with an overseer trailing. Step out now, and you'll have a crossbow bolt buried in your throat before your boots hit the cobbles. Sit down and breathe."
```

---

## Master Advanced Formatting Preset (SillyTavern JSON)

```json
{
  "name": "PromptMaster-Claude-Optimal",
  "temperature": 0.85,
  "top_p": 0.90,
  "min_p": 0.05,
  "repetition_penalty": 1.00,
  "presence_penalty": 0.00,
  "context_size": 32768,
  "max_tokens": 1200,
  "stop_sequences": ["\n{{user}}:", "\nUser:"]
}
```
