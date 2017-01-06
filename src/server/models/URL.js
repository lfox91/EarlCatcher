import request from 'request';

class Node {
  constructor(name, ...props){
    this.edges = new Set();
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
    this.name = name
  }
  addNode(name, props){
    this.nodes[name] = new Node(name, props);
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
  constructor(name){
    super(name)
    this.name = name;
    this.visited = {};
  }
  //Need to track eachLink visited
  add(name, props){
    this.addNode(name, props);
    this.visited[name] = true;
  }
  addLink(name, end){
    console.log("Add Edge", this.addEdge);
    this.addEdge(name, end);
    console.log(this.nodes[name].edges);
  }
  getLinks(url){ //req.body.url
    return new Promise(function(resolve, reject) {
      request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let $ = cheerio.load(body);

          console.log("In catch post", $('a').text());
          $('a').each(function(i, el){
            links.push({text:$(el).text(), href: $(el).attr('href')})
          })
        // res.send({links:links});
        }
      })}
      if(body){
        resolve(links);
      } else {
        reject("There is no response. Check request URL");
      }
    )
  }
  updateGraph(url){

    getLinks(url)
  }
}





let root =  new URL("http://seaver.pepperdine.edu");
root.add("http://seaver.pepperdine.edu", [{some:"stuff"}, {more:"stuff"}]);
root.add("http://www.pepperdine.edu", [{some:"stuff"}, {more:"stuff"}]);
root.add("http://community.pepperdine.edu", [{some:"stuff"}, {more:"stuff"}]);
root.addLink("http://seaver.pepperdine.edu", "http://seaver.pepperdine.edu/admission");
root.addLink("http://seaver.pepperdine.edu", "http://seaver.pepperdine.edu/about");
root.addLink("http://seaver.pepperdine.edu", "http://seaver.pepperdine.edu/academics");
root.addLink("http://seaver.pepperdine.edu", "http://seaver.pepperdine.edu/donate");
console.log("ROOT: ", root);
console.log("JSONS ROOT: " + JSON.stringify(root, " ", 1));
console.log("EDGE ", root.nodes["http://seaver.pepperdine.edu"].edges);
console.log("JSONS EDGE" + JSON.stringify(root.nodes["http://seaver.pepperdine.edu"].edges));
// NOTE: Memoize URL's to speed up decision making
