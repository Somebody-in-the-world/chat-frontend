# Chat app frontend

## Table of contents

- [Introduction](#introduction)
- [Setting up](#setting-up)
- [Deploying](#deploying)

## Introduction

This project is the frontend of a chat app, it is still in active development

## Setting up

### Environmental variables

To set up, set the environmental variables, you can do this by:

```bash
cp .env.example .env
```

If you are deploying to production, make sure to configure the environmental variables! By default, it assumes that your server is at http://localhost:3000.

### OpenAPI types

This project does not bundle with OpenAPI types and will fail to compile if it's missing. Run:

```bash
OPENAPI_URL=http://[server-url]/openapi.json npm run openapi-generate
```

## Deploying

[First, you need to set up the environmental variables and generate the OpenAPI types.](#setting-up)

Install dependencies:

```bash
npm ci
```

### Serve locally

Run:

```bash
npm run dev
```

### Deploy to production

First, build the code:

```bash
npm run build
```

To preview the built code:

```bash
npm run preview
```

---

This project is licensed under the GNU GPL v3. See the LICENSE file for details.
