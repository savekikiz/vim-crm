# Apps CRM

A modern CRM (Customer Relationship Management) application built with Next.js 14, featuring multiple business modules for managing solar installations, electric vehicle services, billing, and overload alerts.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **UI Components:** Radix UI + shadcn/ui
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod
- **Authentication:** NextAuth.js v5
- **Internationalization:** next-intl
- **Charts:** Recharts
- **HTTP Client:** Axios
- **Animation:** Motion (Framer Motion)
- **Tables:** TanStack Table
- **Icons:** Tabler Icons & Lucide React

## 📁 Project Structure

```
apps-crm/
├── docker/                           # Docker configuration
│   ├── Dockerfile                    # Multi-stage Docker build
│   └── docker-compose.yml            # Docker Compose setup
├── public/                           # Static assets
│   ├── background-horizontal.svg
│   ├── background-slope.svg
│   ├── card-folder-desktop.svg
│   └── *.png                         # Application images
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Authentication routes
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── (private)/                # Protected routes
│   │   │   ├── (crm)/                # CRM modules
│   │   │   │   ├── bill-buddy/       # Billing management
│   │   │   │   ├── m-ev/             # Electric vehicle services
│   │   │   │   ├── msolarfit/        # Solar installation module
│   │   │   │   ├── overload-alert/   # Overload monitoring
│   │   │   │   └── power-bi/         # PowerBI dashboards
│   │   │   ├── app-shelf/            # Application shelf
│   │   │   └── layout.tsx
│   │   ├── api/                      # API routes
│   │   │   └── [...nextauth]/        # NextAuth.js endpoints
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── assets/                       # Application assets
│   │   └── fonts/                    # IBM Plex Sans Thai fonts
│   ├── components/                   # Reusable components
│   │   ├── auth/                     # Authentication components
│   │   ├── data-display/             # Display components
│   │   │   ├── chart/                # Chart components
│   │   │   ├── filter-bar/           # Filter components
│   │   │   ├── stepper/              # Stepper components
│   │   │   ├── table/                # Table components
│   │   │   └── value/                # Value display
│   │   ├── form/                     # Form components
│   │   │   ├── form-array/
│   │   │   ├── form-combobox.tsx
│   │   │   ├── form-dropdown.tsx
│   │   │   ├── form-input.tsx
│   │   │   ├── form-password-input.tsx
│   │   │   ├── form-search-button.tsx
│   │   │   ├── form-select.tsx
│   │   │   └── form-switch.tsx
│   │   ├── navigation/               # Navigation components
│   │   │   ├── back-header.tsx
│   │   │   ├── nav-documents.tsx
│   │   │   ├── nav-main.tsx
│   │   │   ├── nav-secondary.tsx
│   │   │   ├── nav-terms.tsx
│   │   │   ├── nav-user.tsx
│   │   │   └── site-header.tsx
│   │   ├── svg/                      # SVG components
│   │   └── ui/                       # shadcn/ui components
│   ├── constants/                    # Application constants
│   │   ├── app-shelf.tsx
│   │   ├── months.ts
│   │   ├── options.ts
│   │   ├── pagination.ts
│   │   ├── regex.ts
│   │   ├── routes.ts
│   │   ├── sidebar.ts
│   │   ├── solar.ts
│   │   └── time.ts
│   ├── containers/                   # Feature containers
│   │   ├── app-shelf/                # App shelf container
│   │   ├── bill-buddy/               # Billing module container
│   │   ├── login/                    # SSO login
│   │   ├── login-local/              # Local login
│   │   ├── m-ev/                     # EV module container
│   │   ├── msolarfit/                # Solar fit module
│   │   ├── msolarfit-detail/         # Solar fit details
│   │   ├── overload/                 # Overload module
│   │   ├── overload-detail/          # Overload details
│   │   └── power-bi/                 # PowerBI container
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-api.ts
│   │   ├── use-initial-query.ts
│   │   ├── use-mobile.ts
│   │   ├── use-navigate.ts
│   │   ├── use-table-opts.ts
│   │   └── use-token.ts
│   ├── i18n/                         # Internationalization
│   │   ├── locales/th/               # Thai translations
│   │   └── request.ts
│   ├── lib/                          # Library utilities
│   │   ├── auth/                     # Authentication utilities
│   │   ├── axios/                    # Axios configuration
│   │   │   ├── client.ts
│   │   │   ├── client-request.ts
│   │   │   ├── server.ts
│   │   │   └── server-request.ts
│   │   ├── qs.ts
│   │   ├── tanstack-query.tsx
│   │   └── utils.ts
│   ├── store/                        # State management
│   │   └── table-store.ts
│   ├── types/                        # TypeScript type definitions
│   │   ├── next-auth.d.ts
│   │   └── tanstack-table.d.ts
│   ├── utils/                        # Utility functions
│   │   ├── address.ts
│   │   ├── number.ts
│   │   ├── object.ts
│   │   ├── page-titles.ts
│   │   └── tariff.ts
│   └── middleware.ts                 # Next.js middleware
├── .env                              # Environment variables
├── .env.example                      # Environment variables template
├── components.json                   # shadcn/ui configuration
├── Makefile                          # Docker build commands
├── next.config.mjs                   # Next.js configuration
├── package.json                      # Dependencies
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.js                # Tailwind CSS configuration
└── tsconfig.json                     # TypeScript configuration
```

## 🎯 Key Features

### Business Modules

1. **Bill Buddy** - Billing and payment management system
2. **M-EV** - Electric Vehicle service management with multi-step forms
3. **mSolarFit** - Solar panel installation and fit analysis
4. **Overload Alert** - Real-time overload monitoring and alerts
5. **Power BI** - Embedded PowerBI dashboards for analytics
6. **App Shelf** - Application launcher and organization

### Technical Features

- ✅ SSO Authentication & Local Login
- ✅ Multi-language support (Thai)
- ✅ Responsive design with mobile support
- ✅ Advanced data tables with filtering, sorting, and pagination
- ✅ Interactive charts and data visualization
- ✅ Multi-step form wizard
- ✅ Drag-and-drop functionality
- ✅ Toast notifications
- ✅ Protected routes with middleware
- ✅ Server and client-side data fetching
- ✅ Dark mode support (via next-themes)

## 🛠️ Installation Guide

### Prerequisites

- Node.js 20+ (22+ recommended for Docker)
- Yarn package manager
- Docker & Docker Compose (for containerized deployment)
- Make (for Docker build commands on Windows)

### Step 1: Install Node.js

1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Choose the LTS version (20.x or higher)
3. Run the installer and follow the prompts
4. Verify installation:
```bash
node --version
npm --version
```

### Step 2: Install Yarn

```bash
# Using npm (comes with Node.js)
npm install -g yarn

# Verify installation
yarn --version
```

### Step 3: Install Make on Windows

Make is required to run the Makefile commands for Docker builds. Choose one of the following methods:

#### Option 1: Using Chocolatey (Recommended)

1. **Install Chocolatey** (if not already installed):
   - Open PowerShell as Administrator
   - Run:
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

2. **Install Make:**
   ```powershell
   choco install make
   ```

3. **Verify installation:**
   ```bash
   make --version
   ```

#### Option 2: Using Git Bash (Already includes Make)

If you have Git for Windows installed, it includes GNU Make in Git Bash:

1. **Install Git for Windows** from [git-scm.com](https://git-scm.com/download/win)
2. During installation, ensure "Git Bash Here" is selected
3. **Open Git Bash** (not CMD or PowerShell)
4. Verify Make is available:
   ```bash
   make --version
   ```

> **Note:** Your current shell is Git Bash (`C:\Program Files\Git\bin\bash.exe`), so Make should already be available!

#### Option 3: Using WSL (Windows Subsystem for Linux)

1. **Enable WSL:**
   ```powershell
   wsl --install
   ```

2. **Install Ubuntu** from Microsoft Store

3. **Install Make in WSL:**
   ```bash
   sudo apt update
   sudo apt install make
   ```

4. Run all commands from within WSL

#### Option 4: Manual Installation

1. Download GNU Make from [ezwinports](https://sourceforge.net/projects/ezwinports/files/)
2. Download `make-4.x-bin.zip` (without guile)
3. Extract to `C:\Program Files\GnuWin32`
4. Add to PATH:
   - Open System Properties → Environment Variables
   - Edit `Path` variable
   - Add `C:\Program Files\GnuWin32\bin`
5. Restart terminal and verify:
   ```bash
   make --version
   ```

### Step 4: Install Docker Desktop (For Containerized Deployment)

1. Download Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/)
2. Run the installer
3. Start Docker Desktop
4. Verify installation:
```bash
docker --version
docker compose version
```

### Step 5: Clone the Repository

```bash
git clone <repository-url>
cd apps-crm
```

### Step 6: Install Dependencies

```bash
yarn install
```

### Step 7: Configure Environment Variables

1. Create a `.env` file in the project root
2. Copy the contents from `.env.example` (if available) or use the template below
3. Update the values with your actual configuration

## 🛠️ Getting Started

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://your-api-url.com

# SSO Configuration
NEXT_PUBLIC_SSO_CLIENT_ID=your-client-id
NEXT_PUBLIC_SSO_REDIRECT_URI=http://localhost:3000/auth/callback
NEXT_PUBLIC_SSO_URL=https://your-sso-url.com
NEXT_PUBLIC_IS_ENABLED_SSO=true

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Docker Configuration (for building)
REGISTRY=your-docker-registry
IMAGE_NAME=frontend-app
VERSION=latest
```

> **Important:** `NEXT_PUBLIC_*` variables are embedded at build time and will be included in the client bundle.

### Development Mode

1. **Install dependencies:**
```bash
yarn install
```

2. **Run the development server:**
```bash
yarn dev
```

3. **Open your browser:**
```
http://localhost:3000
```

The application will automatically reload when you make changes.

### Production Build (Local)

```bash
# Build the application
yarn build

# Start production server
yarn start
```

## 🐳 Docker Deployment

### Build and Run with Docker Compose

#### Using Make (Recommended)

```bash
# Build the Docker image
make build

# Start the container
make up

# Build and push to registry
make build
make push
```

#### Without Make (Alternative for Windows)

If you cannot install Make, you can run the Docker commands directly:

```bash
# Build the Docker image
docker compose --env-file .env -f docker/docker-compose.yml build

# Start containers in detached mode
docker compose --env-file .env -f docker/docker-compose.yml up -d

# View logs
docker compose -f docker/docker-compose.yml logs -f

# Stop containers
docker compose -f docker/docker-compose.yml down
```

#### With Custom Version and Registry

```bash
# Using Make
VERSION=1.0.0 REGISTRY=myregistry IMAGE_NAME=frontend-app make build
VERSION=1.0.0 REGISTRY=myregistry IMAGE_NAME=frontend-app make push

# Without Make (PowerShell)
$env:VERSION="1.0.0"; $env:REGISTRY="myregistry"; $env:IMAGE_NAME="frontend-app"; docker compose --env-file .env -f docker/docker-compose.yml build

# Without Make (Bash/Git Bash)
VERSION=1.0.0 REGISTRY=myregistry IMAGE_NAME=frontend-app docker compose --env-file .env -f docker/docker-compose.yml build
```

The Docker image uses:
- **Multi-stage build** for optimal image size
- **Node 22 Alpine** for minimal footprint
- **Standalone output** from Next.js
- **Non-root user** for security
- **Build-time environment variables** for `NEXT_PUBLIC_*` vars

## 📦 Available Scripts

### Development Commands

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server with Turbopack |
| `yarn build` | Build production application |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |

### Docker Commands (with Make)

| Command | Description |
|---------|-------------|
| `make build` | Build Docker image |
| `make push` | Push Docker image to registry |
| `make up` | Start Docker containers |

### Docker Commands (without Make - for Windows)

| Command | Description |
|---------|-------------|
| `docker compose --env-file .env -f docker/docker-compose.yml build` | Build Docker image |
| `docker compose --env-file .env -f docker/docker-compose.yml up -d` | Start containers |
| `docker compose -f docker/docker-compose.yml down` | Stop containers |
| `docker compose -f docker/docker-compose.yml logs -f` | View logs |
| `docker compose -f docker/docker-compose.yml ps` | List containers |

## 🪟 Quick Start for Windows Users

If you're on Windows and want to get started quickly:

1. **Install Node.js and Yarn:**
```bash
# Download Node.js from nodejs.org, then:
npm install -g yarn
```

2. **For Development (No Docker needed):**
```bash
# Clone the project
git clone <repo-url>
cd apps-crm

# Install dependencies
yarn install

# Create .env file with your configuration

# Start development server
yarn dev
```

3. **For Docker Deployment:**

   **Option A: With Make (using Git Bash)**
   ```bash
   # You already have Git Bash installed!
   # Just run these commands in Git Bash:
   make build
   make up
   ```

   **Option B: Without Make (using PowerShell/CMD)**
   ```bash
   docker compose --env-file .env -f docker/docker-compose.yml build
   docker compose --env-file .env -f docker/docker-compose.yml up -d
   ```

4. **Access the application:**
   - Open browser: http://localhost:3000

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components built on top of Radix UI. All UI components are located in `src/components/ui/` and can be customized via `components.json`.

### Available Components

- Forms: Input, Select, Checkbox, Radio, Switch, Textarea, Date Picker
- Display: Table, Card, Badge, Avatar, Accordion, Tabs
- Feedback: Alert, Dialog, Toast (Sonner), Progress
- Navigation: Breadcrumb, Pagination, Sidebar, Navigation Menu
- Overlays: Dialog, Sheet, Dropdown, Popover, Tooltip
- Charts: Line, Bar, Area, Pie (via Recharts)

## 🔒 Authentication

The application supports two authentication methods:

1. **SSO (Single Sign-On)** - Configured via environment variables
2. **Local Authentication** - Traditional username/password

Authentication is handled by NextAuth.js v5 with middleware protection for private routes.

## 🌐 Internationalization

Currently supports Thai language (`th`) with next-intl. Translation files are located in `src/i18n/locales/th/`.

## 📝 Code Quality

- **ESLint** - Code linting with Next.js, React Hooks, and Tailwind plugins
- **Prettier** - Code formatting with Tailwind class sorting
- **TypeScript** - Strong typing throughout the application
- **Husky** - Git hooks for pre-commit checks

## 📚 Additional Documentation

- `BUILD_GUIDE.md` - Detailed build instructions
- `ENV_SETUP.md` - Environment setup guide
- `CLAUDE.md` - AI assistant guidelines

## 🔧 Troubleshooting

### Make Command Issues on Windows

**Problem:** `make: command not found` or `'make' is not recognized`

**Solutions:**

1. **Verify Make is installed:**
   ```bash
   make --version
   ```

2. **If using Git Bash:**
   - Make sure you're running commands in **Git Bash**, not CMD or PowerShell
   - Check if Make is available: `which make`
   - If not found, reinstall Git for Windows with default options

3. **If using Chocolatey:**
   - Restart your terminal after installation
   - Check PATH: `echo $PATH` (Git Bash) or `$env:PATH` (PowerShell)
   - Reinstall if needed: `choco uninstall make && choco install make`

4. **Alternative: Use Docker commands directly**
   - See "Without Make" section in Docker Deployment above
   - Run the full docker compose commands instead

### Docker Build Issues

**Problem:** Environment variables not loading in Next.js

**Solution:**
- Ensure `.env` file exists in project root
- Rebuild with `--no-cache`: `docker compose -f docker/docker-compose.yml build --no-cache`
- Verify `NEXT_PUBLIC_*` variables are set in `.env`
- Check that `args` section in `docker-compose.yml` matches your variables

**Problem:** `docker: command not found`

**Solution:**
- Ensure Docker Desktop is running
- Restart Docker Desktop
- Add Docker to PATH if needed

### Port Already in Use

**Problem:** `Port 3000 is already allocated`

**Solution:**
```bash
# Find and kill process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
ports:
  - 3001:3000
```

### Node Modules Issues

**Problem:** Dependencies not installing correctly

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn cache clean
yarn install
```

### WSL-Specific Issues

**Problem:** File permission errors in WSL

**Solution:**
```bash
# Fix permissions
chmod -R 755 .
```

**Problem:** WSL2 Docker performance

**Solution:**
- Ensure project is in WSL filesystem (not /mnt/c/)
- Clone repo to `~/projects/` instead of Windows drives

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for all new files
3. Write descriptive commit messages
4. Ensure all ESLint rules pass
5. Test in both development and production modes

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using Next.js 14**
