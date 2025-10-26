document.addEventListener("DOMContentLoaded", () => {
  // small helpers to avoid injecting raw HTML
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, "&quot;");
  }

    const formElement = document.getElementById("intro-form");
  const clearButton = document.getElementById("clear-btn");
  const inputElements = Array.from(document.querySelectorAll("form input"));
  // find the courses section safely
  const allSections = Array.from(document.querySelectorAll("section"));
  const courseSection = allSections.length >= 2 ? allSections[1] : allSections[0];

  // Prevent default form submission
  formElement.addEventListener("submit", (e) => e.preventDefault());

  // Prevent submission without required info
  function validateForm() {
    const requiredInputs = inputElements.filter(i => i.required);
    for (const input of requiredInputs) {
      if (!input.value.trim()) {
        const label = input.previousElementSibling ? input.previousElementSibling.textContent : input.name;
        alert(`Please fill out: ${label}`);
        return false;
      }
    }
    return true;
  }

  // Clear all form fields
  clearButton.addEventListener("click", () => {
    inputElements.forEach((input) => (input.value = ""));
    const previewEl = document.getElementById("preview");
    if (previewEl) previewEl.remove();
  });

  // Reset form to default state (restore default image if present)
  formElement.addEventListener("reset", () => {
    const preview = document.getElementById("preview");
    if (preview) preview.src = "images/james-at-uncc-next-to-tree.jpg";
  });

  // Add dynamic course fields
  const addCourseBtn = document.createElement("button");
  addCourseBtn.textContent = "Add Course";
  addCourseBtn.type = "button";
  courseSection.appendChild(addCourseBtn);

  addCourseBtn.addEventListener("click", () => {
    const newDiv = document.createElement("div");
    newDiv.className = "course-item";

    const newLabel = document.createElement("label");
    newLabel.textContent = "Additional Course:";

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "extra_course";
    newInput.placeholder = "Enter new course info";
    newInput.required = true;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.type = "button";
    delBtn.addEventListener("click", () => newDiv.remove());

    newDiv.appendChild(newLabel);
    newDiv.appendChild(document.createElement("br"));
    newDiv.appendChild(newInput);
    newDiv.appendChild(delBtn);
    newDiv.appendChild(document.createElement("br"));
    newDiv.appendChild(document.createElement("br"));

    courseSection.appendChild(newDiv);
  });

  // Image upload preview (create preview element if not present)
  const imageInput = document.getElementById("user_image");
  if (imageInput) {
    let preview = document.getElementById("preview");
    if (!preview) {
      preview = document.createElement("img");
      preview.id = "preview";
      preview.src = "images/james-at-uncc-next-to-tree.jpg";
      preview.width = 200;
      imageInput.insertAdjacentElement("afterend", preview);
    }

    imageInput.addEventListener("change", () => {
      const file = imageInput.files && imageInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function () { preview.src = reader.result; };
        reader.readAsDataURL(file);
      }
    });
  }

  // Replace form content with generated intro page on submit-button click
  const submitBtn = formElement.querySelector("button[type='submit']");
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      if (!validateForm()) return;

      const formData = new FormData(formElement);
      let outputHTML = `
        <h2>${escapeHtml(formData.get("user_firstname") || "")} ${escapeHtml(formData.get("user_midname") || "")} ${escapeHtml(formData.get("user_lastname") || "")}</h2>
        <h3>${escapeHtml(formData.get("user_mas_adj") || "")} ${escapeHtml(formData.get("user_mas_ani") || "")}</h3>
      `;

      const previewEl = document.getElementById("preview");
      outputHTML += `<img src="${previewEl ? previewEl.src : "images/james-at-uncc-next-to-tree.jpg"}" width="200">`;
      outputHTML += `<p><em>${escapeHtml(formData.get("user_pic_cap") || "")}</em></p>`;
      outputHTML += `<p>${escapeHtml(formData.get("user_personal") || "")}</p>`;

      outputHTML += "<ul>";
      outputHTML += `<li>${escapeHtml(formData.get("bullet_1") || "")}</li>`;
      outputHTML += `<li>${escapeHtml(formData.get("bullet_2") || "")}</li>`;
      outputHTML += `<li>${escapeHtml(formData.get("bullet_3") || "")}</li>`;
      outputHTML += `<li>${escapeHtml(formData.get("bullet_4") || "")}</li>`;
      outputHTML += "</ul>";

      outputHTML += "<h3>Courses</h3><ul>";
      for (const [key, value] of formData.entries()) {
        if (key.startsWith("course") || key === "extra_course") {
          outputHTML += `<li>${escapeHtml(value)}</li>`;
        }
      }
      outputHTML += "</ul>";

      outputHTML += `
        <blockquote>"${escapeHtml(formData.get("quote") || "")}" — ${escapeHtml(formData.get("quote-author") || "")}</blockquote>
        <p><strong>Funny Thing:</strong> ${escapeHtml(formData.get("funny") || "N/A")}</p>
        <p><strong>Something to Share:</strong> ${escapeHtml(formData.get("share") || "N/A")}</p>
        <h3>Links</h3>
        <ul>
          <li><a href="${escapeAttr(formData.get("linkedin") || "#")}" target="_blank">LinkedIn</a></li>
          <li><a href="${escapeAttr(formData.get("github") || "#")}" target="_blank">GitHub</a></li>
          <li><a href="${escapeAttr(formData.get("github-io") || "#")}" target="_blank">GitHub.io</a></li>
          <li><a href="${escapeAttr(formData.get("itis") || "#")}" target="_blank">ITIS3135 Page</a></li>
          <li><a href="${escapeAttr(formData.get("uncc") || "#")}" target="_blank">UNCC Webpage</a></li>
        </ul>
        <hr>
        <a href="#" id="reset-link">Reset Form</a>
      `;

      document.querySelector("main").innerHTML = outputHTML;

      const resetLink = document.getElementById("reset-link");
      if (resetLink) {
        resetLink.addEventListener("click", (e) => {
          e.preventDefault();
          location.reload();
        });
      }
    });
  }
});