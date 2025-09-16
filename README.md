# Shopify Theme Workflow Summary


---

## Pre-launch (current phase, before any stores go live)
- All Shopify stores use `default-trimarketplace` as the theme branch.  
- No additional branches should be created during this phase unless discussed and agreed on ahead of time.  

## Post-launch (after stores start going live)
- Create a single `default-trimarketplace-qa` branch based on `default-trimarketplace`.  
- All QA stores will be connected to this QA branch.  
- Develop and test new features in this QA branch.  
- No extra QA branches should be created during this phase unless discussed and agreed on ahead of time.  

## Content & configuration first
- When adding a new feature to an existing store or preparing to launch a new store, apply all required content, media, app configurations, and store settings directly in the store before updating or deploying the theme.  
- This should help ensure store settings remain consistent and prevents theme configuration conflicts.  

## Merging workflow
- Once all required content, media, app configurations, and store settings are in place on production stores, merge QA branch updates into `default-trimarketplace` for deployment to production stores.  

## New store setup
- Add all required content, media, app configurations, and store settings before applying the theme.  
- Confirm `templates/index.json` is present in the new store so the homepage renders correctly.  

## Note
This workflow assumes all stores are set up the same with identical themes, content, settings, configurations, and media. If a one-off difference is required for a specific store, then a dedicated branch can be created to support that store.  

