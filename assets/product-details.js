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
