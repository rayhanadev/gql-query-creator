> This project is a **Work in Progress** and currently in development. The API is
> subject to change without warning.

<div align="center">
	<a href="https://github.com/RayhanADev/gql-query-creator">
		<h1>GraphQL Query Creator</h1>
	</a>
	<br />
	<a href="https://github.com/RayhanADev/gql-query-creator/graphs/contributors"><img src="https://img.shields.io/github/contributors/RayhanADev/gql-query-creator.svg?style=for-the-badge"></a>
	<a href="https://github.com/RayhanADev/gql-query-creator.svg/graphs/contributors"><img src="https://img.shields.io/github/forks/RayhanADev/gql-query-creator.svg?style=for-the-badge"></a>
	<a href="https://github.com/RayhanADev/gql-query-creator/stargazers"><img src="https://img.shields.io/github/stars/RayhanADev/gql-query-creator.svg?style=for-the-badge"></a>
	<a href="https://github.com/RayhanADev/gql-query-creator/issues"><img src="https://img.shields.io/github/issues/RayhanADev/gql-query-creator.svg?style=for-the-badge"></a>
	<a href="https://github.com/RayhanADev/gql-query-creator/blob/master/LICENSE"><img src="https://img.shields.io/github/license/RayhanADev/gql-query-creator.svg?style=for-the-badge"></a>
	<a href="https://www.npmjs.com/package/gql-query-creator"><img src="https://img.shields.io/npm/dw/lightfetch?style=for-the-badge"></a>
	<p>
		<em>Programatically create your GraphQL Query.</em>
		<br />
		Pass an Object following our format, get your GraphQL Query. Simple as that.
	</p>
</div>

---

## Install

```sh
npm install gql-query-creator
```

## Usage

### Main API

```js
gqlQueryCreator(queryName, queryVariables, queryTree);
```

### The Query Tree

This package allows you to programmatically construct an object that is formatted
into a query string and variables. We call this the Query Tree. It follows the
format shown below\*:

```js
const queryTree = {
  singleProperty: '', /* OUTPUT - singleProperty */
  propertyWithOptionsAndVariables: [{
    optionA: 'variableA',
  }], /* OUTPUT - propertyWithOptionsAndVariables(optionsA: $variableA) */
  propertyWithOptionsAndValues: [{
    propOverride: true,
    optionA: 150,
  }], /* OUTPUT - propertyWithOptionsAndValues(optionsA: 150) */
  propertyWithAlias: [{}, 'alias'], /* OUTPUT - alias: propertyWithAlias */
  propertyWithProperties: {
    args: [{
      optionA: 'variableA',
    }], // Note: this functions the same as the arrays above
    items: {
      singleProperty: '',
      singlePropertyTwo: '',
    },
  }, /* OUTPUT -
        propertyWithProperties(optionA: $variableA) {
          singleProperty
          singlePropertyTwo
        }
      */
};
```

\* If this seems confusing to you, check out the example it might make more sense.

## Example

```js
// using CommonJS
const { gqlQueryCreator } = require('gql-query-creator');

// using ESM
import { gqlQueryCreator } from 'gql-query-creator';

function myQueryString() {
  /* --- RandomProject's Useful Items --- */
  const postProperties = {
    title: '',
    date: '',
    body: '',
  };

  const userProperties = {
    username: '',
    firstName: '',
    url: [{ propOverride: true, dotty: true }, 'dottyUrl'],
    posts: {
      args: [{
        propOverride: true,
        latest: true,
        count: 10,
      }],
      items: {
        ...postProperties,
      },
    },
  };

  /* --- Query Creation --- */
  const queryName = 'UserInfo';

  const queryTree = {
    userByUsername: {
      args: [{ username: 'username' }],
      items: {
        ...userProperties,
      },
    },
  };

  const username = 'RayhanADev';

  const queryVariables = {
    username: ['String!', username],
  };

	// Modify the tree if a criteria is met
  if(username === 'RayhanADev') {
		queryTree.userByUsername.items.roles = '';
  };

	// Pass Everything Through the Creator
	const myQuery = gqlQueryCreator(queryName, queryVariables, queryTree);
	return myQuery;
}

const myQuery = myQueryString();
console.log(myQuery.query);
console.log('-----');
console.log(myQuery.variables);
```

Output:

```
query UserInfo($username: String!) {
  userByUsername(username: $username) {
    username
    firstName
    dottyUrl: url(dotty: true)
    posts(latest: true, count: 10) {
      title
      date
      body
    }
    roles
  }
}
-----
{"username":"RayhanADev"}
```
