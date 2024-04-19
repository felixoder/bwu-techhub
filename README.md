
# BWU-CSE-TechHub

An awesome website for CSE department for Brainware University where student can find the all important news about Hackathon,Events,Newsletters and more And this web page will be maintained by the University so the student can access this seamlessly and There is an integrated chat application where all members can do message seamlessly


## TechStack

- I have used MERN specially that stands for MongoDb , Express , React , Node.Js 

- For Styling functionality I have used Tailwind.Css and Flowbite.

- For State management I have used React-Redux , React-Persist , Redux-Toolkit

- For storage and OAuth I have used Firebase(google).

- For deployment on Free tier I have chosen the Render platform's Free Tier
## Acknowledgements

 - Our respective HOD Sir, Dr. Sivnath Ghosh,  who have given me the project idea and he shared this problem (real time) which I had tried to solve



## How to Run

#### ALL SECRET TOKENS

```http
/client
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `VITE_FIREBASE_API_KEY` | `string` | **Required**. Your firebase API key |

#### Get item

```http
/api
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `SECRET`      | `string` | **Required**. A random String|
| `PORT`      | `string` | **Required**. You can use 3000|
| `MONGO_URI`      | `string` | **Required**.Your mongoDB connection string|

#### Run Project

- `git clone  'https://github.com/felixoder/bwu-techhub.git'` clone the repo
- `cd client` navigate to frontend
- `npm install` install all dependency for frontend
- `cd ..` navigate to project dir
- `npm install` install dependency for backend
- `cd client`
- `npm run dev` to run project
- `cd api`
- `nodemon index.js` run server

Feel free to create PR and make the project clean









# Created By

Debayan Ghosh (felix)

# Contact me:

debayanghosh408@gmail.com