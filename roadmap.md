## Phone-screen review
- [x] Review public and authenticated screens at phone widths.
- [x] Fix clipped text, wizard controls, assistant sizing, and calendar usability.
- [x] Recheck public and authenticated phone layouts, mobile navigation, and assistant; run the routing regression test.
## Full workflow audit
- [x] Test quote → lead → qualify → quote → booking → follow-up → completion end to end.
- [x] Fix follow-up scheduling, sent-quote side effects, quote defaults, completion target, sitemap.

## Booking: multiple services + add-ons
- [x] Customers can pick several services and optional add-ons; price and time add up
- [x] Availability and booking checks use the combined visit length
- [ ] Public quote/booking saving — blocked: code expects a business-ownership database change (0002/0003) that has not been applied, plus a public business setting
