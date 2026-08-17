# ⚔️ Prompt Knight — Master Website Design Specification

> **MASTER DESIGN ARCHITECTURE & COMPONENT SPECIFICATION**  
> **Location**: `WEBSITE_DESIGN.md`  
> **Purpose**: Serves as the immutable design reference for the Prompt Knight web application so that future changes are surgical and never arbitrarily remake the layout or add unwanted bloat.

---

## 1. Core Architectural Layout

```
[ App Container (min-h-screen bg-[#FAFAF8] overflow-x-clip) ]
  ├── [ Left Sidebar (Sidebar.jsx) ]
  │     ├── Brand Title: "Prompt Knight"
  │     ├── 5 Fixed Navigation Tabs
  │     ├── Desktop: Retractable (w-64 <-> w-0)
  │     └── Mobile: Slide-out drawer with backdrop
  └── [ Main Content Area (App.jsx) ]
        ├── Top Header: Menu Button, Brand Title, GitHub Link
        ├── Tab 1: Overview (3-Step Guide, Core Rules, Quick Jump)
        ├── Tab 2: Gemini Prompts (Search Bar, Prompt Cards)
        ├── Tab 3: Claude Prompts (Search Bar, Prompt Cards)
        ├── Tab 4: DeepSeek (ComingSoon.jsx)
        ├── Tab 5: Mimo (ComingSoon.jsx)
        └── Footer: Minimalist copyright & links
```

---

## 2. Color Palette & Typography Tokens

### Colors
* **Page Background**: Warm porcelain `#FAFAF8`
* **Card Surfaces**: Pure white `#FFFFFF` with `border: 1px solid rgba(0, 0, 0, 0.08)`
* **Codeblock Container**: Sleek light stone `#F7F7F5` with `#EEEEEC` header/footer bars and `border-stone-200`
* **Primary Text**: Deep Obsidian `#18181B` / `#09090B`
* **Code Text**: Obsidian Charcoal `#27272A` / `#18181B` font-mono
* **Muted Text**: Stone gray `#71717A`
* **Accent & Buttons**: Solid Obsidian `#18181B` (Hover: `#000000`)
* **Success Feedback**: Emerald `#10B981` (Copy confirmation)

### Typography
* **UI & Headings**: `Plus Jakarta Sans`, sans-serif
* **Code & Monospace**: `JetBrains Mono`, monospace
* **Token Badges & Numbers**: Monospace bold chips

---

## 3. Component Specification & File Locations

| File | Purpose | Key Constraints |
| :--- | :--- | :--- |
| `src/App.jsx` | Main orchestrator & routing | Hosts sidebar state, top bar, search filter, and tab viewports. |
| `src/components/Sidebar.jsx` | Retractable left navigation | Must collapse on desktop with `[PanelLeftClose]` and slide over on mobile. |
| `src/components/PromptCard.jsx` | Prompt card & codeblock | Features exact token badge, 6-parameter sampler grid, dark terminal codeblock, and copy/export buttons. |
| `src/components/ComingSoon.jsx` | Roadmap placeholder | Clean blueprint card for DeepSeek & Mimo. |
| `src/data/prompts.js` | Data store for all prompts | Single source of truth for prompt content, exact token counts, and sampler specs. |
| `calculate_tokens.js` | Token calculation utility | Computes exact cl100k / o200k token counts for all prompts. |

---

## 4. The 5 Locked Navigation Tabs

1. **`01 Overview`**: Simple 3-step setup guide, core anti-puppeting principles, and direct jump buttons.
2. **`02 Gemini`**:
   - `Gemini 3.6 Flash` (2,165 tokens)
   - `Gemini 3.7 Flash` (4,021 tokens)
   - `Gemini 3.1 Pro` (2,948 tokens)
3. **`03 Claude`**:
   - `Claude Sonnet 4.6` (1,499 tokens)
4. **`04 DeepSeek`**: DeepSeek V3 / R1 reasoning roadmap *(Coming Soon)*.
5. **`05 Mimo`**: High-context long-session roadmap *(Coming Soon)*.

---

## 5. Rules for Future Modifications

1. **Never Remake the Layout**: When user asks to add or edit prompts, update `src/data/prompts.js`. Do not rewrite `App.jsx` or change the visual layout.
2. **Always Run Token Calculator**: When a prompt's text is modified, run `node calculate_tokens.js` in `vault/` to refresh the exact token count.
3. **Preserve the Codeblock Look**: Maintain the `#18181B` terminal container, window dots, line counts, and 1-click copy affordances.
4. **Zero Horizontal Overflow Gate**: Ensure `body` keeps `overflow-x: clip` and all components remain 100% fluid on mobile screens (~390px).
5. **Innate Samplers Protocol**: Keep Gemini samplers inert/default and Claude temperature at `0.0 – 0.8` unless explicitly requested.
