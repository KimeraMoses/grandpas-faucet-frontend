# Project Details

The application is built in Reactjs, with React Router v6, Redux and material icons

## Client's Requirements

The tasks are as follows:

1. Responsive and cross-browser page background and footer
2. Login by Button to connect to Metamask Wallet via Polygon(matic.js) library
3. OTP form and verification if member
4. Redirection link to https://whiteboardcrypto.com/ after login if not a member
5. FAQs accordion
6. Localization (English only)
7. Form

- Amount Input field + Captcha
- "Select with dummy data (will be loaded from DB)
  Options: MATIC, FTM, ETH, AVAX, ONE, ETH, NEAR, CELO, BNB, FTM"
- Request button disabled till wallet address/IP is AJAX-verified from backend as not blacklisted with valid amount

8. Transaction Status / Blacklisted user components
9. Display last 5 successful transactions below input section just before FAQ accordion(updated every second).
10. Connect frontend to backend
11. Testing and Debugging
12. Documentation (Readme)

After the first design, other requirements recieved were
Also please rename the routes:

- otp-confirm to confirm-otp
- whiteboard to sign-up
- meta-mask to connect-metamask
  Also remove the Captcha from the confirm page as it is only accessible to logged in users so they must have verified the OTP.
  Lastly, please redirect all unknown pages to the sign-in page.
  Remember to create a base module for API connections to the backend that will get credentials from a .env file.
  It could be of the form
  apiRequest(method, url, payload) {
  try {
  // adios, request, fetch or anything you use here.
  }
  catch(error){
  // format general errors from API here for localization
  }
  }

# Configuring the Recaptcha

## \_Creating an account for the required domain

    Before starting the project, please visit google recaptcha website [here](https://www.google.com/recaptcha/admin/create) to configure the recaptcha functionality with your new domain.
    The label can be anything related to the domain eg. grandpa-faucet
    For the reCAPTCHA type, select v2 and check "I'm not a robot" Checkbox option respectively
    Then enter the list of the domain you want configured e.g grandpasfaucet.com
    Accept the recaptcha terms and conditions
    Press the submit button to configure domains
#### Demo:
![](./src/assets/images/recaptcha.PNG?raw=true "demo1")

## \_Copying the secret key and sitekey values
    After submitting, twoo keys will be generated and displayed, copy both the siteKey and the secretKey

## \_Changing the Key values on both frontend and backend
    In the frontend code, change the value of the REACT_APP_SITE_KEY in the env file to the new one generated and for the backend code change the value of the RECAPTCHA_SK in the env to the one copied from the secret Key. 
    Save the changes and start the application for the recaptcha functionality reflect

## Getting Started with Create React App

This project was created with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
