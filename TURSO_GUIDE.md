## Setting Up Turso for Local Development

If you're planning to work with this project locally, you'll need to set up Turso, which is a SQLite-compatible database built on libSQL, the Open Contribution fork of SQLite. It enables scaling to hundreds of thousands of databases per organization and supports replication to any location, including your own servers, for microsecond-latency access.

The following steps will guide you through the process of installing and configuring Turso.

### Quickstart

- Install the Turso CLI
- Signup to Turso
- Create your first Turso Database
- Connect to Database Shell

### 1. Install the Turso CLI

We’ll be using the Turso CLI throughout this quickstart to manage databases, create replicas in other regions, and connect to the database shell.

macOS:

```shell
brew install tursodatabase/tap/turso
```

Linux:

```shell
curl -sSfL https://get.tur.so/install.sh | bash
```

Windows (using [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)):

```shell
curl -sSfL https://get.tur.so/install.sh | bash
```

### 2. Signup to Turso

The next command will open your browser to sign in with GitHub:

```shell
turso auth login
```

### 3. Create Database

Now create your first database in a location closest to you with the name slug-link:

```shell
turso db create slug-link
```
