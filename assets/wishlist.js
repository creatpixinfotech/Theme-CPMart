function wishlist() {
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  console.log("wishlistButtons");
  
  wishlistButtons.forEach(button => {
    button.addEventListener('click', () => {
      const product = {
        handle: button.getAttribute('data-p-handle'),
        id: button.getAttribute('data-product-id'),
        name: button.getAttribute('data-p-name'),
        vendor: button.getAttribute('data-p-vendor'),
        featured_image: button.getAttribute('data-f-image'),
        product_id: button.getAttribute('data-p-id'),
        product: button.getAttribute('data-product')
      };
      console.log("aavav");
      
      addToWishlist(product);
    });
  });
}

function addToWishlist(product) {
  // Retrieve existing wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Check if product already exists in wishlist
  const productExists = wishlist.find(item => item.id === product.id);

  if (!productExists) {
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
  } else {
    alert('Product is already in the wishlist');
  }
}

wishlist();
