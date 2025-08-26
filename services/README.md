## Folder Structure

### Assets
react/public/static: Assets should be moved into either images/buttons/symbols-directory. 
Name files in camelCase. Using files in sass or Components like src = "./static/icons/cancel.svg".

### Api folder
Api folders are named and nested based on backend api. This way we can have a stable structure for our Sagas and Reducers.
Reducers for each api call will be saved in corresponding folder for this call.
All other changes of state that are not coming from api will be saved in redux folder.

### Redux folder
Everything connected to Redux, except for the reducers in relation to our
api will be stored in redux folder. This means store definition, and reducers
with corresponding actions for actions unrelated to the api calls.

### Redux-Saga
Middleware used in this project is redux-saga.
Main saga rootSaga.js is stored in client/redux/ and this folder is
referenced in store.js in redux folder. All sagas that need to be watched
should be stored in rootSaga.js.  Sagas are stored together with their
corresponding reducer.
NOTE: Because with redux-saga as middleware there are five files needed to create/ keep up to date. Thunk can be an option for new api requests, because only one file per request will be created.

### Components
In favor of enforcement of separation of components two main segregated folders for UI are created: Framework and Scenes.
Framework:
Aim was to design general components which will be reused across the application and entirely independent from the redux state. This means they should depend only on the properties passed to them from parent component.
Scenes:
The folder scenes is filled with all views/scenes we have in the application. If a Parent-React-Component will be reached via routing, it represents a scene. This way it should clear to orientate through the scenes directory and the corresonding UI-Interface. A scene-folder can have a number of nested folders, depending of the subdividing and nesting of a view. A scene-folder contains specific and feature driven Components. Base folder (...react/src/client/Routes/shared/RouteBaseWrapper/Base) is assumed to be used across the application since it consists of footer and header which are always present.
The scenes/shared-directory contains specific project features which are reused in different scenes (f.e. AmmunitionType-Select) but too specific und unique to be stored in framework.
 
### Conventions

use function keyword instead of arrow function for Reacts functional
components. This gives you real names in Jest snapshots, even for wrapped components.
favor functional over class components (if a total new scene is planned work with function components and hooks)
make sure to avoid duplicate rendering/ duplicates requests etc
simple straight forward naming
stick to general coding conventions, check CodingConventions.docx in Teams

### Updating dependencies
We want to keep the project secure, fast and enjoy the latest features of all dependencies, so it's important to keep them regularly up-to-date. Take time every second month to inform about updates, apply updates and check especially minor- and major-updates with carefulness.

### i18n
<!-- All texts and labels for the User should be stored in ...react/src/client/utils/translations/de.js. -->

a new scene and its text should be stored as a new object
use useful/clear/simple namings
<!-- check for excisting entries f.e. in form/modal/modal -->



### Debuging
TODO:

normally here is described how to create a build without minification and no sourcemaps to be more on the production side, but still able to set breakpoints. But it seems you don't have working source maps, so I don't know what do here, beside fixing them.
how do I debug tests?

### Testing
For tests in this project, Jest framework is used.
All test are following the pattern name_of_corresponding_component.spec.js.
All test are located in the same folder as the corresponding component. Setup of the test can be found in test folder and is referenced in the package.json.
Run all test: npm run test on services/react/sr
