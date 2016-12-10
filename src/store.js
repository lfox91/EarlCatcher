import thunk from 'redux-thunk';

if(!persistantState){
  persistantState = {
    earl: ''
  }
}

let site = createStore(collect, persistantState, thunk);

let collect = (state='',)=>{

}
