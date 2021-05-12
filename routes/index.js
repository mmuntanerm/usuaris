var express = require('express');
var router = express.Router();

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

  const info= { 
      title: 'Usuaris - Sortides de capçaleres per sentit',
      dades: dades,  
      linies: linies, 
    }

  res.render('usuaris-paralel2',info  );
  // res.jsonp(dades);
});

module.exports = router;
