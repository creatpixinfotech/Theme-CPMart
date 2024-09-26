function tabCollection() {
  const collectionNames = document.querySelectorAll('.collections-name span');
  const productItems = document.querySelectorAll('.popular_product_grid');
  const productsToShow = parseInt(document.querySelector('.collection-product-list').getAttribute('product-show'));

  if (!collectionNames.length) return; 
  const displayProducts = (selectedCollection) => {
    let displayedCount = 0;
    productItems.forEach((item) => {
      const shouldDisplay = (selectedCollection === 'all' || item.getAttribute('data-collection') === selectedCollection) && displayedCount < productsToShow;
      item.style.display = shouldDisplay ? 'block' : 'none';
      if (shouldDisplay) displayedCount++;
    });
  };

  collectionNames.forEach((name, index) => {
    name.addEventListener('click', function () {
      document.querySelector('.collection-active')?.classList.remove('collection-active');
      this.classList.add('collection-active');
      displayProducts(this.getAttribute('data-collection'));
    });
    if (index === 0) name.classList.add('collection-active');
  });

  displayProducts('all');
}

tabCollection();