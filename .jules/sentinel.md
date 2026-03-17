## 2024-05-24 - Replace weak PRNG for Cart IDs
**Vulnerability:** Weak PRNG (`Math.random()`) used to generate unique identifiers (Cart IDs).
**Learning:** `Math.random()` is not cryptographically secure and can be predicted, leading to potential collisions or guessing of generated IDs.
**Prevention:** Use `crypto.randomUUID()` to generate secure, collision-resistant UUID (v4) identifiers.
