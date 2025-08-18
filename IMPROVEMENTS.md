# Suggestions for Improvement

Here are some suggestions to improve the CV project:

### 1. Use More Semantic HTML
The current HTML structure is good, but it could be improved by using more semantic tags. This helps with accessibility and SEO.

*   Instead of `<div class="job">`, you could use `<article class="job">`.
*   The main sections like "Expériences Professionnelles" could be wrapped in `<section>` tags, which is already done, but you could also use `<header>` and `<footer>` elements inside these sections where appropriate.

### 2. Accessibility (a11y)
*   **Alt Text:** The `alt` attributes on the images are good. Ensure they are descriptive. For purely decorative images, use `alt=""`.
*   **ARIA Roles:** For complex components, you could add ARIA (Accessible Rich Internet Applications) roles to improve accessibility for screen reader users. For example, `role="navigation"` for the main navigation links.

### 3. CSS Improvements
*   **CSS Variables:** For colors, fonts, and spacing, using CSS custom properties (variables) can make the stylesheet easier to maintain and theme. For example:
    ```css
    :root {
      --primary-color: #2c3e50;
      --secondary-color: #3498db;
      --text-color: #333;
    }

    body {
      color: var(--text-color);
    }

    .sidebar {
      background-color: var(--primary-color);
    }
    ```
*   **Reduce Inline Styles:** There are a few inline styles in the HTML (e.g., for the badges). It's better to move these to the external stylesheet for better separation of concerns and easier maintenance.
*   **Print Stylesheet:** The print stylesheet is a great addition. It could be further improved by removing box shadows and other visual effects that are not needed for print.

### 4. Performance
*   **Image Optimization:** The profile picture is quite large. Compressing images and using modern formats like WebP can significantly reduce page load times.
*   **Minify CSS:** For a production environment, minifying the CSS files would reduce their size and improve loading speed.

### 5. Add a Dark Mode
A popular feature is to add a dark mode toggle. This can be implemented using CSS variables and a little bit of JavaScript to toggle a class on the `body` element.

### 6. Add a Version Control System
The project is not currently under version control. Using Git would be beneficial for tracking changes, collaborating, and managing different versions of the CV.
