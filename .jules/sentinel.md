## 2024-05-23 - Firebase API Key Validation fix
**Vulnerability:** Weak configuration loading strategy for Firebase API key relying on a hardcoded placeholder check rather than a structural validation.
**Learning:** Hardcoded placeholder strings are an unreliable way to check configuration variables, as users might use a different placeholder string, leaving the system vulnerable to misconfiguration or initialization errors.
**Prevention:** Always validate configuration values structurally. For example, use `startsWith('AIza')` to validate Google/Firebase API keys.
