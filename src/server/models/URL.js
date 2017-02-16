var rp = require('request-promise');
var cheerio = require('cheerio');
var Promise = require("bluebird");
require('cute-stack')('pretty', Infinity);
var longjohn = require('longjohn');
var debug = require('debug');
var Promise = require('bluebird');

longjohn.async_trace_limit = 5;
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
    if(this.count>3000){ throw new Error("YOUR GONNA BREAK SOMETHING OVER 2183!!!")}
    this.stack
  }

  getLinks(root, props){ // props = text, href
    Error.captureStackTrace(this)
    if(this.visited[root] != true && root.length){
      console.log("Check after 1st IF ==", this.visited[root]);
      let options = {
        uri: root,
        timeout: 5000,
        transform: function (body) {
            return cheerio.load(body);
        },
        transform2xxOnly: false,
        gzip: true
      }
       rp(options).promise().bind(this)
        .then(($)=>{
          var tempEdges = [];
          $('a').each((i, el) => {
            let href = $(el).attr('href');
            if(href) tempEdges[i] = href;
          });
          function b (data, cb){
            data = setTimeout((data)=>{return data+2}, 50, 3)
            cb(null, data);
          }
          return Promise.promisify(b);

          // console.log("Check before add ==", this.visited[root]);
          // this.add(root, tempEdges, props);
          // this.nodes[root].edges.forEach((uri)=>{
          //   if(uri.indexOf("#")!==-1){
          //     uri = uri.slice(0, uri.indexOf("#"));
          //   }
          //   if(uri[uri.length-1]=="/"){
          //     uri = uri.slice(0, uri.length-1);
          //   }
          //
          //   if(this.visited[this.root+uri] !== true && uri[0] == "/"){
          //     console.log(this.stack )
          //     setTimeout(this.getLinks.bind(this), 5000, this.root+uri,["text placeholder", uri]);
          //     return this;
          //   }
          // })
        })
        .then((something)=>{

          something.then(
            (data)=>console.log(data)
          )

        }, (err)=>{
          console.log(err);
          throw err;
        })
        .catch((err) => {
          if(err.cause && err.options && err.cause.code == "ETIMEDOUT" || "ESOCKETTIMEDOUT"){
            console.error(JSON.stringify(err, null, ">>>"));
            //this.add(root, [err.cause.code, err.options.uri]);
          } else {
            console.error(JSON.stringify(err, null, "###"));
            //this.add(root, [err]);
          }
        })
    }
  }
}

var root = new URL("http://www.seaver.pepperdine.edu");
var seaver = root.getLinks(root.root);
module.exports = URL;
