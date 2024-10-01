document.addEventListener('DOMContentLoaded', function () {
  const wishlist = document.querySelectorAll('.card__wishlist'); 
  
  wishlist.forEach(button => {
    button.addEventListener('click', () => {
      const emptyheart = button.querySelector('.empty-heart');
      const fullheart = button.querySelector('.fill-heart'); 
      
      const isFullHeartHidden = window.getComputedStyle(fullheart).display === 'none';
      
      if (isFullHeartHidden) {
        emptyheart.style.display = "none";
        fullheart.style.display = "block";
      } else {
        emptyheart.style.display = "block";
        fullheart.style.display = "none";
      }
    });
  });
});
