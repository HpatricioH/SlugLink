## GitHub User Authentication Setup

To authenticate users via GitHub in your application, follow these steps:

### Step 1: Create a GitHub OAuth App

1. Navigate to [GitHub Developer Settings](https://github.com/settings/developers).
2. Click on "OAuth Apps" in the left sidebar.
3. Click on the "New OAuth App" button.
4. Fill out the form with the following details:
   - **Application Name:** Enter a name for your OAuth - example slugLink.
   - **Homepage URL:** Enter the URL http://localhost:3000/.
   - **Authorization callback URL:** Enter the URL where GitHub will redirect users after authentication - http://localhost:3000/api/auth/callback/github.
5. Click on the "Register application" button.

### Step 2: Retrieve Client ID and Client Secret

1. Once your OAuth app is created, you will be provided with a **Client ID** and **Client Secret**.
2. Copy this information into your .env file.

   ```env
   GITHUB_CLIENT_ID=<Your-Client-ID>
   GITHUB_CLIENT_SECRET=<Your-Client-Secret>
   ```

Remember to store your Client ID and Client Secret securely and never expose them publicly.
