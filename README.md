# HASLab custom Mattermost slash commands

A set of custom Mattermost slash commands used at HASLab. Both for practical and funny purposes.

Built with [Clouflare's Developer Platform](https://www.cloudflare.com/developer-platform/products/).

- [Workers](https://www.cloudflare.com/developer-platform/products/workers/) for serveless computing and answering to command requests.
- [D1](https://www.cloudflare.com/developer-platform/products/d1/) for data storage.

---

## Local Development

Instructions for local development and testing using [Wrangler](https://developers.cloudflare.com/workers/wrangler/) and [Bruno](https://www.usebruno.com/).

1.  Install dependencies

    ```
    npm install
    ```

2.  Create local DB tables

    ```
    npx wrangler d1 execute mattermost --file=schema.sql
    ```

3.  Start the local development server

    ```
    npx wrangler dev
    ```

4.  Open Bruno's collection at [`bruno`](bruno/) and try any command.
