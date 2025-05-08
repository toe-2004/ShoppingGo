let cart = JSON.parse(localStorage.getItem("cart")) || [];

      function showCartNumber() {
        let cartQuantity = 0;
        cart.forEach((item) => {
          cartQuantity += item.quantity;
        });
        
        document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
      }

      let productsHTML = "";
      products.forEach((product) => {
        productsHTML += `
          <div class="product">
            <img src="${product.image}">
            <p class="product-name">${product.name}</p>
            <p><img src="./shop-images/rating-${
              product.rating.star * 10
            }.png"/>
            </p>
            <p>$${(product.priceCents / 100).toFixed(2)}</p>
            
              <select class="product-no">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            

            <div class="btn">
              <button class="add-btn js-add-to-cart" data-product-id="${
                product.id}">Add to Cart</button>
              <button class="del-btn js-delete-from-cart" data-product-id="${
                product.id}">Delete</button>
            </div>
          </div>
        `;
      });

      document.querySelector(".product-container").innerHTML = productsHTML;

      // To add the product-quantity in cart-icon
      document.querySelectorAll(".js-add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
          const productId = button.dataset.productId;
          const productContainer = button.closest(".product");
          const quantitySelector =
            productContainer.querySelector(".product-no");
          const selectedQuantity = parseInt(quantitySelector.value);

          let matchingItem;
          cart.forEach((item) => {
            if (productId === item.productId) {
              matchingItem = item;
            }
          });

          if (matchingItem) {
            matchingItem.quantity += selectedQuantity;
          } else {
            cart.push({
              productId: productId,
              quantity: selectedQuantity,
            });
          }

          localStorage.setItem("cart", JSON.stringify(cart));
          showCartNumber();
        });
      });

      // To delete the product-quantity from cart-icon 
      document.querySelectorAll(".js-delete-from-cart").forEach((button) => {
        button.addEventListener("click", () => {
          const productId = button.dataset.productId;
          const productContainer = button.closest(".product");
          const quantitySelector = productContainer.querySelector(".product-no");
          const selectedQuantity = parseInt(quantitySelector.value);

          let item = cart.find((item) => item.productId === productId);

          if (item) {
            item.quantity -= selectedQuantity;

            if (item.quantity < 0) {
              
              alert("You didn't select this item");
              cart = cart.filter((item) => item.productId !== productId);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            showCartNumber();
          }
        });
      });

      showCartNumber();
      

      // Search the product with product-name in search bar
      const searchValue = document.querySelector(".search-bar");
      searchValue.addEventListener("input", function () {
        const search = searchValue.value.toLowerCase();
        document.querySelectorAll(".product").forEach((item) => {
          const name = item
            .querySelector(".product-name")
            .textContent.toLowerCase();
          item.style.display = name.includes(search) ? "" : "none";
        });
      });