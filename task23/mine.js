
const categoriesList = document.querySelector('.categories ul');
const productsList = document.querySelector('.products ul');
const section3 = document.querySelector('.section_3');
const orderFormSection = document.querySelector('.field');
const orderForm = document.querySelector('form');
const buyButton = document.querySelector('.buyButton');
const ordersBtn = document.querySelector('.orders-btn');
const ordersList1 = document.querySelector('.orders-list');


const categories =[
  {
    id:'cat',
    name: 'Для котів',
    products: [
      {
        id: 'cat1',
        name:'Корм для котів',
        price:'5$',
        description:'Корм для котів Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      },
      {
        id: 'cat2',
        name:'Шампунь для котів',
        price:'2$',
        description:'Шампунь для котів Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      },
      {
        id: 'cat3',
        name:'Одяг для котів',
        price:'17$',
        description:'Одяг для котів Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      }
    ]
  },
  {
    id:'dog',
    name: 'Для собак',
    products: [
      {
        id: 'dog1',
        name:'Корм для собак',
        price:'15$',
        description:'Корм для собак Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      },
      {
        id: 'dog2',
        name:'Шампунь для собак',
        price:'8$',
        description:'Шампунь для собак Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      },
      {
        id: 'dog3',
        name:'Одяг для собак',
        price:'25$',
        description:'Одяг для собак Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      }
    ]
  },
  { 
    id:'fish',
    name: 'Для рибок',
    products: [
      {
        id: 'fish1',
        name:'Корм для рибок',
        price:'5$',
        description:'Корм для рибок Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      },
      {
        id: 'fish2',
        name:'Акваріум',
        price:'28$',
        description:'Акваріум Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      },
      {
        id: 'fish3',
        name:'Водоочисник',
        price:'25$',
        description:'Водоочисник Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      }
    ]
  },
]



let currentProd = [];

categories.forEach((el)=> {
  console.log(el.name);
  const li = document.createElement('li');
  li.innerText = el.name;
  li.setAttribute('data-id', el.id);
  categoriesList.appendChild(li);
});

categoriesList.addEventListener('click', (e)=>{
  const catId = e.target.dataset.id;
  console.log(catId);

const filteredCat = categories.filter((obj) =>{
  return obj.id === catId;
  });
  console.log(filteredCat);
   
  productsList.innerHTML = '';

  filteredCat[0].products.forEach((product)=>{
    const li = document.createElement('li');
    li.innerText = product.name;
    li.setAttribute('data-id', product.id);
    productsList.appendChild(li); 
  });  
});

productsList.addEventListener('click', (e) => {
  const productId = e.target.dataset.id;

  const filteredProd = categories.flatMap((cat) => cat.products).filter((prod) => {
    return prod.id === productId;
  });
    currentProd = filteredProd[0];

  if (filteredProd.length > 0) {
    const product = filteredProd[0];
    const description = document.createElement('p');
    description.innerText = product.description;
    const price = document.createElement('p');
    price.innerText = `Price: ${product.price}`;

    

    section3.innerHTML = '';
    section3.appendChild(description);
    section3.appendChild(price);
    section3.innerHTML += '<button class ="buyButton">Придбати</button>';
  }
});


ordersBtn.addEventListener('click', () => {
  displayOrders(); 
  categoriesList.style.display = 'none';
  productsList.style.display = 'none';
  section3.style.display = 'none';  
  document.querySelector('.orders-card').style.display = 'block';
});


document.querySelector('.close-orders-btn').addEventListener('click', () => {
  categoriesList.style.display = 'block';
  productsList.style.display = 'block';
  section3.style.display = 'block';
  document.querySelector('.orders-card').style.display = 'none';
});
function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function getSavedOrders() {
  const savedOrders = localStorage.getItem('orders');
  return savedOrders ? JSON.parse(savedOrders) : [];
}


function addToOrders(product) {
  const savedOrders = getSavedOrders();
  const newOrder = {name: product.name, date: new Date().toLocaleDateString(), price: product.price, description: product.description };
  savedOrders.push(newOrder);
  saveOrders(savedOrders);
}

function displayOrders() {
  ordersList1.innerHTML = '';

  const savedOrders = getSavedOrders();

  if (savedOrders.length === 0) {
    ordersList1.innerHTML = '<p>У вас ще немає замовлень.</p>';
  } else {
    const ordersList = document.createElement('ul');

    savedOrders.forEach((order) => {
      const orderItem = document.createElement('li');
      orderItem.innerHTML = `
      <ul class="card">
      <li>${order.name}</li>
     
      <li><button class="order-details-btn">Деталі</button></li>`;
      ordersList.appendChild(orderItem);
    });

    ordersList1.appendChild(ordersList);
  }
}


  
function displayOrderDetails(order) {
  ordersList1.innerHTML = `
    <p>${order.name}</p>  
    <p>Дата: ${order.date}</p>
    <p>Ціна: ${order.price} $</p>
    <button class="delete-order-btn">Видалити замовлення</button>
  `;

  const deleteOrderBtn = document.querySelector('.delete-order-btn');

  deleteOrderBtn.addEventListener('click', () => {
    const savedOrders = getSavedOrders();
    const updatedOrders = savedOrders.filter((savedOrder) => savedOrder.date !== order.date);

    saveOrders(updatedOrders);
    displayOrders();
  });
}
 
  productsList.addEventListener('click', (e) => {
    const productId = e.target.dataset.id;
    const filteredProd = categories.flatMap((cat) => cat.products).find((prod) => prod.id === productId);
  
    if (filteredProd) {
      currentProd = filteredProd;
      displayProductDetails(filteredProd);
    }
  });

ordersList1.addEventListener('click', (e) => {
  if (e.target.classList.contains('order-details-btn')) {
    const orderElement = e.target.closest('.card');
    const orderIndex = Array.from(orderElement.parentNode.children).indexOf(orderElement);
    const order = getSavedOrders()[orderIndex];
    displayOrderDetails(order);
  }
});


productsList.addEventListener('click', (e) => {
  const productId = e.target.dataset.id;

  const filteredProd = categories.flatMap((cat) => cat.products).filter((prod) => {
    return prod.id === productId;
  });
  currentProd = filteredProd[0];

  if (filteredProd.length > 0) {
    const product = filteredProd[0];
    const description = document.createElement('p');
    description.innerText = product.description;
    const price = document.createElement('p');
    price.innerText = `Price: ${product.price}`;

    const buyBtn = document.createElement('button');
    buyBtn.classList.add('buyButton');
    buyBtn.innerText = 'Придбати';

    buyBtn.addEventListener('click', () => {
      addToOrders(product); 
      displayOrders(); 
    });

    section3.innerHTML = '';
    section3.appendChild(description);
    section3.appendChild(price);
    section3.appendChild(buyBtn); 
  }
});

categoriesList.addEventListener('click', (e) => {
  const catId = e.target.dataset.id;
  const filteredCat = categories.find((obj) => obj.id === catId);

  if (filteredCat) {
    productsList.innerHTML = '';

    filteredCat.products.forEach((product) => {
      const li = document.createElement('li');
      li.innerText = product.name;
      li.setAttribute('data-id', product.id);
      productsList.appendChild(li);
    });
  }
});
