## 2025-03-09 - Unhandled AI JSON Parsing Vulnerability
**Vulnerability:** Unhandled JSON parsing errors from an external AI API caused potential client-side application crashes/Denial of Service.
**Learning:** `JSON.parse` will throw an exception if the input is malformed. If this exception is not caught in a browser-based environment like React, the component rendering cycle fails completely.
**Prevention:** Always wrap `JSON.parse` in a `try...catch` block when processing potentially untrusted or dynamic data from external sources (like LLMs), ensuring a fallback default is provided on failure.
