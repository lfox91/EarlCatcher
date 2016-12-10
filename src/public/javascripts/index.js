window.onload = function(){
  let input = document.getElementsByTagName('input')[0];
  let httpBtn = document.getElementById('http');
  let httpsBtn = document.getElementById('https');

  const updateInput =  (e) => {
    // console.log(e);
    // console.log(e.target + ":" + e.target.id);
    input.value = e.target.id+'://';
  }
  httpBtn.onclick = updateInput;
  httpsBtn.onclick = updateInput;
};
