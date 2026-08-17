# Inference & Sampling Parameters

> **SPECIFICATION**: Mathematical Sampling Models & Sampler Configurations  
> **SCOPE**: Gemini Pro/Flash & Claude Sonnet/Opus Series  
> **TARGET CLIENTS**: SillyTavern, Google AI Studio, Anthropic API, Janitor AI

---

## Sampler Dynamics & Mathematical Formulation

To achieve uncompromised narrative depth without cyclic repetition or hallucination loops, inference generation must balance entropy with probability truncation.

### 1. Temperature & Softmax Scaling

Temperature controls the sharpness of the probability distribution over the model's vocabulary:

$$P(w_i) = \frac{\exp(z_i / T)}{\sum_j \exp(z_j / T)}$$

* $z_i$: Logit score for token $w_i$.
* $T$: Sampling temperature.
* **Low Temperature ($T < 0.60$)**: Flattens creativity, inducing robotic, repetitive dialogue patterns.
* **High Temperature ($T > 1.05$)**: Increases syntactic degradation and erratic formatting.
* **Optimal Roleplay Range**: $T \in [0.85, 0.95]$ for Gemini; $T \in [0.80, 0.90]$ for Claude.

---

### 2. Min-P Sampling Truncation

Min-P dynamically discards tokens whose probability falls below a percentage of the highest-probability token:

$$\text{Keep token } w_i \iff P(w_i) \ge P_{\text{max}} \cdot P_{\text{threshold}}$$

* $P_{\text{max}}$: Probability of the top candidate token.
* $P_{\text{threshold}}$: Scaled percentage cutoff (typically $0.05$ to $0.10$).
* **Advantage over Top-P**: Adapts to confidence. When the model is certain, it preserves focus; when open-ended, it permits wide creative vocabulary.

---

## Master Recommended Sampler Matrix

| Parameter | Gemini 1.5/2.5 Pro | Gemini 2.0 Flash | Claude 3.5 Sonnet | Claude 3.7 Sonnet |
| :--- | :--- | :--- | :--- | :--- |
| **Temperature ($T$)** | `0.90` | `0.85` | `0.85` | `0.88` |
| **Top-P ($\text{Nucleus}$)** | `0.95` | `0.92` | `0.90` | `0.92` |
| **Top-K** | `40` | `40` | `0` (Off) | `0` (Off) |
| **Min-P** | `0.05` | `0.06` | `0.05` | `0.05` |
| **Repetition Penalty** | `1.04` | `1.05` | `1.00` (Neutral) | `1.00` (Neutral) |
| **Presence Penalty** | `0.00` | `0.00` | `0.00` | `0.00` |
| **Max Context Tokens** | `32,768+` | `16,384+` | `16,384+` | `32,768+` |

---

## Context Window & Memory Optimization

1. **System Prompt Placement**: Always slot the system prompt at the top of context (Depth 0) with a secondary reminder injection at Depth 1-2 if context exceeds 24k tokens.
2. **Context Padding Strategy**: Maintain active message logs within 12,000 to 20,000 tokens for optimal needle-in-a-haystack recall of subtle narrative flags.
3. **Macro Substitution Pre-flight**: Ensure all macro strings (`{{user}}`, `{{char}}`, `{{original}}`) are processed by the frontend before sending the API payload.
