let fruits = [
    {
        id: 1,
        title: 'Яблоки',
        price: 20,
        img: 'https://media.istockphoto.com/photos/red-apple-picture-id495878092?k=20&m=495878092&s=612x612&w=0&h=82oywskr04hhnuXr9PC6PoGvEHVPNmVs_HicDa0orls='
    },
    {
        id: 2,
        title: 'Апельсины',
        price: 30,
        img: 'https://static9.depositphotos.com/1642482/1148/i/950/depositphotos_11489401-stock-photo-orange-fruit.jpg'
    },
    {
        id: 3,
        title: 'Манго',
        price: 40,
        img: 'https://media.istockphoto.com/photos/mango-picture-id467328250?k=20&m=467328250&s=612x612&w=0&h=b21g4jLnkNRkcOX84X_Vn-z1gHnLW1n3RXK8bKV692s='
    }

]

const toHTML = fruit => `
<div class="col">
            <div class="card" style="width:18rem;">
                <img class="card-img-top" src="${fruit.img}" alt="${fruit.title}">
                <div class="card-body">
                    <h5 class="card-title">${fruit.title}</h5>
                    <a href="#" class="btn btn-primary "data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                    <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
                </div>
            </div>
        </div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal =$.modal({
    title:"Цена на товар",
    closable: true,
    width:'400px',
    footerButtons: [
        {text:'Закрыть',type:'primary',handler(){
            priceModal.close()
            }}
    ]
})

document.addEventListener("click", event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
            <p> Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()


    } else if (btnType === 'remove') {
        $.confirm({
            title:'Вы уверены',
            content:`<p> Вы удаляете фрукт:<strong>${fruit.title}</strong></p>`

        }).then(()=>{
            fruits = fruits.filter(f=>f.id !==id)
            render()
        }).catch(()=>{
            console.log('cancel')
        })

    }
})