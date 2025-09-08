const allTree = () => {
    const url = 'https://openapi.programming-hero.com/api/plants';

    fetch(url)
        .then(responce => responce.json())
        .then(data => { // array of object
            console.log(data);
            displayCard(data);
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

        const EachCard = document.createElement('div');
        EachCard.innerHTML = `
        <div class="each-card">
            
            <h2>${obj.category}</h2>
            <p>${obj.description}</p>
            
        </div>
    `;
        cardContainer.append(EachCard);
    });
};
allTree();