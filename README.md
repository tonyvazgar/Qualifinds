# Qualifinds
Back End Developer Challenge


# 1 What is used
1. Node.js
2. axios
3. <a href="https://cheerio.js.org/docs/intro">Cherrio</a> To analize the DOM model of the response of the request
4. <a href="https://www.npmjs.com/package/node-fetch">node-fetch</a> To make requests with more information


# 2 If want to test locally:
 1. run ```npm run install``` on the root folder ```/```
 2. run the command ```npm run scrapping``` if you want to scrap the walmart site, otherwise run ```npm run scrapping [x]``` where [x] represents the URL of the desired category of jumbo site, examples:
```npm run scrapping https://www.tiendasjumbo.co/automovil```, 
```npm run scrapping https://www.tiendasjumbo.co/supermercado/carne-y-pollo```, anyone of these categories <img width="331" alt="image" src="https://user-images.githubusercontent.com/21047090/233769155-77c3a3f4-167d-4518-8649-4d0d0d6a5514.png">
3. Search for the file ```result.json``` on the ```/``` path to see the results

# 3 If want to test with Docker:
 1. run ```docker build . -t qualifinds:latest``` on the root folder ```/```
 2. Wait to Docker to construct the image
 3. run ```docker run qualifinds:latest``` or ```docker run qualifinds:latest [x]``` where [x] represents the URL of the desired category of jumbo site, example:
```docker run qualifinds:latest https://www.tiendasjumbo.co/libros-y-papeleria```
 4. To see the result, in docker select the last container <img width="1212" alt="image" src="https://user-images.githubusercontent.com/21047090/233769444-990ea618-1876-48bf-9fec-c4fa3988b521.png">
 5. Double click to see details of this cointainer
 6. Go to Files and in the app folder you will get a ```result.json``` to see the results of the point 2 (locally)
 7. <img width="1791" alt="Screenshot 2023-04-22 at 12 59 27 a m" src="https://user-images.githubusercontent.com/21047090/233769592-7d243e69-89d2-4450-bfda-a3f49745359c.png">


# Notes or Blockers:
1. Sometimes Walmart's site detects the requests and it block your IP for a moment.
2. <b>It was very fun and interesting solve this challenge! To see the pattern of te information to get the answers! 😃 </b>
