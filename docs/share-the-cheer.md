# Share the Cheer administration

The `/share-the-cheer` nomination and partner forms use the existing CRM website integration. Configure `CRM_INTEGRATION_URL`, `CRM_INTEGRATION_KEY`, and `TURNSTILE_SECRET` in the website deployment. Use the Chestnut & Cheer company integration key.

In the CRM, review new leads with sources `share-the-cheer-nomination` and `share-the-cheer-partner` in the website leads inbox or Leads view. Each arrives with `reviewStatus: pending`; an offer is not confirmed merely because it was submitted. Nomination details stay in the CRM. Staff emails contain a link and minimal contact details.

For office email notifications and submitter acknowledgments, configure the Chestnut & Cheer CRM company support email, enable new lead notifications, and configure the CRM email provider. The website shows success after the CRM has stored the submission; email delivery happens asynchronously in the CRM.

Update the annual program in `lib/share-the-cheer.ts`: edit `nominationOpens`, `nominationCloses`, and `selectionContactBy` (ISO dates); adjust the `needs` statuses (`Needed`, `Partially committed`, `Confirmed`); and add an item to `recaps` after the season. Only add approved photos and stories. The `selectedFamilyConsentChoices` list is for a separate, private follow-up with selected families, not the initial nomination form.
