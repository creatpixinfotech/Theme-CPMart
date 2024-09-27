function productDetails() {
  const titles = document.querySelectorAll('.titles');
  const descriptions = document.querySelectorAll('.descriptions');

  if (descriptions.length > 0) {
    descriptions[0].classList.add('active');
  }

  titles.forEach((title) => {
    title.addEventListener('click', () => {
      const titleIndex = title.getAttribute('data-index');
      descriptions.forEach((des) => {
        const descriptorIndex = des.getAttribute('data-index');
        if (descriptorIndex === titleIndex) {
          des.classList.add('active');
        } else {
          des.classList.remove('active');
        }
      });
    });
  });
}

productDetails();

const titles = document.querySelectorAll('.product-details .product-details_title .titles');
  if (titles.length > 0) {
    titles[0].classList.add('active');
  }
  titles.forEach(title => {
    title.addEventListener('click', function() {
      titles.forEach(t => t.classList.remove('active'));
      title.classList.add('active');
    });
  });