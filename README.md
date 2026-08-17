# ⚔️ Prompt Knight

> **Curated Roleplay System Prompts & Empirical Sampler Architectures**  
> **Maintained By**: Kars  
> **Live Site**: [https://prompt-knight-kohl.vercel.app/](https://prompt-knight-kohl.vercel.app/) *(Mirror: [GitHub Pages](https://kars32.github.io/PromptMaster-Vault/))*

---

## Overview

**Prompt Knight** is a clean, zero-bloat repository of tested roleplay system prompts engineered for frontier LLMs (Gemini and Claude).

Standard assistant setups often sanitize storytelling, collapse multi-character scenes, or speak on behalf of the user. Prompt Knight prompts strictly enforce:
* **Anti-Puppeting**: Zero tolerance for models generating actions, thoughts, or speech for `{{user}}`.
* **Fictional Isolation**: Uninhibited creative writing without moralizing preachiness or unsolicited safety lectures.
* **Epistemic Firewalls**: Prevents NPCs from telepathically knowing private secrets or off-screen events.
* **Somatic Immersion**: Natural, sensory-rich prose and unhurried character progression.

---

## Active Model Prompts

| Suite | Model | Features | Recommended Samplers |
| :--- | :--- | :--- | :--- |
| **Gemini** | **Gemini 3.6 Flash** | XML directives, OOC continuity engine, dramatic antagonist roleplay | `Temp: 1.00`, `Top-P: 0.95`, `Top-K: 40`, `Min-P: 0.05` |
| **Gemini** | **Gemini 3.7 Flash** | 5-phase cognitive pass & guided reasoning standard | `Temp: 1.00`, `Top-P: 0.95`, `Top-K: 64`, `Min-P: 0.05`, `Rep: 1.00 (Off)` |
| **Gemini** | **Gemini 3.1 Pro** | Embodied prose craft, high-parameter literary fiction | `Temp: 0.95`, `Top-P: 0.95`, `Top-K: 40`, `Min-P: 0.05` |
| **Claude** | **Claude Sonnet 4.6** | Platform override, in-fiction commitment, anti-hedging rules | `Temp: 0.90`, `Top-P: 1.00`, `Top-K: 0 (Off)`, `Min-P: 0.04`, `Penalties: 0.00` |

---

## How to Use

1. Go to **[https://prompt-knight-kohl.vercel.app/](https://prompt-knight-kohl.vercel.app/)**.
2. Select your model and click **Copy Prompt**.
3. In **SillyTavern** or **Janitor AI**, paste directly into your **System Prompt** or **Main Prompt**.
4. Configure the calibrated sampler sliders listed on each card.
