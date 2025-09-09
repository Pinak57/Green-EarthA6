// show modal section calling
const openModal = (name, image, category, price, description) => {
    document.getElementById("modal-img").src = image;
    document.getElementById("modal-title").innerText = name;

    document.getElementById("modal-category").innerText = `Category: ${category}`;
    document.getElementById("modal-price").innerText = `Price :৳ ${price}`;
    document.getElementById("modal-description").innerText = `Description : ${description}`;
    document.getElementById("treeModal").showModal();
};

const closeModal = () => {
    document.getElementById("treeModal").close();
};


// your cart section calling

let totalPrice = 0;

const addToCart = (treeName, price) => {
    alert(`${treeName} has been added to the cart.`);

    const cartSection = document.getElementById("cart-section");

    const item = document.createElement("div");
    item.className = "flex justify-between items-center bg-amber-50 px-3 py-2 rounded-xl mb-2";

    item.innerHTML = `
        <span class="text-green-700 font-semibold">${treeName}</span>
        <span class="text-green-700 font-bold">৳ ${price}</span>
        <button onclick="removeItem(this, ${price})" class="text-red-600 text-xl font-bold">❌</button>
    `;

    cartSection.appendChild(item);

    totalPrice += price;
    updateTotal();
};

const removeItem = (btn, price) => {
    btn.parentElement.remove();
    totalPrice -= price;
    updateTotal();
};

const updateTotal = () => {
    let totalDisplay = document.getElementById("cart-total");
    if (!totalDisplay) {
        totalDisplay = document.createElement("p");
        totalDisplay.id = "cart-total";
        totalDisplay.className = "text-xl font-bold mt-4 text-green-800";
        document.getElementById("cart-section").appendChild(totalDisplay);
    }
    totalDisplay.innerText = `Total: ৳ ${totalPrice}`;
};

// card-container

const allTree = () => {
    const url = 'https://openapi.programming-hero.com/api/plants';

    fetch(url)
        .then(response => response.json())
        .then(data => { // 
            displayCard(data.plants);
        });
};

const displayCard = (ArrayOFobj) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    ArrayOFobj.forEach(obj => {
        /* 
//         category :  "Fruit Tree"
//          description :  "A fast-growing tropical tree that produces delicious, juicy mangoes during   summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals."
//          id :  1
//          image :  "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg"
//          name :  "Mango Tree"
//          price :  500
//          */
        const EachCard = document.createElement('div');
        EachCard.innerHTML = `
        <div class="each-card bg-white h-100%">
            <img src="${obj.image}" alt="" class="w-full h-40 rounded-xl">
            <h2 onclick="openModal('${obj.name}', '${obj.image}', '${obj.category}', ${obj.price}, \`${obj.description}\`)" 
                class="text-xl font-bold mt-2 pl-3 cursor-pointer hover:text-green-700">${obj.name}</h2>
            <p class="mb-2 p-3">${obj.description}</p>
            <div class="flex justify-between mx-3">
                <p class="bg-amber-50 px-4 pt-1 rounded-xl border-1 text-green-500">${obj.category}</p>
                <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span class="text-2xl font-bold text-green-700">${obj.price}</span></p>
            </div>
            <div class="mx-8">
                <button onclick="addToCart('${obj.name}', ${obj.price})" 
                    class="cursor-pointer bg-green-400 w-full my-4 rounded-4xl py-1 mb-2 text-xl hover:bg-amber-500">
                    Add to Cart
                </button>
            </div>
        </div>
        `;
        cardContainer.appendChild(EachCard);
    });
};

allTree();




//filter category section calling
const load_category_filter = (categoryId) => {
    const url = 'https://openapi.programming-hero.com/api/plants';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const allTrees = data.plants;

            // Find the category name using the ID
            fetch('https://openapi.programming-hero.com/api/categories')
                .then(res => res.json())
                .then(categoryData => {
                    const selectedCategory = categoryData.categories.find(cat => cat.id === categoryId);
                    const categoryName = selectedCategory?.category_name;

                    // Filter trees by category name
                    const filteredTrees = allTrees.filter(tree => tree.category === categoryName);

                    displayCard(filteredTrees);
                });
        });
};




// categories container

const categoryLoad = () => {
    const url = 'https://openapi.programming-hero.com/api/categories';

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            display(data.categories);
        });
};


const display = (categories) => {

    /*
    category_name: "Fruit Tree"
    id: 1
     small_description: "Trees that bear edible fruits like mango, guava, and jackfruit. */

    const categoriesContainer = document.getElementById("category-container");
    categoriesContainer.innerHTML = "";

    categories.forEach((category) => {
        const button = document.createElement('button');
        button.className = "cursor-pointer category-btn text-xl mt-1 rounded-xl w-full text-left p-2 hover:bg-green-400 hover:text-white";
        button.innerText = category.category_name;

        button.onclick = () => {
            // Remove active class from all buttons
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('bg-green-700', 'text-white');
            });

            // Add active class to clicked button
            button.classList.add('bg-green-700', 'text-white');

            // Load filtered trees
            load_category_filter(category.id);
        };

        categoriesContainer.appendChild(button);
    });
};
categoryLoad();

