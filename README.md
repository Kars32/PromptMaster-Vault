# Index & Architecture Philosophy

> **SYSTEM CLASSIFICATION**: Comprehensive Roleplay Architecture & Prompt Repository  
> **MAINTAINER**: PromptMaster Engineering  
> **DESIGN SYSTEM**: StyleSeed & CKW Monochromatic Editorial Standard  
> **THEME**: Porcelain White & Warm Stone Slate

---

## Architectural Purpose

The **PromptMaster Vault** is an open repository of production-grade system prompts, cognitive reasoning architectures, and roleplay framing systems engineered specifically for frontier large language models.

Standard conversational default instructions often produce homogenized, sanitized, or passive prose. This repository houses specialized architectures that:
1. **Enforce Absolute Fictional Isolation**: Quarantine creative narrative contexts from general safety filters.
2. **Prevent Anti-Puppeting**: Structurally prohibit models from speaking, deciding, or thinking on behalf of `{{user}}`.
3. **Execute Epistemic Multi-NPC Control**: Prevent telepathic knowledge bleed across multiple simultaneous characters.
4. **Deliver Rich Somatic Prose**: Enforce physical, atmospheric, and psychologically complex creative writing.

---

## Repository Architecture

```
[ ARCHITECTURAL OVERVIEW ]
├── System Overview
│   └── Inference & Sampling Parameters
├── Gemini Suite
│   ├── Roleplay & Atmospheric Prose Engine
│   ├── Pure Creative Sandbox Protocol
│   ├── Multi-NPC & Spatial Simulation Matrix
│   └── Thought Parsing & Markdown Contracts
└── Claude Suite
    ├── Claude 3.5/3.7 Master XML Roleplay Architecture
    ├── Anti-Puppeting & Agency Enforcement Rule
    ├── Multi-Character State & Lore Tracker
    └── Frontend Integration & Variable Presets
```

---

## Standardized Prompt Metadata Specification

Every prompt block published within this vault adheres to a deterministic metadata schema:

| Metadata Field | Definition | Example Values |
| :--- | :--- | :--- |
| **Target Engine** | Primary model family optimized for this instruction set | `Claude 3.5 Sonnet`, `Gemini 1.5 Pro`, `Gemini 2.5 Pro` |
| **Token Footprint** | Measured token length using official model tokenizers | `~1,840 Tokens` |
| **Parsing Standard** | Syntactic structure utilized for context ingestion | `Native XML Tags`, `Markdown Markdown Contracts` |
| **Frontend Targets** | Recommended platforms and orchestration frontends | `SillyTavern`, `Janitor AI`, `Direct API`, `OpenAI Web` |
| **Sampling Mode** | Temperature, Min-P, Top-P, and Top-K constraints | `T=0.88, P=0.92, Rep_Penalty=1.04` |

---

## Deployment & Usage Instructions

1. **One-Click Ingestion**: Click the **Copy** button located on the top-right corner of any prompt code block.
2. **System Prompt Slotting**:
   * In **SillyTavern**: Navigate to `Advanced Formatting` > `Main Prompt` or `System Prompt`, paste the content, and ensure macro variables (`{{user}}`, `{{char}}`) remain unescaped.
   * In **Janitor AI / Agnaistic**: Paste into the `Custom Prompt` or `Personality / Scenario` blocks.
   * In **Direct API Pipelines (Anthropic / Google AI Studio)**: Insert as the `system` parameter string in your API request body.
3. **Sampler Synchronization**: Apply the exact inference parameters documented at the top of each prompt card to ensure optimal token diversity and avoid repetition loops.
