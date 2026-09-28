# ============================================================
# docker-qa-e2e
# Playwright + TypeScript + Chromium QA runner image
# ============================================================
FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /app

# Create non-root user (Chromium sandbox requires non-root)
RUN groupadd -r pwuser && useradd -r -g pwuser -G audio,video pwuser \
    && mkdir -p /home/pwuser \
    && chown -R pwuser:pwuser /home/pwuser

# Copy dependency manifests first (layer caching)
COPY --chown=pwuser:pwuser package.json package-lock.json* ./

# Install Node dependencies
RUN npm install

# Copy the rest of the project
COPY --chown=pwuser:pwuser . .

USER pwuser

# Playwright returns non-zero exit code on failure (CI-friendly)
CMD ["npx", "playwright", "test"]