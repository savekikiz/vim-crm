# Builder stage
FROM node:22-alpine AS builder

# Install necessary dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies with cache optimization
RUN yarn install --frozen-lockfile --production=false

RUN yarn add sharp

# Copy source code
COPY . .

# Declare build arguments for Next.js public env vars
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SSO_CLIENT_ID
ARG NEXT_PUBLIC_SSO_REDIRECT_URI
ARG NEXT_PUBLIC_SSO_URL
ARG NEXT_PUBLIC_IS_ENABLED_SSO

# Set environment variables from build args
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SSO_CLIENT_ID=$NEXT_PUBLIC_SSO_CLIENT_ID
ENV NEXT_PUBLIC_SSO_REDIRECT_URI=$NEXT_PUBLIC_SSO_REDIRECT_URI
ENV NEXT_PUBLIC_SSO_URL=$NEXT_PUBLIC_SSO_URL
ENV NEXT_PUBLIC_IS_ENABLED_SSO=$NEXT_PUBLIC_IS_ENABLED_SSO

# Build the application
RUN yarn build

# Runner stage
FROM node:22-alpine AS runner

WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

# Copy the standalone output from builder (includes all dependencies)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy prebuilt static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expose port
EXPOSE 3000

# Set base environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run the server
CMD ["node", "server.js"]