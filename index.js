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
        category :  "Fruit Tree"
         description :  "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals."
         id :  1
         image :  "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg"
         name :  "Mango Tree"
         price :  500
         */
        // console.log(obj);
        const EachCard = document.createElement('div');
        EachCard.innerHTML = `
        <div class="each-card bg-white h-100%">
                    <img src=" ${obj.image}" alt="" class="w-full h-40 rounded-xl">
                    <h2 class="text-xl font-bold mt-2 pl-3">${obj.name}</h2>
                    <p class="mb-2 p-3">${obj.description} </p>
                    <div class="flex justify-between mx-3">
                        <p class="bg-amber-50 px-4 pt-1 rounded-xl border-1 text-green-500">${obj.category}</p>
                        <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span class="text-2xl font-bold text-green-700">${obj.price} </span></p>
                    </div>
                    <div class="mx-8">
                        <button class="bg-green-400 w-full my-4 rounded-4xl py-1 mb-2  text-xl hover:bg-amber-500">Add to Cart</button>
                    </div>

                </div>
    `;
        cardContainer.append(EachCard);
    });
};
allTree();



// categories container

const categoryLoad = () => {
    const url = 'https://openapi.programming-hero.com/api/categories';

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            display(data.categories);
        });
};

const display = (categories) => { // all object

    /*
    category_name: "Fruit Tree"
    id: 1
    small_description: "Trees that bear edible fruits like mango, guava, and jackfruit. */

    const categoriesContainer = document.getElementById("category-container");

    categoriesContainer.innerHTML = "";

    categories.forEach((category) => {

        const Button = document.createElement('div');
        Button.innerHTML = `
    
                        <button class="text-xl  hover:bg-green-700 mt-1 rounded-xl w-full text-left p-2 hover:text-white">${category.category_name}</button>
                    </div>   
    `;
        categoriesContainer.appendChild(Button);
    });
};
 categoryLoad();