document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intro-form");
  if (!form) return;

  // Create the "Generate HTML" button
  const generateHtmlBtn = document.createElement("button");
  generateHtmlBtn.textContent = "Generate HTML";
  generateHtmlBtn.type = "button";
  generateHtmlBtn.id = "generate-html-btn";

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, tag => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
        }[tag]));
    }

  // Insert the button to the right of the JSON button
  const jsonButton = document.getElementById("generate-json-btn");
  if (jsonButton && jsonButton.parentNode) {
    jsonButton.parentNode.insertBefore(generateHtmlBtn, jsonButton.nextSibling);
  } else {
    form.appendChild(generateHtmlBtn);
  }

  generateHtmlBtn.addEventListener("click", () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Build a simple HTML version of the introduction
    const htmlOutput = `
<section>
  <h2>${data.user_firstname} ${data.user_midname || ""} ${data.user_lastname}</h2>
  <img src="${data.user_image || "default.jpg"}" alt="User Image">
  <p><em>${data.user_pic_cap}</em></p>
  <p>${data.user_personal}</p>
  <ul>
    <li>${data.bullet_1}</li>
    <li>${data.bullet_2}</li>
    <li>${data.bullet_3}</li>
    <li>${data.bullet_4}</li>
  </ul>
  <h3>Courses</h3>
  <ul>
    <label for="c1">Course 1</label>
    <li id="c1">${data.course1}</li>
    <label for="c2">Course 2</label>
    <li id="c2">${data.course2}</li>
    <label for="c3">Course 2</label>
    <li id="c3">${data.course3}</li>
  </ul>
  <blockquote>
    “${data.quote}” — ${data["quote-author"]}
  </blockquote>
  <p>LinkedIn: <a href="${data.linkedin}">${data.linkedin}</a></p>
  <p>GitHub: <a href="${data.github}">${data.github}</a></p>
  <p>GitHub.io: <a href="${data["github-io"]}">${data["github-io"]}</a></p>
  <p>UNCC Webpage: <a href="${data.uncc}">${data.uncc}</a></p>
</section>`;

    // Replace the main content
    const main = document.querySelector("main");
    main.innerHTML = `
      <h2>Introduction HTML</h2>
      <section>
        <h3>Formatted HTML Output</h3>
        <pre><code class="language-html">${escapeHtml(htmlOutput)}</code></pre>
      </section>
      <a href="#" id="reset-link">Reset Form</a>
    `;

    // Highlight syntax
    if (typeof hljs !== "undefined") {
      document.querySelectorAll("pre code").forEach(block => hljs.highlightElement(block));
    }

    // Reset functionality
    document.getElementById("reset-link").addEventListener("click", e => {
      e.preventDefault();
      location.reload();
    });
  });
});
