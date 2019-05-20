const { createStore } = require('redux');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded');


  const action = {type: 'ADD_ITEM', item: ''}

  const shoppingReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        const newState = [...state, action.item]
        return newState;
      case 'REMOVE_ITEM':
        const newArray = action.item
        return newArray
      default:
        return state
    }
  }

  const store = createStore(shoppingReducer);

  const form = document.querySelector('#shopping-list-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    store.dispatch({ type: 'ADD_ITEM', item: event.target.item.value });
  });

  store.subscribe(() => {
    render();
  })

  const render = () => {

    console.log(store.getState());
    const list =  document.querySelector('#shopping-list');
    list.innerHTML = ''
    store.getState().forEach((item, i) => {
      const list_item = document.createElement('li');
      console.log(store.getState());
      list_item.textContent = store.getState().slice(i, i+1)
      list_item.addEventListener('click', () => {
        removeItem(i)
      })
      list.appendChild(list_item)
    })

  }

  const removeItem = (i) => {
    console.log('hello', i);
    const itemToRemove = store.getState().splice(i, 1)
    const newArray = store.getState()
    console.log(itemToRemove);
    store.dispatch({ type: 'REMOVE_ITEM', item: newArray });

  }


})
