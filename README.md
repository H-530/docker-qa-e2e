# docker-qa-e2e

Professional Docker image for automated QA testing with Playwright, TypeScript, Chromium, E2E + API tests, HTML reports and environment-specific execution via `BASE_URL`.

## Build

```bash
docker build -t docker-qa-e2e:1.0 .
```

## Run against any environment

```bash
docker run --rm \
  -e BASE_URL=https://mi-aplicacion-qa.com \
  docker-qa-e2e:1.0
```

Change `BASE_URL` for `dev`, `qa` or `staging`. The container exits with a non-zero code when any test fails (CI-ready).

## Extract the HTML report

```bash
docker run --rm \
  -e BASE_URL=https://mi-aplicacion-qa.com \
  -v $(pwd)/playwright-report:/app/playwright-report \
  -v $(pwd)/test-results:/app/test-results \
  docker-qa-e2e:1.0

npx playwright show-report ./playwright-report
```

## Run locally without Docker

```bash
npm install
npx playwright install chromium
cp .env.example .env
npm test
```

## Publish to a registry

### Docker Hub

```bash
docker login
docker tag docker-qa-e2e:1.0 h530code/docker-qa-e2e:1.0
docker tag docker-qa-e2e:1.0 h530code/docker-qa-e2e:latest
docker push h530code/docker-qa-e2e:1.0
docker push h530code/docker-qa-e2e:latest
```

### GitHub Container Registry

```bash
echo TU_TOKEN | docker login ghcr.io -u TU_USUARIO_GITHUB --password-stdin
docker tag docker-qa-e2e:1.0 ghcr.io/h530code/docker-qa-e2e:1.0
docker tag docker-qa-e2e:1.0 ghcr.io/h530code/docker-qa-e2e:latest
docker push ghcr.io/h530code/docker-qa-e2e:1.0
docker push ghcr.io/h530code/docker-qa-e2e:latest
```

### Installation

1. **Clone repository** 📥
   ```bash
   git clone https://github.com/H-530/docker-qa-e2e.git
   cd docker-qa-e2e
   ```

## Security

- Runs as non-root user `pwuser`
- No secrets baked into the image
- `.env` excluded from build context