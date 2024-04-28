var arr = JSON.parse(localStorage.getItem("cart-list")) || [];
let cartProducts = document.getElementById("cartProducts-container");
let countPrice = document.getElementById("mainHeadcount");


displayData(arr);
updateCount();

function displayData(arr){
    cartProducts.innerHTML = "";
    arr.forEach(function (ele,i) {
        let card = document.createElement("div");
        card.setAttribute("class", "product");
        card.setAttribute("data-id", ele.id);
        let cardHead = document.createElement("div");
        cardHead.setAttribute("class", "product-img");

        let cardbody = document.createElement("div");
        cardbody.setAttribute("class", "product-body1");


        let cardImg = document.createElement("img");
        cardImg.src = ele.image;

        cardHead.append(cardImg);

        let cardTitle = document.createElement("p");
        cardTitle.textContent = ele.title;

        let cardCategory = document.createElement("p");
        cardCategory.textContent = `Category: ${ele.category}`;

        let cardBrand = document.createElement("p");
        cardBrand.textContent = `Brand: ${ele.brand}`;

        let cardPrice = document.createElement("p");
        cardPrice.textContent = `Price: ₹${ele.price}`;
        cardPrice.style.fontWeight = "bold";


        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        removeBtn.addEventListener("click", function () {
            removefromStorage(i);
        });


        cardbody.append(cardTitle, cardCategory, cardBrand, cardPrice, removeBtn);


        card.append(cardHead, cardbody);

        cartProducts.append(card);

    });
}

function removefromStorage(i){
    arr.splice(i,1);
    localStorage.setItem("cart-list", JSON.stringify(arr));
    displayData(arr);
    updateCount();
}



function updateCount(){
    var totalPrice = 0;

    arr.forEach(function(ele){
        totalPrice += ele.price;
    })

    console.log(totalPrice);
    countPrice.textContent = `Cart total amount :${totalPrice}`;
}