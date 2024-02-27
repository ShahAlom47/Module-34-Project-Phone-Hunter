
const inputFild = document.getElementById('input-fild')


const searchAction = (seeAll) => {
    loading(isLoading=true);
    let searchValue = inputFild.value;
    let defult = `https://openapi.programming-hero.com/api/phones?search=s`
    let url = `https://openapi.programming-hero.com/api/phones?search=${searchValue || defult }`

    fetch(url )
        .then(res => res.json())
       .then(data =>printCard(data,seeAll));
       
}

const printCard = (data,seeAll) => {
    let cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML='';
    let showBtn = document.getElementById('see-all');
    
    let phoneData = data.data;
    if(phoneData.length>12 && !seeAll){
        showBtn.classList.remove('hidden')

    }
    else{
        showBtn.classList.add('hidden')
    }
   
    if(!seeAll){
        phoneData = phoneData.slice(0, 12)
    }
  


    phoneData.forEach(element => {
      
      
        let createCard = document.createElement('div');
        createCard.classList=('card  bg-base-100 shadow-xl')
        createCard.innerHTML=`
        <figure class="px-10 pt-10">
        <img src="${element.image}" />
                   
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${element.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <h2 id="price" class="card-title">$999</h2>
        <div class="card-actions">
          <button onclick=" phoneModal('${element.slug}')" class="btn btn-sm my-5">Show Details</button>
        </div>
      </div>
        `
        cardContainer.appendChild(createCard);
        loading(isLoading=false);
      
        
    });
   

}


// loading function 

const loading =(isLoading)=>{
     const loading = document.getElementById('loading');


    if(isLoading){
        loading.classList.remove('hidden')
    }
    else{
        loading.classList.add('hidden')
    }
} 


const seeAllAction =()=>{
    searchAction(true);
  

}

// phone details modal
let phoneModal= (id) =>{

      let url = `https://openapi.programming-hero.com/api/phone/${id}`

    fetch(url)
        .then(res => res.json())
       .then(data =>showModal(data));
       
}

let showModal= (data)=>{
    let dataObj =data.data;
let modalContsiner = document.getElementById('modal-container');

let makeModal = document.createElement('div');
makeModal.innerHTML=`
<dialog id="my_modal" class="modal">
<div class="modal-box">
    <img src="${dataObj.image}" alt="">
    <h3 class="font-bold text-lg">"${dataObj.name}"</h3>
    <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p class="font-semibold">Storage:<span class="font-normal">"${dataObj.mainFeatures.storage}"</span></p>
    <p class="font-semibold">Display:<span class="font-normal">>"${dataObj.mainFeatures.displaySize}"</span></p>
    <p class="font-semibold">Memory:<span class="font-normal">>"${dataObj.mainFeatures.memory}"</span></p>
    <p class="font-semibold">Release Date:<span class="font-normal">"${dataObj.releaseDate}"</span></p>
    <p class="font-semibold">Brand:<span class="font-normal">"${dataObj.brand}"</span></p>
    <div class="modal-action">
        <form method="dialog">
            
            <button class="btn">Close</button>
        </form>
    </div>
</div>
</dialog>  
`
modalContsiner.appendChild(makeModal);
    my_modal.showModal();


   console.log(data);
}


searchAction(true);
