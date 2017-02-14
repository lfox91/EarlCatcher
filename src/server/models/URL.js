var rp = require('request-promise');
var cheerio = require('cheerio');
var Promise = require("bluebird");

class LinkNode {
  constructor(name, edges, ...props){
    this.edges = new Set(edges);
    this.called = name;
    this.props = props;
  }
  addEdge(end){
    this.edges.add(end);
  }
  removeEdge(end){
    this.edges.delete(end);
  }
}

class Graph {
  constructor(root){
    this.nodes = {};
    this.root = root;
  }
  addNode(root,edges, props){
    this.nodes[root] = new LinkNode(root,edges, props);
    //console.log("Graph Constructor", this.nodes[root]);
  }
  addEdge(root, end){
    this.nodes[root].addEdge(end);
  }
  removeNode(root){
    delete this.nodes[root];
  }
}

class URL extends Graph {
  constructor(root){
    super(root)
    this.visited = {};
    this.count = 0;
  }

  add(name, edges, props){
    this.addNode(name, edges, props);
    this.visited[name] = true;
    ++this.count;
    console.log(this.count, name);
    if(this.count>2183){ throw new Error("YOUR GONNA BREAK SOMETHING OVER 2183!!!")}
  }

  getLinks(root, props){ // props = text, href
    var that = this;
    if(that.visited[root] !== true && root.length){
      // && root[0] == '/' || that.root == root
      let options = {
        uri: root,
        transform: function (body) {
            return cheerio.load(body);
        }
      }
       rp(options)
        .then(($)=>{
          var tempEdges = [];
          $('a').each((i, el) => {
            let href = $(el).attr('href');
            if(href) tempEdges[i] = href;
          });
          that.add(root, tempEdges, props);

          that.nodes[root].edges.forEach(function(uri){
            if(that.visited[that.root+uri] !== true && uri[0] == "/"){
              setTimeout(that.getLinks, 5000, that.root+uri,["text placeholder", uri]);
              return that;
            }
          })
        }).then((url)=>{
          console.log(url);
        }, (err)=>{
          console.error(err);
        })
        .catch((err) => {
          console.error(err);
          that.add(root, [err]);
        })
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
var seaver = root.getLinks(root.root);
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
