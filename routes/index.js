var express = require('express');
var router = express.Router();

const categories = ['cabeClass1','cabeClass2','cabeClass3', 'cabeClass4', 'cabeClass5', 'cabeClass6','cabeClass7', 'cabeClass8', 'cabeClass9', 'cabeClass10']
let EstablirCategories = (dades, categories = ['c1','c2','c3', 'c4', 'c5', 'c6'])=>{
  let infoSalidas = []; 

  // Linies a tractar
  let Numlinies = Array.from(new Set( dades.map(x=>x.linea))).sort((x,y)=>x-y)
  
  Numlinies.forEach(
      itemLin => {
          console.log(`\n\n Linia: ${itemLin} ------------------------------------------------`)
          let sentits = Array.from(new Set( dades.filter(x=>x.linea==itemLin).map(x=>x.sentido))).sort((x,y)=>x-y)
          console.log(`\n Sentits: ${sentits}`)
          sentits.forEach(itemSentit=>{
              let cabeceras = Array.from(new Set( dades.filter(x=>x.linea==itemLin && x.sentido==itemSentit).map(x=>x.Nodo))).sort((x,y)=>x-y)  
              console.log(`\n  Sentido: ${itemSentit} cabeceras: ${cabeceras}`)
              cabeceras.forEach(itemCabecera=>{
                  let salidas = Array.from(new Set( dades.filter(x=>x.linea==itemLin && x.sentido==itemSentit && x.Nodo==itemCabecera ))).length; 
  
                  console.log(` Linea: ${itemLin} Sentido: ${itemSentit} cabecera: Nd-${itemCabecera} Salidas: ${salidas}`)
                  infoSalidas.push({
                       "linea": itemLin, 
                       "sentido": itemSentit, 
                       "cabecera": itemCabecera, 
                       "salidas": salidas, 
                       "sorter" : itemLin*1e6 + itemSentit*1e4+ (1e3 - salidas)    // creixent per linia i sentit, decreixent per salidas
                  })
  
              })
  
          })
  
      }
  )
  
  // Ordenacio segons el numero de sortides que es fan en cada linia - sentit , primer el node on es fan més sortides , i despres els altres per ordre decreixent de sortides
  infoSalidas.sort((x,y)=>x.sorter-y.sorter);   // ordenació segons sorter:  creixent per linia i sentit, decreixent per salida
  
  // establir categories 
  
  let ln = 0; 
  let st = 0; 
  let i = 0 ; 
  // categories = ['c1','c2','c3', 'c4', 'c5', 'c6']
  infoSalidas.forEach(item=>{
      if ( ln!=item.linea || st!=item.sentido) {
          i = 0 ; 
          ln = item.linea; 
          st = item.sentido; 
          
      } else {
          i+=1;
      }
  
      item.categoria = categories[i];
  
  })

  return infoSalidas;

}


let InfoSalidasToMap = (infoSalidas)=>{
  let mp = new Map()
  // emplenant el Map
  infoSalidas.forEach(item=>{
      mp.set(
          `${item.linea}-${item.sentido}-${item.cabecera}`
          , item
      )
  
  })
  return mp;  
}





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/usuaris/raw', function(req, res, next) {
  const {rows:dades}= require('../jsonDB/sortidesLAB.json')

  res.jsonp(dades);
});

/* GET home page. */
router.get('/usuaris/:tp?', function(req, res, next) {
  const {rows:dades}= require('../jsonDB/sortidesLAB.json')
  const {rows:linies}= require('../jsonDB/Linies.json')

  // console.log(linies.map(x=>x.Nombre));
  let infoCategoriaSalidas = EstablirCategories(dades, categories); 
  let mapTpSalidas = InfoSalidasToMap(infoCategoriaSalidas); 

  const info= { 
      title: 'Usuaris - Sortides de capçaleres per sentit',
      dades: dades,  
      linies: linies, 
      infoCategoriaSalidas: infoCategoriaSalidas,
      mapTpSalidas:mapTpSalidas,
    }

  res.render('usuaris-paralel3',info  );
  // res.jsonp(dades);
});

module.exports = router;
