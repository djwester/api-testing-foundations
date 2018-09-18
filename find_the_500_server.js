const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('find_the_500_db.json')
const middlewares = jsonServer.defaults()

function compareArrays(arr1,arr2){
  if (arr1.length != arr2.length)
    return false;

  for (var i = 0, l=arr1.length; i < l; i++) {
    // Check if we have nested arrays
    if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
      // recurse into the nested arrays
      if (!arr1[i].equals(arr2[i]))
        return false;       
    }           
    else if (arr1[i] != arr2[i]) { 
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;   
    }           
  }       
  return true;
}

function allRequiredFieldsPresent(req){
  var requiredFieldsBlogPost = ['title','body','profileId','avatarId']
  if (req.url.includes('blogposts')){
     //check without id
    if (compareArrays(Object.keys(req.body),requiredFieldsBlogPost)){
      return true;
    }
    //check with id
    requiredFieldsBlogPost.unshift('id')
    if (compareArrays(Object.keys(req.body),requiredFieldsBlogPost)){
      return true;
    }
    return false;
  }
  return false;
}

function isOldFormat(req){
  var oldFormatFieldsBlogPost = ['id','title','body','profileId'];
  if (req.url.includes('blogposts/')){
    if (compareArrays(Object.keys(req.body),oldFormatFieldsBlogPost)){
      return true;
    }
    return false;
  }
  return false;
}

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
  if (req.method === 'POST') {
    if (allRequiredFieldsPresent(req)){
      next()
    }else{
      
      res.status(400).jsonp({
        error: "Incorrect parameters given"
      })
      res.end();
    }
  }
  else if (req.method === 'PUT'){
    if (allRequiredFieldsPresent(req)){
      next()
    } 
    if (isOldFormat(req)){
      //'upgrade' to use the new format
      req.body.avatarUrl = null;
      next()
    }else{ 
    next()
  }
  
  }
  else {
    next();
  }
})
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running. Requests can be accessed at http://localhost:3000/')
})