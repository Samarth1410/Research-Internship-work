# ETL-PS-001
System for Effective Learning and School Complex Administration (SELSCA)

The module is completely built using MERN Stack.

The module has been built inorder to accept an Image file as input which can be cropped in the browser  and stored it in the database.

The module uses React-image-crop API to crop the image.

material UI has been used for Navigation Bar.

Software Dependencies and versions:

    "@emotion/react": "^11.10.4",
    "@emotion/styled": "^11.10.4",
    "@mui/material": "^5.10.4",
    "axios": "^0.27.2",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-image-crop": "8.6.12",
    "react-router-dom": "^6.3.0",
    "react-scripts": "4.0.0"
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "moongose": "^1.0.0",
    "nodemon": "^2.0.19"

running/set-up your module:

    open directory in cmd
    run cd Frontend in one terminal
    run npm install --legacy-peer-deps (to install depencencies)
    run npm start
    At the same time open another terminal
    run cd Backend
    run npm run dev

    open localhost 3000 in browser.

Below is the referance photos :

Below mentioned is the HOME page which contains the uploading Instructions,
![2022-09-23](https://user-images.githubusercontent.com/113330666/191949151-568cc364-5578-4726-a915-9294c706e31b.png)

![2022-09-23 (2)](https://user-images.githubusercontent.com/113330666/191949664-83c42f83-282c-486e-a699-46560246196e.png)

![2022-09-23 (1)](https://user-images.githubusercontent.com/113330666/191948963-e41fa7e1-d7ec-4ade-82dd-e0d6a5500677.png)

And the upload page is below in which we can do drag and drop for the images and take the images from the file manager as well.


![2022-09-23 (3)](https://user-images.githubusercontent.com/113330666/191950684-0cc57ec3-da78-44a7-87fd-8614087ba49a.png)


The cropped image will be uploaded to the database along with the name given, if you want to connect this to your own mongo database change the port mentioned in backend app.js file and frontend App.js .
