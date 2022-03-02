# Grandpa's Faucet Frontend Setup
>NOTE: You must have **Node 16+ and npm** installed.

1- SSH into your server and navigate to /var/www/html 

```sh
cd /var/www/html
```

2- Copy the repository to your server and move into the repository
```sh
git clone https://gitlab.com/m2m-node-react-projects/reactjs/grandpas-faucet-frontend
cd grandpas-faucet-frontend
```

3- Edit the .env file and make the changes below

 | Variable | Type | Description |
| --- | --- | --- |
| `REACT_APP_APIKEY` | string | API key for making requests to the backend |
| `REACT_APP_BASEURL` | string | API URL |
| `REACT_APP_SITE_KEY` | string | Google Recaptcha v2 site key. See https://cloud.google.com/recaptcha-enterprise/docs/create-key  |

*Example*
```
REACT_APP_APIKEY=371687a8-8006-4987-bbcf-29d41c56695b
REACT_APP_BASEURL=https://api.grandpasfaucet.com/api
REACT_APP_SITE_KEY=XXXX
```

4- Install npm modules

```sh
npm i
```

5- Build the app

```sh
export NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

6- Copy the contents ```/build``` folder to the root of your host with Nginx/Apache and SSL.

7- Proceed to setup the API at the _REACT_APP_BASEURL_ if not done already.

# End
