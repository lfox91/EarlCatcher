const  init  = ()=>{
  let input = document.getElementsByTagName('input')[0];
  let httpBtn = document.getElementById('http');
  let httpsBtn = document.getElementById('https');

  const updateInput =  (e) => {
    console.log(e);
    e.preventDefault();
    input.value = `${e.target.id}://`;
  }
  httpBtn.onclick = updateInput;
  httpsBtn.onclick = updateInput;
}
module.exports = init;
