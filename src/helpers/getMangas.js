const manga = [
    {
        id: '1',
        title: 'Berserk',
        genero: 'Shounen',
        price: 600,
        picture: '../../images/tapaMangas/TapaBerserk.jpg',
        stock: 15
    },{
        id: '2',
        title: 'Naruto',
        genero: 'Shounen',
        price: 700,
        picture: '../../images/tapaMangas/TapaNaruto.jpg',
        stock: 20
    },{
        id: '3',
        title: 'Kimetsu no Yaiba',
        genero: 'Shojo',
        price: 800,
        picture: '../../images/tapaMangas/TapaKimetsuNoYaiba.jpg',
        stock: 10
    },{
        id: '4',
        title: 'Shingeki no Kyojin',
        genero: 'Shojo',
        price: 900,
        picture: '../../images/tapaMangas/TapaShingekiNoKyojin.jpg',
        stock: 8
    }
]

export const getMangas = new Promise((res,rej) => {
    setTimeout(() => {
        res(manga);
    },2000);

})
