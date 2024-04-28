const api = "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products";
let pageNumber = 1;

const fetchData = async (url, queryparams = "") => {
    try {
        let res = await fetch(`${url}${queryparams}`);
        let data = await res.json();
        let maindata = data.data;
        console.log(maindata);
        displayData(maindata);
    } catch (error) {
        console.log(error);
    }
}

let productsContainer = document.getElementById("products-container");

async function displayData(data) {
    productsContainer.innerHTML = "";
    data.forEach(function (ele) {
        let card = document.createElement("div");
        card.setAttribute("class", "product");
        card.setAttribute("data-id", ele.id);
        let cardHead = document.createElement("div");
        cardHead.setAttribute("class", "product-img");

        let cardbody = document.createElement("div");
        cardbody.setAttribute("class", "product-body");


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


        let addBtn = document.createElement("button");
        addBtn.textContent = "Add to Cart";

        addBtn.addEventListener("click", function () {
            addtoCart(ele);
        });


        cardbody.append(cardTitle, cardCategory, cardBrand, cardPrice, addBtn);


        card.append(cardHead, cardbody);

        productsContainer.append(card);

    });
}

function addtoCart(product) {
    var cartList = JSON.parse(localStorage.getItem("cart-list")) || [];
    cartList.push(product);
    localStorage.setItem("cart-list", JSON.stringify(cartList));;
}


let paginationContainer = document.getElementById("pagination-container");
// let pagination = (totalcount, limmit1, queryparams) => {
//     let total = totalcount;
//     let limit = limmit1;
//     let noOfbtn = Math.ceil(total / limit);
//     paginationContainer.innerHTML = "";
//     for (var i = 1; i <= noOfbtn; i++) {
//         let btn = document.createElement("button");
//         btn.textContent = i;
//         btn.addEventListener("click", (event) => {
//             fetchData(`${api}?page=${event.target.textContent}&limit=5`, queryparams);
//         });
//         paginationContainer.append(btn);
//     }

// }

let sorting = document.getElementById("sortingVal");
sorting.addEventListener("change", () => {
    let sortingValue = sorting.value;
    console.log(sortingValue);
    fetchData(`${api}?&sort=price&order=${sortingValue}`);
});

let filtering = document.getElementById("filterVal");
filtering.addEventListener("change", () => {
    let filteringValue = filtering.value;
    console.log(filteringValue);
    fetchData(`${api}?&filter=${filteringValue}`);
});
fetchData(`${api}`);