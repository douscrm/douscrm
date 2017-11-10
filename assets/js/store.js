import { createStore } from 'redux';



var store = createStore((state = {}, action) => {
	if(action.type == 'login') {
		state.isLogged = true;
	} else if(action.type == 'logout') {
		state.isLogged = false;
	}

	return state;
}, {
	isLogged: false
});



export default store;