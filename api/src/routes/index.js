const { Router } = require('express');
const axios = require ('axios');
const { Breed, Temperament } = require ('../db.js');

// Initialize an instance of express
const router = Router();


const { API_KEY } = process.env;
const url = `https://api.thedogapi.com/v1/breeds`;
const config = {
    headers:{"x-api-key":  API_KEY}
};



// -----------------   Functions   ------------------
async function breedsFromApi(){
    let br = await axios.get(url,config);
    let br2 = [];
    br.data.forEach(el => {
      br2.push({
        id: el.id,
        name: el.name,
        height: el.height.metric,
        weight: el.weight.metric,
        life_span: el.life_span,
        image: el.image.url,
        temperament: el.temperament? el.temperament : 'Loyal, like all Dogs',
        createdInDatabase: false
      })  
    });
    return (br2);
};


async function breedsFromDB(){
    let br = await Breed.findAll({
        include:{
            model: Temperament,
            attribute: ['name'],
            through: {attributes: []}
        },
        //raw: true, // To show the info in the form of an object, and be able to modify it if necessary
        //nest: true, // To include, in object form the associations (each value of these separately by properties)
    });

    let br1 = JSON.stringify(br);
    let br2 = JSON.parse(br1);

    for(let i=0; i<br2.length; i++){
        br2[i]={
            ...br2[i],
            temperament: br2[i].Temperaments? (br2[i].Temperaments.map(g=>g.name).join(', ')) : ('Loyal, like all Dogs'),
            life_span: br2[i].life_span? (br2[i].life_span) : ('many years')
        };
        delete br2[i].Temperaments;
    };
    
    return(br2);
};


async function breedsALL(){
    let dogs1 = await breedsFromApi();
    let dogs2 = await breedsFromDB();
    let dogs3 = dogs1.concat(dogs2);
    return (dogs3);
};

function searchBreed(array, name){
    let find1 = array.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    if(find1.length) return (find1);
    return ('Error')
};


async function temperaments(){
    let tem1 = await axios.get(url);
    let tem2 = tem1.data.map(b => b.temperament).join(', ').split(', ');
    tem2 = tem2.filter(t=>t !== '');
    tem2.forEach(te => { Temperament.findOrCreate({where: {name: te}}); });
    let tem3 = await Temperament.findAll();
    return (tem3);
};


async function createBreed (name, height, weight, life_span, image, temperament){
    try{
        let [instance, created] = await Breed.findOrCreate({
            where: {name: name},
            defaults: {name, height, weight, life_span, image}
        });
        if(created){
            const tempDb = await Temperament.findAll({where: {name: temperament}});
            // We add temps to new Breed //addTemperament => method provided by sequelize.
            await instance.addTemperament(tempDb);
            return ('The Breed was successfully created');
        }else{
            return ('The Breed already exists');
        };
    }catch(e){
        console.log(e);
        return ('Error');
    };
};



// -----------------    Routes     ------------------
router.get('/dogs', async function(req, res, next){
    let dogsAll = await breedsALL();
    const {name} = req.query;
    if(!name) return res.status(200).json(dogsAll);

    let search = searchBreed(dogsAll, name);
    if (search === 'Error') return res.status(404).send('Name not found');
    return res.status(200).json(search);
});


router.get('/dogs/:IDBreed', async function(req, res, next){
    let dogsAll = await breedsALL();
    const {IDBreed} = req.params;
    const findById = dogsAll.find(b => b.id.toString() === IDBreed);
   
    if(!findById) return res.status(404).send('Id not found');
    return res.status(200).json(findById);
});


router.get('/temperaments', async function(req, res, next){
    const allTemperaments = await temperaments();
    return res.status(200).json(allTemperaments); 
});


router.post('/dogs', async function(req,res,next){
    const {name, height, weight, life_span, image, temperament} = req.body;
    let create = await createBreed(name, height, weight, life_span, image, temperament);

    if(create === 'Error') return res.status(400).send('Error in the process, sorry cheap')
    return res.status(200).send(create);
});


router.delete('/dogs', async function(req,res,next){
    const {id} = req.body;
    let delItem = await Breed.findOne({where: { id: id }});  // null if it doesn't find it
    delItem.destroy();

    if(!delItem) return res.status(400).send('Error, breed not found to delete');
    return res.status(200).send('Item deleted successfully');
});



module.exports = router;
