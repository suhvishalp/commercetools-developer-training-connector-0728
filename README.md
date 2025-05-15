<p align="center">
  <a href="https://commercetools.com/">
    <img alt="commercetools logo" src="https://unpkg.com/@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.png">
  </a></br>
  <b>Connect Application Starter Template for Developer Training</b>
</p>

# Connector Overview

This connector includes three applications: `customer-number-generator-app`, `email-verification-sender-app`, and `email-verification-receiver-app`. Below is an overview and the configuration options for each app.

## Applications

### 1. Customer Number Generator App

**Type:** Service App  
**Function:** Assigns a unique customer number when a new customer account is created. It includes an API Extension.

### 2. Email Verification Sender App

**Type:** Event App  
**Function:** Generates a new verification token after the customer account is created. It uses a Subscription to get notified.

### 3. Email Verification Receiver App

**Type:** Service App  
**Function:** Verifies the token after the customer opens a link embedded in an email containing the verification token.

## Configuration Options

There are no configuration options required to run applications in this connector.

## Getting Started

Make sure you have the copy of the source code on your local machine. Use GitHub to fork the project to your account. While creating the fork, ensure the repo is public. Otherwise you need to allow the `connect-mu` to access your repo. Then clone the repo onto your machine. There should be a folder created on your machine now. Go into that folder, it should contain 3 application folders.

### Postman Collection API Client

Make sure the API client for Postman has **at least** the following scopes:

- manage_customers
- manage_api_clients
- manage_connectors
- manage_connectors_deployments

### Developing the first application: customer-number-generator-app

1. cd into `customer-number-generator-app` and install the dependencies

```bash
cd customer-number-generator-app
yarn
```

2. Build the application

```bash
yarn build
```

3. Configure the `.env` file

Before we can run this application locally we need client credentials in the `.env` file. Therefore first rename `.env.example` file to `.env`

```bash
mv .env.example .env
```

Create an API Client in Merchant Center for your Composable Commerce project under `Settings->Developer Settings` section. This can be an admin client, i.e has all the permissions. At least you need the following scopes:

- manage_customers
- manage_extensions
- manage_subscriptions
- manage_key_value_documents

Copy those values into your `.env` file. So at the end, your `.env` file should have the following environment variables set.

```bash
CTP_CLIENT_ID=
CTP_CLIENT_SECRET=
CTP_PROJECT_KEY=
CTP_SCOPES=
CTP_AUTH_URL=
CTP_API_URL=
```

4. Run the application

Now, run the application

```bash
yarn start:dev
```

5. Test using the Postman Collection

To test this application locally, use the Postman collection provided.

6. Stop the application

Since every application is running on port 8080, we should stop this server before we can test the others. So please stop the server from the command line by pressing `CTRL + C`.

### Developing the second application: email-verification-sender-app

1. cd into `email-verification-sender-app` and install the dependencies

```bash
cd email-verification-sender-app
yarn
```

2. Build the application

```bash
yarn build
```

3. Configure the `.env` file

Before we can run this application locally we need client credentials in the `.env` file. Therefore first rename `.env.example` file to `.env`

```bash
mv .env.example .env
```

You can reuse the client credentials from the previous step.
Copy those values into your `.env` file. So at the end, your `.env` file should have the following environment variables set.

```bash
CTP_CLIENT_ID=
CTP_CLIENT_SECRET=
CTP_PROJECT_KEY=
CTP_SCOPES=
CTP_AUTH_URL=
CTP_API_URL=
```

4. Run the application

Now, run the application

```bash
yarn start:dev
```

5. Test using the Postman Collection

To test this application locally, use the Postman collection provided.
When testing this application, there will be a token generated and logged to the `console`. Please copy this token value for later use.

6. Stop the application

Since every application is running on port 8080, we should stop this server before we can test the others. So please stop the server from the command line by pressing `CTRL + C`.

### Developing the third application: email-verification-receiver-app

1. cd into `email-verification-receiver-app` and install the dependencies

```bash
cd email-verification-receiver-app
yarn
```

2. Build the application

```bash
yarn build
```

3. Configure the `.env` file

Before we can run this application locally we need client credentials in the `.env` file. Therefore first rename `.env.example` file to `.env`

```bash
mv .env.example .env
```

You can reuse the client credentials from the previous step.
Copy those values into your `.env` file. So at the end, your `.env` file should have the following environment variables set.

```bash
CTP_CLIENT_ID=
CTP_CLIENT_SECRET=
CTP_PROJECT_KEY=
CTP_SCOPES=
CTP_AUTH_URL=
CTP_API_URL=
```

4. Run the application

Now, run the application

```bash
yarn start:dev
```

5. Test using the Postman Collection

To test this application locally, use the Postman collection provided. When testing this application, paste the `token` value you copied in an earlier step into Postman script.

6. Stop the application

Since every application is running on port 8080, we should stop this server before we can test the others. So please stop the server from the command line by pressing `CTRL + C`.

## Deployment

Now that you have locally tested your connect applications successfully, it is time to deploy them onto your `Composable Commerce` project. For that please commit your changes and push them to your GitHub repo.

Once you have updated the GitHub repo for your project, create a release tag such as `v0.0.1` and provide the following values in the **Postman Collection Variables** section before using the Postman collection to deploy your connector.

| Variable Name        | Current Value                                    |
| -------------------- | ------------------------------------------------ |
| connector-name       | &lt;a name containing your initials&gt;          |
| connector-staged-key | &lt;unique key for your connector&gt;            |
| repo-url             | HTTPS or SSH GitHub URL of the GitHub repository |
| repo-tag             | v0.0.1                                           |
| creator-email        | &lt;your email address&gt;                       |
| deployement-key      | &lt;unique key for your deployment&gt;           |

## Clean Up

Once you have tested your installation, it is time to undeploy the installation. Please run the scripts in the **Clean Up** section of your Postman Collection.
