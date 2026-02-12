# CV Project Rules & Architecture

This document defines the rules for maintaining and evolving the CV project.

## Architecture: The Dual-CV Strategy

The project maintains two distinct versions of the CV:

1. **cv-florent.html (A4 Official)**:
    - **Persona**: Official application document.
    - **Constraint**: Must ALWAYS fit on a single A4 page when printed.
    - **Content**: Condensed, high-impact, professional.
    - **Rule**: Before any change, check the "Télécharger en PDF" preview.

2. **cv-florent-full.html (Digital Showcase)**:
    - **Persona**: Modern personal portfolio/website.
    - **Constraint**: None on vertical length.
    - **Content**: Detailed job descriptions, technical deep-dives (e.g., PhD specifics, CDTI details).
    - **Design**: Can be more experimental, containing more animations and ultra-modern UI elements.

## Rules for Agents

- **Linkage**: Both versions should share the same core `style.css` where possible, using specific classes for deviations.
- **Content Sync**: When a core fact (e.g., a new job) is updated, it MUST be updated in both versions.
- **A4 Preservation**: Never allow the A4 version to overflow to a second page. If content is too long for A4, move the extra detail to the Full version.
- **Media**: Screen-only responsive styles must be isolated in `responsive.css` to avoid breaking the A4 print layout.
