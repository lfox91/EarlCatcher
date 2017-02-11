var rp = require('request-promise');
var cheerio = require('cheerio');
var Promise = require("bluebird");

class LinkNode {
  constructor(name, edges, ...props){
    this.edges = new Set(edges);
    this.name = name;
    this.props = props;
  }
  addEdge(end){
    // should not add url's that have been visited
    this.edges.add(end);
  }
  removeEdge(end){
    this.edges.delete(end);
  }
}

class Graph {
  constructor(name){
    this.nodes = {};
    this.name = name;
  }
  addNode(name,edges, props){
    this.nodes[name] = new LinkNode(name,edges, props);
  }
  addEdge(name, end){
    // console.log("In addEdge: ", this.nodes[name]);
    this.nodes[name].addEdge(end);
  }
  removeNode(name){
    delete this.nodes.name;
  }
}

class URL extends Graph {
  constructor(root){
    super(root)
    this.root = root;
    this.visited = {};
    this.count = 0;
  }
  //Need to track eachLink visited
  add(name, edges, props){
    this.addNode(name, edges, props);
    this.visited[name] = true;
  }

  getLinks(root, props){ // props = text, href
    var that = this;
    if(that.visited[root] != true && (root.length ||  that.root == root)){
      root =  typeof root == 'string'? root : that.root + $(root).attr('href');
      let options = {
        uri: root,
        transform: function (body) {
            return cheerio.load(body);
        }
      }
      rp(options)
        .then(($)=>{
          var anchorArr = [];
          var tempEdges = [];

          $('a').each((i, el) => {
            tempEdges[i] = el.text;
            anchorArr[i] = el; // ccheck iinput
          });
          that.add(root, anchorArr, props);
          ++that.count;
          console.log(that.count, root);
          that.nodes[root].edges.forEach(function(anchorObj){
            var href = that.root + $(anchorObj).attr('href');
            if(!this.visited[href]){
              return that.getLinks(href,[anchorObj.text, href]);
            }
          })
        })
        .catch((err) => {
          //console.log(err);
          that.add(root, [err]);
        })
        return that;
    }

  }

  // static scrapeForLinks(){
  //
  // }
  // generateGraph(root){
  //   // should run after root has been added  - might change that?
  //
  //   this.getLinks(root).then(function(result){
  //     //This should be the completed graph of site
  //     console.log(JSON.stringify(result, null, 1));
  //   }, function(err){throw(err)}).bind(this);
  // }
}


var root = new URL("http://seaver.pepperdine.edu");
 root.getLinks(root.root);
// console.log("Line 109", root)

module.exports = URL;













// NOTE: Memoize URLs to speed up decision making
// root.add("http://seaver.pepperdine.edu", [{some:"stuff"}, {more:"stuff"}]);
// root.add("http://www.pepperdine.edu", [{some:"stuff"}, {more:"stuff"}]);
// root.add("http://community.pepperdine.edu", [{some:"stuff"}, {more:"stuff"}]);
// root.addLink("http://seaver.pepperdine.edu", "http://seaver.pepperdine.edu/admission");
// root.addLink("http://seaver.pepperdine.edu", "http://seaver.pepperdine.edu/about");
// root.addLink("http://seaver.pepperdine.edu", "http://seaver.pepperdine.edu/academics");
// root.addLink("http://seaver.pepperdine.edu", "http://seaver.pepperdine.edu/donate");
// console.log("ROOT: ", root);
// console.log("JSONS ROOT: " + JSON.stringify(root, " ", 1));
// console.log("EDGE ", root.nodes["http://seaver.pepperdine.edu"].edges);
// console.log("JSONS EDGE" + JSON.stringify(root.nodes["http://seaver.pepperdine.edu"].edges));
//  res.send({links:links})
//One function that goes to links and makes an array of new links
// newgetLinks(url){ get All Links
//     request.get(url, function(error, response, body){
//       if(err) throw err;
//       if(!error){
//         let $ = cheerio.load(body);
//         var count = 0;
//         return Array.from($('a'));
//         console.log(linkArray[0]);
//       }
//   });
// }
//
//One function that loops through link array and updates graph
// getArrLink(arr){
//   let get = Promise.promisify(this.newgetLinks);
//
//
// }
/*
var promises = [];  //req.body.url
let linkPromise = new Promise((resolve, reject) => {

  if(this.visited[url] || !url || url[0] !== '/' && url !== this.name ) {
    // console.log("BREAK RECURSION", url);
    return;
  } else{

    request.get(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let $ = cheerio.load(body);

         //$('a').each(function(i, el){});
        var len = $('a').length
        // console.log("LENGTH:   "+len);
        if(!this.visited[this.name]){
          this.add(this.name);
        }
        console.log(url, this.visited[url]);
        for( var i = 0; i<len; i++){
          var el = $('a').eq(i);
          var href =  el.attr('href');
          // console.log(i, href);
          if(!href || href[0] !== '/' )continue;
          href = "http://seaver.pepperdine.edu" + href;
          var info = {text: el.text(), href: href };

          if(!this.visited[info.href] && info.href !== this.name){

            // console.log("visited check",href, this.visited[info.href]);
            // console.log(`${i}: ${info.href}`);
            this.add(info.href, [info.text, info.href])

            ++this.count;

            this.addEdge(url, info.href);

            console.log(info.href);
            this.getLinks(info.href)

            // console.log(this.nodes[info.href]);

          }
        }
          resolve(this);
      } else {
        reject(error);
      }
    })
  }
})
promises.push(linkPromise.bind(this));
return Promise.all(promises);
 */
