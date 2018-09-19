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

function get_base_resource_from_url(url){
  return url.split('/')[1]
}

function get_expand_type_from_url(url){
  return url.split('=')[1]
}
server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
  if (req.method === 'POST') {
    if (allRequiredFieldsPresent(req)){
      next()
    }else{
      
      res.status(400).jsonp({
        error: "Incorrect parameters given. The required fields are: ['title','body','profileId','avatarId']"
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
    var allowed_expandMap = {
      'avatars':['profile','blogpost','comment'],
      'comments':['blogpost'],
      'blogposts':['profile'],
      'profiles':[]
    }
    if (req.url.includes('_expand')){
      var base_resource = get_base_resource_from_url(req.url)
      var expand_type = get_expand_type_from_url(req.url)
      var allowed_expand_types = allowed_expandMap[base_resource]
      if (allowed_expand_types.indexOf(expand_type)>=0){
        next();
      }else{
        res.status(400).jsonp({
          error: base_resource + " does not have a parent " + expand_type
        })
        res.end();
      }      
    }else{
      next();
    }
  }
})
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running. Requests can be accessed at http://localhost:3000/')
})