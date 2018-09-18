# api-testing-challenges

## Table of contents

<details>
<!-- toc -->
- [Setup and installation](#install)
- [Challenges](#challenges)
  * [Find the secret](#secret-profile)
<!-- tocstop -->
</details>

## Install
After cloning the repo locally you can install it by calling

```bash
$ npm install
```

### Setup
Once you have it installed you can start the server by calling

```bash
$ node <server-name>
```
Where the available servers are:

- find_the_secret_server.js

## Challenges
These challenges are all designed to be 'black box.' The purpose of them is to help you learn more about how APIs work and what kinds of things to think about when testing them. For you to get the most of them, try to solve them all by using only API calls. Don't go looking in the server implementations or the databases for the answers.  See if you can find them in with only using the APIs

### Secret profile
The challenge:

There is a secret profile (profile 1) that you are not supposed to be able to access. Using only API calls, can you find out the name of that profile?

#### Routes

The find the secret challenge can be solved using the following routes:

```
GET    /blogposts
GET    /blogposts/<id>
GET    /comments
GET    /comments/<id>
GET    /profiles
GET    /profiles/<id>
```

You may also need to use the following parameters:

##### Relationships

To include children resources, add `_embed`

```
GET /blogposts?_embed=comments
GET /blogposts/1?_embed=comments
```

To include parent resource, add `_expand`

```
GET /comments?_expand=blogpost
GET /comments/1?_expand=blogpost
```

### Biggest ID
The challenge:

What is the biggest ID you can give a post or comment in the system? Do you notice any interesting side effects while you are trying to figure this out?

