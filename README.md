# Smart on FHIR Client Portal (v. 0.1.0)


The project was developed with the target to get familiar with FHIR specification. The app generates and shows data from multiple FHIR resources, such as *Practitioner*, *Patient*, *Patient Observations* etc. On the FHIR backend, the app uses **Logica EHR sandbox**, with proper auth mechanism implemented.

## Features
1. Client level Access token-based auth mechanism for Logica server.
2. Implements FHIR specs for the resource collected, such as *Practitioner*, *Patient*, *Patient Observations*.
3. Fall back mechanism to local FHIR server when the remote server authentication/authorization fails. 

## Instructions to Run Locally
1.	Create a developer ID in Logica dev website, create a sandbox, and rgister an app that will be used to perform authorization of the smart app (see details below)
2.	Make sure [Node.js](https://nodejs.org/en/) is installed in your local machine
3.	Clone the Github repo with command: `git clone https://github.com/ehsan-ashik/smart-on-fhir-vue-clientjs.git`
5.	Install all necessary packages with the command `npm install`
6.	Open `.env` file present in the root directory of the source code and populate with **Logica FHIR URL** and **Client ID**, and include URI to local FHIR server if avaibale
8.	Run the code in development mode with command: `npm run serve`

Go to `localhost:8080` to see the app running. 

## Creating Logica Sandbox and Registering App 
1. Go to https://sandbox.logicahealth.org/dashboard and create an account with email and password. 
2. Log in to the account and click on `New Sandbox`. Provide a name and id and select *R4* from the FHIR version dropdown. Then hit `Create`
3. Go to the sandbox and hit the `+` icon to register a new Application.
4. Fill up the form with information shown in the screenshot. Please put the same URI `http://localhost:8080` in the Launch and Redirect URI fields. Also, fill up the scope field as: `online_access openid profile launch fhirUser patient/*.* user/*.*`

Once done, click save to register the application. That is all required for setting up Logical sandbox. Use the Client ID shown in the app page and set as the `VUE_APP_LOGICA_CLIENT_ID` in `.env`. Set the `Secured FHIR Server URL` in the Logica Sandbox settings as the `VUE_APP_LOGICA_URI` in `.env`.


## Additional Resources
1. FHIR standards: https://www.hl7.org/fhir/overview.html
2. Logica OAuth2 Authorization Walk-through: https://logica.atlassian.net/wiki/spaces/HSPC/pages/15171628/OAuth2+Authorization+Walk-through
3. Registering app in Logica sandbox - https://logica.atlassian.net/wiki/spaces/HSPC/pages/62357536/Register+Your+App+in+the+Logica+Sandbox
