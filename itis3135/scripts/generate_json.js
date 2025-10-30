document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intro-form");
  if (!form) return;

  // Create the "Generate HTML" button
  const generateHtmlBtn = document.createElement("button");
  generateHtmlBtn.textContent = "Generate JSON";
  generateHtmlBtn.type = "button";
  generateHtmlBtn.id = "generate-html-btn";

  // Insert button to the right of your JSON button
  const jsonButton = document.getElementById("generate-json-btn");
  if (jsonButton && jsonButton.parentNode) {
    jsonButton.parentNode.insertBefore(generateHtmlBtn, jsonButton.nextSibling);
  } else {
    form.appendChild(generateHtmlBtn);
  }

  generateHtmlBtn.addEventListener("click", () => {
    const formData = new FormData(form);
    const data = {};

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, tag => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
        }[tag]));
    }

    // Convert form data to JSON
    formData.forEach((value, key) => {
      if (data[key]) {
        if (!Array.isArray(data[key])) data[key] = [data[key]];
        data[key].push(value);
      } else {
        data[key] = value;
      }
    });

    // Create formatted JSON text
    const jsonText = JSON.stringify(Object.fromEntries(formData.entries()), null, 2);

    // Replace the main content
    const main = document.querySelector("main");
    main.innerHTML = `
      <h2>Introduction HTML & JSON</h2>
      <section>
        <h3>Formatted JSON Output</h3>
        <pre><code class="language-json">${escapeHtml(jsonText)}</code></pre>
      </section>
      <a href="#" id="reset-link">Reset Form</a>
    `;

    // Apply syntax highlighting
    if (typeof hljs !== "undefined") {
      document.querySelectorAll("pre code").forEach(block => hljs.highlightElement(block));
    }

    // Allow resetting
    document.getElementById("reset-link").addEventListener("click", (e) => {
      e.preventDefault();
      location.reload();
    });
  });
});