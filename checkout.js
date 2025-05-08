
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let cartsHTML= '';
      let price = 0;
      cart.forEach((item) => {
      const product = products.find(p => p.id === item.productId);
      
      if (product) {
        let total = (product.priceCents /100) * item.quantity;
        price += total;
        cartsHTML += `
        <div class="item-box">
          
          <div class="item">
            <img src="${product.image}"/>
            <div class="item-details">
              <p class="item-name"><strong>${product.name}</strong></p>
              <p class="item-price">$${(product.priceCents /100).toFixed(2)}</p>
              <p>Quantity:${item.quantity} </p>
              
            </div>
          </div>
        </div>`;

        
      }
    });
    const tax = (price * 0.1).toFixed(2);
    const totalPrice = (parseFloat(tax) + price); 
    
    document.querySelector('.items').innerHTML = cartsHTML;
    document.querySelector('.total').innerHTML = price.toFixed(2);
    document.querySelector('.tax').innerHTML = tax;
    document.querySelector('.totalPrice').innerHTML = totalPrice;


    const open = document.querySelector('.btn') ;
    const close = document.querySelector('.close') ;
    const overlay = document.querySelector('.overlay') ;
    const popUp = document.querySelector('.pop-up') ;
    
    open.addEventListener('click',()=>{
      overlay.style.display = 'block';
      popUp.style.display = 'block';
    })
    close.addEventListener('click',()=>{
      overlay.style.display = 'none';
      popUp.style.display = 'none';
    })
    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
      popupForm.style.display = 'none';
    });



const yesBtn = document.querySelector('.yes');

yesBtn.addEventListener('click', () => {
  // Clear cart from localStorage
  localStorage.removeItem('cart');
  
  

  // Reset order summary values
  document.querySelector('.total').innerHTML = '0.00';
  document.querySelector('.tax').innerHTML = '0.00';
  document.querySelector('.totalPrice').innerHTML = '0.00';
  document.querySelector('.items').innerHTML = '';
  // Hide popup and overlay
  overlay.style.display = 'none';
  popUp.style.display = 'none';
});