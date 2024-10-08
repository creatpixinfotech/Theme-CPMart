let applyBtn = document.querySelector('#apply-discount-btn');
let discountCodeInput = document.querySelector('.discount_input input[type="text"]');
let discountDisplay = document.querySelector('#cart-discount');
let subtotalDisplay = document.querySelector('#cart-subtotal');
let totalDisplay = document.querySelector('#cart-total');
let discountContainer = document.querySelector('.discounts_apply');
let discountNameElement = document.querySelector('.discount_name'); 
let discountAmountElement = document.querySelector('.discount_amount');
let discountError = document.querySelector('.discount-error'); 
let discountClose = document.querySelector('.discount_close'); 

applyBtn.addEventListener('click', buttonClickApply);
discountClose.addEventListener('click', removeDiscount);

window.addEventListener('DOMContentLoaded', () => {
  fetch("/cart.js", {})
      .then(response => response.json())
      .then(cartData => {
        const discountName = cartData.cart_level_discount_applications[0]?.title || '';
        const discountAmount = cartData.total_discount / 100;
        
        if (discountAmount && discountName) {
          updateDiscountDisplay(discountAmount, discountName, cartData);
          discountError.style.display = 'none';
        }

        if (discountAmount && discountName !== '') {
          applyDiscount(discountName);
        }    
      });
});

function buttonClickApply() {
  const discountCode = discountCodeInput.value.trim();   
  if (discountCode) { 
    applyDiscount(discountCode);
  } else {
    console.log("Please enter a discount code.");
  }
}

function applyDiscount(code) {
  fetch("/payments/config", { method: "GET" })
    .then(response => response.json())
    .then(data => {
      const checkout_json_url = "/wallets/checkouts/";
      const authorization_token = btoa(data.paymentInstruments.accessToken);
      return fetch("/cart.js", {})
        .then(res => res.json())
        .then(cartData => {
          let body = {
            checkout: {
              country: Shopify.country,
              discount_code: code,
              line_items: cartData.items,
              presentment_currency: Shopify.currency.active,
            },
          };
          return fetch(checkout_json_url, {
            headers: {
              accept: "*/*",
              "cache-control": "no-cache",
              authorization: "Basic " + authorization_token,
              "content-type": "application/json, text/javascript",
              pragma: "no-cache",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
            },
            referrerPolicy: "strict-origin-when-cross-origin",
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(body),
          })
          .then(response => response.json())
          .then(data => {
            if (data.checkout && data.checkout.applied_discounts.length > 0) {
              const appliedDiscount = data.checkout.applied_discounts[0].amount;
              const discountName = data.checkout.applied_discounts[0].title || code; 
              discountContainer.style.display = 'flex'; 
              localStorage.setItem('appliedDiscountCode', code); 
              
              discountError.style.display = 'none';
              updateDiscountDisplay(appliedDiscount, discountName, cartData);

              // Apply the discount to the checkout
              let discountApplyUrl = `/discount/${code}?v=${Date.now()}&redirect=/checkout/`;
              return fetch(discountApplyUrl, {}).then(response => response.text());
                           
            } else {
              removeDiscount();
              discountContainer.style.display = 'none';
              discountError.style.display = 'block'; 
            }
          })
          .catch(error => {
            console.error("Error applying discount:", error);
            updateDiscountDisplay(0, '', cartData); 
          });
        });
    });
}

function removeDiscount() {
  let removeDiscountUrl = `/discount/remove?v=${Date.now()}&redirect=/checkout/`;
  fetch(removeDiscountUrl, { method: "GET" })
    .then(() => {
      return fetch("/cart.js", {}) // Fetch updated cart data after removing discount
        .then(response => response.json())
        .then(cartData => {
          updateDiscountDisplay(0, '', cartData); 
          discountContainer.style.display = 'none'; // Hide the discount section
          localStorage.removeItem('appliedDiscountCode');
          discountError.style.display = 'none'; // Optionally hide error on close
        });
    })
    .catch(error => {
      console.error("Error removing discount:", error);
    });
}

function updateDiscountDisplay(discountAmount, discountName, cartData) {
  discountNameElement.textContent = discountName; 
  discountAmountElement.textContent = `Rs. ${(discountAmount)}`;

  discountAmount = discountAmount * 100;  
  const discountInMoneyFormat = formatMoney(discountAmount); 
  discountDisplay.innerHTML = discountInMoneyFormat;

  const newTotal = cartData.original_total_price - discountAmount;
  const newTotalInMoneyFormat = formatMoney(newTotal);
  totalDisplay.innerHTML = newTotalInMoneyFormat;
}

function formatMoney(amount) {
  let formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: Shopify.currency.active,
  }).format(amount / 100);

  if (Shopify.currency.active === 'INR') {
    formattedAmount = formattedAmount.replace('₹', 'Rs. ');
  }

  return formattedAmount;
}