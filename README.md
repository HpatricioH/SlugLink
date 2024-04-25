<p align="center" style="margin: 25px 0 35px 0">
  <a href="https://sluglink-kappa.vercel.app/" style="text-decoration: none; ">
    <img src="public/logos/slugLink.svg" alt="Slug Link" height="100">
  </a>
</p>

# What is [SlugLink](https://sluglink-kappa.vercel.app/)? 🔗🤔🔗

SlugLink is a free URL shortener and QR code generator web application. SlugLink streamlines the process of creating shortened URLs and generating QR codes with ease.

With SlugLink's intuitive interface, users can quickly input any URL and generate a shortened version, as well as generate QR codes. This makes sharing links more convenient, especially for marketing campaigns, social media, or any situation where concise links are essential.

Built using modern web technologies such as T3 stack and Next.js API serverless functions, SlugLink ensures a smooth user experience while adhering to best practices in web development. Its responsive design guarantees seamless functionality across various devices, whether it's desktops or mobile phones.

Please bear in mind that SlugLink is an open-source project, and we welcome contributions and feedback from the community. If you have any suggestions or ideas for improvement, don't hesitate to join our efforts.

Let's make link sharing and QR code generation easier together with SlugLink!

## Tech Stack

SlugLink is built using the following technologies:

- [T3 Stack](https://create.t3.gg/) - Full-stack, type safe Next.js app
- [Next.js](https://nextjs.org/) - a framework for building server-rendered React applications
- [TypeScript](https://www.typescriptlang.org/) - a typed superset of JavaScript that compiles to plain JavaScript
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs for full-stack application
- [Turso](https://turso.tech/) - SQLite data base
- [Prisma](https://www.prisma.io/) - Open-source ORM
- [NextAuth Js](https://next-auth.js.org/) - an authentication library for Next.js
- [Tailwind CSS](https://tailwindcss.com/) - a utility-first CSS framework
- [Vercel](https://vercel.com/) - a cloud platform for static sites and Serverless Functions

## Table of Contents:

- [Tech Stack](#tech-stack)
- [Local Development Setup](#local-development-setup)
  - [Prerequisites](#0-prerequisites)
  - [Fork and Clone the Repository](#1-fork-and-clone-the-repository)
  - [Navigate to the Repo Directory](#2-navigate-to-the-repo-directory)
  - [Install Dependencies](#3-install-dependencies)
    - [Installing `node`](#installing-node)
    - [Installing `pnpm`](#installing-pnpm)
    - [Setting up your .env](#setting-up-your-env)
    - [Installing Package Dependencies](#installing-package-dependencies)
    - [Turso and Prisma before running the environment](#turso-and-prisma-before-running-the-environment)

## Local Development Setup

SlugLink is fully on your computer and requires each dependency (for example Turso ClI) to be installed in order to start the local development.

### 0. Prerequisites

- [Turso](https://turso.tech/)
- Follow the instructions in the [Turso setup guide](TURSO_GUIDE.md) to set up your Turso database.
- [Google Cloud](https://cloud.google.com/)
- Follow the instructions in the [Github setup guide](GITHUB_SETUP.md) to set up your Google Cloud project.

### 1. Fork and clone the repository

Follow [these steps](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) to create a fork of this repository and then clone it to your local machine.

```shell
git clone https://github.com/<github user>/SlugLink.git
```

### 2. Navigate to the repo directory

After cloning move into the cloned repo:

```shell
cd slug-link
```

### 3. Install dependencies

#### Installing `node`:

If you have node already installed in your computer you can avoid this step. To install `node` [download the installer](https://nodejs.org/en/) from their site. Please download the lates and [LTS version](https://nodejs.org/en).

#### Installing `pnpm`:

`pnpm` is a package manager that is used to install all dependencies needed.

If you would like to read more about `pnpm` you can visit [their documentation](https://pnpm.io/motivation).

The best way to install `pnpm` for this project is by using [Corepack](https://nodejs.org/api/corepack.html), a new feature bundled with Node.

Install pnpm with the following commands (there are more ways to install 'pnpm' if you prefer to use a different method please visit [pnpm's installation page](https://pnpm.io/installation)):

```sh
npm install -g pnpm
```

#### Setting up your .env

Use the following command to create a local `.env` file. Then open the new file (`.env`) to make any changes required in the document.

```shell
cp .env.example .env
```

#### Installing package dependencies

Once you have `node`, `pnpm` installed, please run the following command to install all dependencies:

```shell
pnpm install
```

After running the command above, you should see a `node_modules` folder in your project root. This is where all the dependencies are installed. At this point you can run the project locally using the following command:

#### Turso and Prisma before running the environment

- Follow the [Prisma and Turso guide](PRISMA_TURSO_GUIDE.md) to migrate and create the tables into your created Turso data base. to set up your Turso database.

#### Run the environment

```shell
pnpm dev
```

Once you run this command, a local server is running at http://localhost:3000 any changes that you make to the code will be reflected on the browser automatically.
