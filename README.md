CURRENT PROGRESS -- The site key edit is not finished. The part when editing the key and changing the site to new one or adding/removing existing sites is not working/not finished.
Everything else is currently working as should. All the sites are seeded in or have to be added manualy in database.

TODO -- add better user adding system. Should add at least one role that has access to the register site. Can be done by adding [Auth] to Entity Register and adding role to the seeded ADMIN account.

The backend connection is in file BaseService.ts. To get the application running, please check if the backend is running, otherwise there will be no connection made and no data transfared.
Services has some functions that arent being used, before making new check if it is already made or if going over them, remove please not used functions :smile:
There is also dockerFile to upload the frontend as docker conteiner to Asure or sth else for LIVE deployment.

To register new user, the link is http://localhost:3000/register

# To run the application, type in the command:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


