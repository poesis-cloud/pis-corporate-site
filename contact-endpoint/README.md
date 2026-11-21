# Contact form receiver

The site is static (Astro on GitHub Pages): it cannot receive a form by itself. This folder holds
what is needed to receive one, and the contract any receiver must honour.

## State on 2026-11-21

| | |
| --- | --- |
| Form, validation, loading, success and failure states | Implemented in `src/components/ContactForm.astro` and `src/scripts/contact-form.ts` |
| Reference receiver | Implemented in `handler.mjs`, tested in `scripts/contact-endpoint.test.mjs` |
| End-to-end test on this machine | Passed against `dev-server.mjs`, a local test double that writes each request to a file |
| A receiver reachable from the internet | **Not configured.** Poesis has no form service, serverless environment or mail API set up for the site |
| Real reception at `partner@poesis.cloud` | **Not verified.** The domain's mail is routed to Microsoft 365 (MX record); whether that mailbox exists and is read was not tested |

Until a receiver is configured, the published form prepares an email in the visitor's own mail
app and says so. It never displays a confirmation it did not receive.

## Contract

```text
POST <endpoint>
Origin: https://poesis.cloud
Content-Type: application/json
Accept: application/json

{ "name": "...", "email": "...", "company": "...", "goal": "...", "message": "...",
  "source": "home", "elapsedMs": 8400, "_gotcha": "" }
```

| Reply | Meaning | What the visitor sees |
| --- | --- | --- |
| `200` `{ "ok": true }` | The request was handed to Poesis | "Your request has reached Poesis." |
| `422` `{ "ok": false, "errors": { "email": "invalid" } }` | A field was refused | The field is marked; nothing was sent |
| `429` | Too many requests from one client | Asked to wait, offered the email address |
| anything else, or no reply within 20 s | Nothing was delivered | "Your request was not sent", with a link to send it by email |

`name`, `email` and `goal` are required. Bounds are in `LIMITS` (`handler.mjs`) and are the same
as the `maxlength` of the form. `_gotcha` is a field hidden from people; `elapsedMs` is the time
the form stayed open. A filled `_gotcha` or a submission faster than 2.5 s is refused with `422`,
not silently accepted: a silent acceptance would tell a real visitor "sent" for a request that
went nowhere.

## Two ways to provide a receiver

Neither was chosen: both need a decision and an account that only Poesis can provide.

1. **Deploy `handler.mjs`.** It is written against web-standard `Request` and `Response`, has no
   dependency and holds no secret. Its host gives it three things: the list of allowed origins,
   a `clientKey(request)` function returning the client's address as the platform reports it
   (never a header the client can set), and a `deliver(message)` function that hands the
   request to Poesis and throws if it could not. Since the domain's mail is on Microsoft 365, sending through that tenant keeps the data
   with a processor Poesis already uses. The `deliver` function is deliberately not written
   here: it depends on the mail API chosen and could not be tested without its credentials.
2. **Use a hosted form service** whose JSON API answers `{ "ok": true }` on success. The page
   needs no change. This adds a processor of personal data, to be named in the privacy policy.

Whatever the choice, keep credentials on the receiver, restrict it to the site's origin, and add
the platform's own rate limiting: the one in `handler.mjs` is per instance and best effort. The
hidden field and the timer stop casual robots only: both values come from the client, and the
origin check binds browsers, not scripts. If abuse appears, add a challenge on the platform side.

## Switching the site to a receiver

Two public build variables, both required together (the build fails on one without the other):

```bash
PUBLIC_CONTACT_ENDPOINT=https://<receiver>/contact
PUBLIC_CONTACT_PROCESSOR="<name of the service operating the receiver>"
```

With them set, the form posts to the endpoint, shows the confirmation only on `ok: true`, and
the privacy policy names the processor. In `.github/workflows/deploy.yaml`, pass them to the
build step from repository variables. Before going live: send a real request from the deployed
preview and check that it arrives at `partner@poesis.cloud`, including in the junk folder.

## Test it locally

```bash
node contact-endpoint/dev-server.mjs                      # http://127.0.0.1:4601/contact
PUBLIC_CONTACT_ENDPOINT=http://127.0.0.1:4601/contact \
PUBLIC_CONTACT_PROCESSOR="local test receiver" npm run build
npm run preview                                           # http://127.0.0.1:4321/contact/
```

Delivered requests appear in `contact-endpoint/outbox/`. Start the server with
`CONTACT_DELIVERY=fail` to see the failure state. Rebuild without the two variables afterwards:
a build made with a local endpoint must never be deployed.
