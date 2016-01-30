# reapp-dev-tools

> dev tools for `generator-reapp` (Yeoman React Generator)

## Folder Structure

#### /src

Write here your _ES6_ source files.

#### /test

Write here your _ES6_ unit tests.

#### /lib

This is the target folder for _ES5_ transpiled files. 

	(ES6)          (ES5)
	/src/foo.js -> /lib/foo.js
	
#### /dist

This is the target folder for _Webpack_ to build the standalone distribution for your library.

#### /coverage

This is the target folder for the test coverage report.

## Provided Scripts

There are a couple of _NPM scripts_ which make your developer life easier:

#### npm run build

It transpiles `/src` into _ES5_ compatible files in `/lib`.

#### npm run build:watch

It transpiles and monitor `/src` files for new changes.

#### npm lint

It checks your code for any possible problem or style errors accordingly to `.eslintrc`.

#### npm clean

It removes all the generated files in `/lib` and `/coverage`.

#### npm test

#### npm run test:watch

#### npm run test:cov

It runs the tests and produces a **test coverage report** in `/coverage`.



