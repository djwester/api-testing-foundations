## Routes
### Plural routes

```
GET    /blogposts
GET    /blogposts/1
POST   /blogposts
PUT    /blogposts/1
DELETE /blogposts/1
```

### Singular routes

```
GET    /profile
POST   /profile
PUT    /profile
```

## Parameters
### Paginate

Use `_page` and optionally `_limit` to paginate returned data.

In the `Link` header you'll get `first`, `prev`, `next` and `last` links.


```
GET /blogposts?_page=7
GET /blogposts?_page=7&_limit=20
```

_10 items are returned by default_

### Sort

Add `_sort` and `_order` (ascending order by default)

```
GET /blogposts?_sort=views&_order=asc
GET /blogposts/1/comments?_sort=votes&_order=asc
```

For multiple fields, use the following format:

```
GET /blogposts?_sort=user,views&_order=desc,asc
```

### Slice

Add `_start` and `_end` or `_limit` (an `X-Total-Count` header is included in the response)

```
GET /blogposts?_start=20&_end=30
GET /blogposts/1/comments?_start=20&_limit=10
```

_Works exactly as [Array.slice](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) (i.e. `_start` is inclusive and `_end` exclusive)_

### Operators

Add `_gte` or `_lte` for getting a range

```
GET /blogposts?views_gte=10&views_lte=20
```

Add `_ne` to exclude a value

```
GET /blogposts?id_ne=1
```

Add `_like` to filter (RegExp supported)

```
GET /blogposts?title_like=server
```

### Full-text search

Add `q`

```
GET /blogposts?q=internet
```

### Relationships

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