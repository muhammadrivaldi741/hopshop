

 
 const searchBar = document.querySelector('.search-bar');
 const cartLogo = document.getElementById('totalquantity')
 let cartQuantity = 0;
//  let productpreview = document.querySelector('.preview');
//  let previewbox = productpreview.querySelectorAll('.cardpreview');

//  document.querySelectorAll('.menshirt .card').forEach(menshirts =>{
//     menshirts.onclick = () =>{
        
//         productpreview.style.display = 'flex';
//         let name = menshirts.getAttribute('data-name');

//         previewbox.forEach(preview =>{
//             let target = preview.getAttribute('data-target');
//             if(name == target){
//                 preview.classList.add('active')
//             }
            
//         })
//     }
//  })
const tabs = document.querySelectorAll('.tabbutton');
const content = document.querySelectorAll('.tab-content');

tabs.forEach((tab, index)=> {
tab.addEventListener('click', (e)=>{
    tabs.forEach(tab=>{tab.classList.remove('active')})
    tab.classList.add('active');

    var line = document.querySelector('.line');
    line.style.width = e.target.offsetWidth + 40 + "px";
    line.style.left = e.target.offsetLeft + "px";


    content.forEach(contents=>{contents.classList.remove('active')})
    content[index].classList.add('active')
})



} );

const buttonCart = document.getElementById('btn-add-cart');




function showPopUp(productId) {
    fetch(`https://dummyjson.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            const idprod = product.id;
            const price = product.price;
            const image = product.images[0];
            const prodname = product.title;
            const brand = product.brand;
            const category = product.category;
            // console.log(res.product)
            const modal = document.getElementById('modal');
            document.getElementById('modal-img1').src = product.images[1];
            document.getElementById('modal-img2').src = product.images[2];
            document.getElementById('modal-img3').src = product.images[0];
            document.getElementById('modal-title').textContent = product.title;
            document.getElementById('modal-description').textContent = product.description;
            document.getElementById('modal-rate').textContent = `${product.rating}/5`;
            document.getElementById('modal-price').textContent = `$${product.price}`;

            // addtocart(idprod);
            buttonCart.addEventListener('click', function(){
                addtocart(idprod, price, image, prodname, brand, category)

    
            })

            

            const comment = product.reviews;
        
            comment.map((item) => {
                    const html = `
                     <div class="commencard" id="">
                            
                            <h1>${item.reviewerName}</h1>
                            <span>${item.reviewerName}</span>
                            <p >${item.comment}</p>

                            

                        </div>
                       
                    `
                    document.getElementById('comment-modal').insertAdjacentHTML('beforeend', html)
   
                
            })


            


           

            

            

            const rating = product.rating
            ratingpersen = `${(rating / 5 * 100)}%`;
            document.querySelector('.stars-inner').style.width = ratingpersen
            
            // Show the modal
            modal.style.display = 'flex';
            console.log(product.reviews[0].comment)
        })
        .catch(error => console.log(error));
}



let cart = JSON.parse(localStorage.getItem('cart')) || [];




function addtocart(id, price, image, prodname, brand, category){
    let positionincart = cart.findIndex((value) => value.id == id)
    if(cart.length <= 0){
        cart = [{
            id: id,
            price: price,
            image: image,
            brand: brand,
            category: category,
            name: prodname,
            quantity: 1
        }]
    } else if(positionincart < 0){
        cart.push({
            id: id,
            price: price,
            image: image,
            brand: brand,
            category: category,
            name: prodname,
            quantity: 1
        })
    } else{
        cart[positionincart].quantity = cart[positionincart].quantity + 1;
    }
    console.log(cart)

    localStorage.setItem('cart', JSON.stringify(cart));

    displaycart();


}



let containercart = document.getElementById('cart');

function displaycart(){
    containercart.innerHTML = '';
    let totalQuantity = 0;


if(cart.length > 0){
    cart.forEach(cart => {
        totalQuantity = totalQuantity + cart.quantity
        console.log(cart)
        let newcart = document.createElement('div');
    newcart.classList.add('item');
    const html = `
                <div class="cart-content" >
                <img src="${cart.image}" alt="">
                <div class="info-cart">
                    <h1>${cart.name}</h1>
                    <p>${cart.brand}</p>
                    <p>${cart.category}</p>
                    <h1>$${cart.price}</h1>
                </div>
                <div class="func-btn">
                    <!-- <button class="hapus">hapus</button> -->
                    <div class="quantity">
                        <button class="minus" onclick="kurangitem(${cart.id})">-</button>
                       
                       <span>${cart.quantity}</span>
                        <button class="plus" onclick="tambahitem(${cart.id})">+</button>
                       
                   </div>


                </div>
                </div>

            
       

                            
                    `;

                    document.getElementById('cart').insertAdjacentHTML('beforeend', html);
                    


                    containercart.appendChild(newcart);
    
    


    })
    

    
    

    
    
    cartLogo.innerHTML = totalQuantity
    console.log(totalQuantity)


}

var subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
var disc = subtotal * 0.2;
var delivery = 15;
var total = subtotal - disc + delivery

    // console.log(total);

   var sub = document.getElementById('subtotal');

   var discount = document.getElementById('disc');
   var del = document.getElementById('delivery');
   var tot = document.getElementById('total');

   if (sub) {
    sub.textContent = `$${Math.round(subtotal)}`
    }

    if (discount) {
        discount.textContent = `-$${Math.round(disc)}`
        }

    if (del) {
        del.textContent = `$${Math.round(delivery)}`;
        }

    if (tot) {
        tot.textContent = `$${Math.round(total)}`;
        }


    console.log(subtotal)
    


// containercart.addEventListener('click', (event) => {
//     let positionClick = event.target;
//     if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
//         let product_id = positionClick.parentElement.parentElement.parentElement.dataset.id;
//         console.log(product_id)

//     }
// })

}
function tambahitem(id){
    
    let positionincart = cart.findIndex((value) => value.id == id);
    if(positionincart >= 0){
        cart[positionincart].quantity = cart[positionincart].quantity + 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));


    displaycart()

}
function kurangitem(id){
    // console.log('hshsshh')
    let positionincart = cart.findIndex((value) => value.id == id);
    if(positionincart >= 0){
        let valuechange = cart[positionincart].quantity - 1;
        if(valuechange > 0){
            cart[positionincart].quantity = valuechange;
        } else {
            cart.splice(positionincart, 1)
            console.log(cart)
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));


    displaycart()

}



displaycart()



// Example usage:



function closePopup() {
    document.getElementById('modal').style.display = 'none';
}

 
 // Add an event listener for 'click' event
 searchBar.addEventListener('click', function() {
     // URL to open
     const url = "searchpage.html";
     
     // Open the URL in a new tab
     window.location.href = url;
 });


 

fetch(`https://dummyjson.com/products/category/mens-shirts?limit=4`)
            .then(res => res.json())
            .then(response =>{
                const data = response.products
                console.log(response.products)

                data.forEach(data => {
                    const html = `
                     <div class="card" data-name="" id="${data.id}"  >
                                <img src="${data.images[0]}" alt="" class="cardimg">


                                <h1 class="title">${data.title}</h1>
                                 
                                <p id="modal-rate"></p>
                                <h1 class="price">$${data.price}</h1>
                                <button class="detailbtn" onclick="showPopUp(${data.id})">detail</button>
                                
                
                            </div>
                             

                            
                    `;
                    
                    document.getElementById('menshirt').insertAdjacentHTML('beforeend', html);
                    
        }
        
    )
    

}      



                )
            .catch(error => console.log(error))

            


            


            

            fetch(`https://dummyjson.com/products/category/womens-dresses?limit=4`)
            .then(res => res.json())
            .then(response =>{
                const data = response.products
                console.log(response.products)

                data.forEach(data => {
                    const html = `
                     <div class="card">
                                <img src="${data.images[0]}" alt="" class="cardimg">
                                <h1 class="title">${data.title}</h1>
                                <h1 class="price">$${data.price}</h1>
                
                            </div>
                    `
                    document.getElementById('topsell').insertAdjacentHTML('beforeend', html)
        }
    )


}
                
                

                

                
                )
            .catch(error => console.log(error))


          

            fetch(`https://dummyjson.com/products/category/womens-dresses`)
            .then(res => res.json())
            .then(response =>{
                const data = response.products
                console.log(response.products)

                data.forEach(data => {
                    const html = `
                     <div class="card">
                                <img src="${data.images[0]}" alt="" class="cardimg">
                                <h1 class="title">${data.title}</h1>
                                <h1 class="price">$${data.price}</h1>
                
                            </div>
                    `
                    document.getElementById('womens').insertAdjacentHTML('beforeend', html)
        }
    )


}
                
                

                

                
                )
            .catch(error => console.log(error))

            fetch(`https://dummyjson.com/products/category/mens-shirts`)
            .then(res => res.json())
            .then(response =>{
                const data = response.products
                console.log(response.products)

                data.forEach(data => {
                    const html = `
                     <div class="card">
                                <img src="${data.images[0]}" alt="" class="cardimg">
                                <h1 class="title">${data.title}</h1>
                                <h1 class="price">$${data.price}</h1>
                                <a href="#" class="detailbtn"></a>
                
                            </div>
                    `
                    document.getElementById('mens').insertAdjacentHTML('beforeend', html)
        }
    )


}
                
                

                

                
                )
            .catch(error => console.log(error))

            fetch(`https://dummyjson.com/comments`)
            .then(res => res.json())
            .then(response =>{
                const data = response.comments
                console.log(response.comments)
                // const comment = product.reviews;
        
            data.map((item) => {
                    const html = `
                     <div class="commentcard swiper-slide" id="">
                            
                            <h1>${item.user.username}</h1>
                            <span>${item.user.fullName}</span>
                            <p >${item.body}</p>

                            

                        </div>
                       
                    `
                    document.getElementById('comment').insertAdjacentHTML('beforeend', html)
   
                
            })


                


}


                
                

                

                
                )
            .catch(error => console.log(error))







const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");


let isDragStart = false, prevPageX, prevScrollLeft;

const shohHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;

        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => shohHideIcons(), 60);
    })
})

const dragStart= (e) => {
    isDragStart = true;
    prevPageX = e.pageX ||  e.touched[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    let positionDiff = (e.pageX || e.touched[0].e.pageX) - prevPageX;
    carousel.classList.add("dragging");
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    shohHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchsstart", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);




const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,

    
  
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
       0: {
        slidesPerView: 1 

       },
       620: {
        slidesPerView: 2

       },
       1024: {
        slidesPerView: 4

       }  
    }
  
  
  });

