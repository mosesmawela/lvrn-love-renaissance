## 2025-03-05 - Replace innerHTML with textContent

 **Vulnerability:** DOM XSS via `innerHTML`. Setting string elements containing potentially sensitive or unsafe values using `innerHTML` exposes the application to Cross-Site Scripting (XSS).
 **Learning:** Replacing `innerHTML` with `textContent` or `innerText` mitigates this risk by ensuring that HTML parsing is avoided and elements are set as text strings.
 **Prevention:** Enforce security by default by using `textContent` for static string assignments in elements.
