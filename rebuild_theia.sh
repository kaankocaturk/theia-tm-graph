sudo kill -9 $(lsof -t -i:3005)
#rm -rf node_modules
#cd browser-app
#rm -rf node_modules lib

#cd .. & yarn
#cd browser-app & yarn add antd

#cd .. & yarn build:browser
yarn
yarn build:browser
yarn start:browser --port 3005