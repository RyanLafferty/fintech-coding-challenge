# Limitations

## API

1. CORS is not enabled for this POC

## Firestore

1. Since I am using an emulator for this POC there are no defined Firebase rules for security.

## Tests

If given more time I would have added tests for the routers and controllers using supertest. I would have also added tests for the Transaction Repository. I chose to omit these tests first as I had covered 95% of the codebase using the rest of the tests and these modules and classes are mostly reliant on third party libraries which would have been extensively tested.
