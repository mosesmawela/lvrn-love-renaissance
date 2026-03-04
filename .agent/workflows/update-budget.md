---
description: Update budget breakdown when adding paid services
---

# Update Budget Breakdown Workflow

This workflow should be executed whenever new services, APIs, or dependencies are added to the LVRN site that may require payment.

## When to Update

Update the budget breakdown document when:

- Adding new API integrations (e.g., payment processors, email services, SMS, etc.)
- Adding new third-party services (e.g., analytics, monitoring, CDN)
- Upgrading hosting or infrastructure requirements
- Adding new npm packages that have paid tiers or API requirements
- Implementing features that require external services (e.g., video streaming, image processing)
- Adding authentication providers beyond Supabase
- Implementing real-time features or WebSocket services

## Steps to Update

1. **Identify New Services**
   - Review recent code changes for new API integrations
   - Check `package.json` for new dependencies with paid tiers
   - Review environment variables for new API keys

2. **Research Pricing**
   - Visit the service's pricing page
   - Document free tier limits
   - Document paid tier pricing
   - Note any usage-based costs

3. **Update Budget Document**
   - Open: `C:\Users\Moses\.gemini\antigravity\brain\953f4c6b-e6c4-4a60-8727-dd15553ee389\budget_breakdown.md`
   - Add new service section with pricing table
   - Update "Total Estimated Monthly Cost Range" in Executive Summary
   - Update all three budget scenarios (Development, Production Small, Production High Traffic)
   - Add service to "Immediate Action Items" if setup is required
   - Update environment variables section if new keys are needed

4. **Verify Completeness**
   - Ensure all pricing tiers are documented
   - Include links to official pricing pages
   - Add recommendations for which tier to use
   - Update the checklist at the end of the document

## Common Services to Watch For

- **Payment Processing:** Stripe, PayPal, Square
- **Email Services:** SendGrid, Mailgun, Resend, Postmark
- **SMS/Phone:** Twilio, Vonage
- **Media Processing:** Cloudinary, Imgix, Mux
- **Search:** Algolia, Elasticsearch
- **Maps:** Google Maps API, Mapbox
- **Authentication:** Auth0, Clerk (beyond Supabase)
- **Analytics:** Mixpanel, Amplitude (beyond Firebase)
- **Error Tracking:** Sentry, Rollbar, Bugsnag
- **Monitoring:** Datadog, New Relic
- **CDN:** Cloudflare (paid tiers), Fastly
- **Database:** MongoDB Atlas, PlanetScale (beyond Supabase)
- **Storage:** AWS S3, Backblaze B2
- **Video:** Vimeo, Wistia, Mux

## Template for New Service Entry

```markdown
### X️⃣ **[Service Name]** ([Feature Description])

**Current Usage:** [Brief description of how it's used]

#### **Pricing Tiers:**

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0/month | • [Feature 1]<br>• [Feature 2]<br>• [Limits] |
| **Paid** | $X/month | • [Feature 1]<br>• [Feature 2]<br>• [Limits] |

#### **Estimated Monthly Cost:**
- **Low usage:** ~$X/month
- **Medium usage:** ~$X/month
- **High usage:** ~$X/month

#### **Recommendation:**
[Which tier to start with and when to upgrade]

**Required Environment Variables:**
```

VITE_SERVICE_API_KEY=your-api-key

```

**Get API Key:** [Link to service signup/dashboard]
```

## Automation Note

This workflow is tracked manually. Always review the budget breakdown after:

- Merging PRs that add new dependencies
- Implementing new features with external services
- Client requests for new integrations
