# Carb Manager Dev Assignment

Welcome to Carb Manager Dev Assignment. 

## Project structure

The project consists of 2 main modules:
- `node.js` backend: 
  - Express server listening on `http://127.0.0.1:8080`.
  - `http://127.0.0.1:8080/recipes` - returns recipes list. 
  - `http://127.0.0.1:8080/recipe/:id` - returns a single recipe. 
  - `http://127.0.0.1:8080/user` - returns user settings object.
  - Data, for all endpoints, is mocked.
  - Feel free to modify all files under the `./server` directory except data mocks and corresponding interfaces.
- front-end application:
  - The dev sever listens on `http://localhost:3000`
  - `http://localhost:3000/recipes` - renders recipes list
  - `http://127.0.0.1:8080/recipe/:id` - renders a single recipe
  - Feel free to modify anything

## The challenge

The project contains some bad code. The challenge is to identify bad parts and address the issues.

- Focus just one the `/recipes` view.
- `energy` values should be converted based on `user.units.energy` settings. 
- `energy` label should also respect `user.units.energy` settings.
- Assume that all `Recipe.tags` and `Recipe.nutrients` properties are going to be localized based on `User.language`. Don't develop localization code. Just be prepared for it.
- Assume that all `Recipe.nutrients` units are convertible. Don't develop converters, just be prepared for it.
- Assume that this project is a part of a large-scale application. Recipes are used all over the app, they are not just a property of the `/recipes` page.

- The `/recipe/:id` page just demonstrates that a single recipe will use the same recipe model and will require the same problems to be solved.
We don't expect you to write any code for a single recipe view, but we'd like you to have it in mind that such a view will be developed in the future.
- Search for `TODO` and `FIXME` comments and address these issues.
- Feel fee to use TypeScript or JavaScript
- Feel free to create many components/modules as you want
- Feel free to break `RecipeView` into components
- Feel free to install any library/tool you need
- Feel free to use Vuex/Pinia
- Feel free to use Composition API or Options API
- Feel free to change the project settings (Vue config, Webpack settings, linters, etc)
- Feel free to drop this assignment in favour of [cm-assignment-react](TODO://add.cm-assignment-react.link)
- Feel free to contact us any time if yoy have any doubts!

We're not aiming for perfection. We don't want you to spend too much time on the refactor.
If a feature/change you'd like to implement is going take too much time just leave some notes below.
Include the reason for the refactor and the proposed solution. Also, document all the changes you made e.g.:

- *"Refactored `<Button>` component props to make it re-usable"*
- *"TODO: Define custom validators for all `<Button>` component props"*

We suggest you don't spend more than 2h on this challenge.

## Refactor notes

- `{note_1}`
- `{note_2}`
- `…`
- `{note_n}`

## Customize configuration

This project was set up with [`create-vue`](https://github.com/vuejs/create-vue).
See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Run the express server and serve the front-end app for Development

```sh
npm run serve
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
