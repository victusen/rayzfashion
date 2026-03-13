---
name: Frontend Design
description: Advanced principles for creating distinctive, production-grade frontend interfaces with unique visual identities.
---

# Frontend Design Skill

This skill provides a comprehensive design philosophy and set of instructions for generating high-fidelity, memorable, and production-grade frontend interfaces. It is designed to avoid "AI genericism" and move toward senior-designer-level visual identities.

## Pre-Coding Analysis

Before generating any code, analyze the task across these four dimensions:

1.  **Purpose**: Who is the user, and what is the core utility?
2.  **Tone**: Define a *specific* aesthetic direction (e.g., "Swiss Brutalist," "High-Fashion Editorial," "Neo-Futuristic Neon," "Tactile Skeuomorphism"). Do not be timid.
3.  **Constraints**: Framework (React, Vanilla, etc.), performance requirements, and accessibility standards.
4.  **Differentiation**: What unique visual or interactive element will make this interface stand out?

## Core Design Principles

### 1. Typography
Typography is the most critical element for establishing character.
- **Banned Fonts**: Avoid overly safe, generic fonts: *Inter, Roboto, Arial, System Sans-Serif, Open Sans, Lato, Montserrat (unless specifically requested), and Space Grotesk*.
- **Recommendations**: 
    - Use characterful pairings (e.g., a high-contrast serif for headings with a technical monospaced font for data).
    - Leverage Google Fonts like *Playfair Display, Outfit, Syne, Bricolage Grotesque, or Newsreader*.
    - Use intentional letter-spacing and line-height.

### 2. Color and Theme
Commit to a cohesive and bold palette.
- **Systematic Variable Use**: Define a robust set of CSS variables (`--bg-primary`, `--accent-sharp`, `--text-muted`).
- **Aesthetic Direction**: Draw inspiration from cultural aesthetics (e.g., "Solarized," "Nordic Minimalism," "Cyberpunk Night").
- **Contrast**: Use dominante colors with sharp, high-contrast accents rather than a timid, evenly distributed palette.

### 3. Layout and Spatial Design
Move beyond simple vertical stacks.
- **Grid Systems**: Use CSS Grid for complex, potentially asymmetric layouts.
- **Grid-Breaking**: Use negative margins or absolute positioning to let elements overlap or break the "box" for a more organic feel.
- **Depth**: Utilize layering, subtle shadows (or hard brutalist shadows), and translucency (glassmorphism/acrylic) to create visual hierarchy.

### 4. Professional Finishes
Elevate the UI with subtle textures and effects.
- **Textures**: Apply grain overlays or noise filters to gradients.
- **Gradients**: Use non-linear or multi-stop gradients for a more "designed" look.
- **Borders**: Experiment with hairline borders or variable-width strokes.

### 5. Motion and Interaction
Use animation to reinforce intent, not just for decoration.
- **Micro-interactions**: Hover states should feel reactive and alive (slight scaling, color shifts, or underline animations).
- **CSS-First**: Prioritize pure CSS animations for performance. Use libraries like Framer Motion ONLY if the framework supports it and the complexity warrants it.
- **High-Impact Transitions**: Focus animation on key user actions or page entries.

## Implementation Workflow

1.  **Plan**: State the chosen aesthetic and layout strategy.
2.  **Define**: Create the CSS variables and base typography.
3.  **Structure**: Write semantic HTML.
4.  **Style**: Apply the design tokens and layout logic.
5.  **Polish**: Add the motion effects and professional finishes.
