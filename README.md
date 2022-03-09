# Project Details

The application is built in Reactjs, with React Router v6, Redux and material icons

## _Client's Requirements_

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

# Configuring the Recaptcha functionality

## _Creating an account for the required domain_

Before starting the project, please visit google recaptcha website [here](https://www.google.com/recaptcha/admin/create) to configure the recaptcha functionality with your new domain.
- The label can be anything related to the domain eg. grandpa-faucet
- For the reCAPTCHA type, select v2 and check "I'm not a robot" Checkbox option respectively
- Then enter the list of the domain you want configured e.g grandpasfaucet.com
- Accept the recaptcha terms and conditions
- Press the submit button to configure domains
#### Demo 1:
![](./src/assets/images/recaptcha.PNG?raw=true "Creating Account")

## _Copying the secret key and sitekey values_
 After submitting, two keys will be generated and displayed, copy both the siteKey and the secretKey

#### Demo 2: 
![](./src/assets/images/recaptchakeys.PNG?raw=true "Recaptcha Keys")

## _Changing the Key values on both frontend and backend_
- In the frontend code, change the value of the REACT_APP_SITE_KEY in the env file to the new one copied from the siteKey 
- For the backend code change the value of the RECAPTCHA_SK in the env to the one copied from the secret Key. 
- Save the changes and start the application for the recaptcha functionality reflect
