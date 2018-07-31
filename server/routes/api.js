const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const reponse = require('../models/reponse');

const db = "mongodb://qstuser:data123@ds247171.mlab.com:47171/qstapp";


mongoose.Promise = global.Promise;
mongoose.connect(db, function(err) {
    if(err) {
        console.log('Error connecting');
    }
});
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
router.get('/all', function(req, res) {

    reponse.find({})
        .exec(function(err, reponses) {
            if (err) {
                console.log('Error getting the reponses');
            } else {
                console.log(reponses);
                res.json(reponses);
            }
        });
});
router.get('/reponse/:id', function(req, res) {
    console.log('Requesting a specific reponse');
    reponse.findById(req.params.id)
        .exec(function(err, reponse) {
            if (err) {
                console.log('Error getting the Reponse');
            } else {
                res.json(reponse);
            }
        });
});

router.post('/create', function(req, res) {
    console.log('Posting an Reponse');
    var newReponse = new reponse();
    newReponse.nom = req.body.nom;
    newReponse.prenom = req.body.prenom;
    newReponse.genre = req.body.genre;
    newReponse.age = req.body.age;
    newReponse.etat = req.body.etat;
    newReponse.emploi = req.body.emploi;
    newReponse.enfantcharge = req.body.enfantcharge;
    newReponse.autrecharge = req.body.autrecharge;
    newReponse.object1 = req.body.object1;
    newReponse.object2 = req.body.object2;
    newReponse.object3 = req.body.object3;
    newReponse.horizon = req.body.horizon;
    newReponse.tolerance1 = req.body.tolerance1;
    newReponse.tolerance2 = req.body.tolerance2;
    newReponse.tolerance3 = req.body.tolerance3;
    newReponse.tolerance4 = req.body.tolerance4;
    newReponse.renseignement1 = req.body.renseignement1;
    newReponse.renseignement2 = req.body.renseignement2;
    var t = req.body.renseignement2.filter(function(o) { return o == true }).length;
    if (t<3) {
        t=2;
    } else { 
        if (t>=3 && t<=5) {
            t=4;
        } else { 
            if (t>=6 && t<=8) {
                t=6;
            } else { 
                t=8;
            }
        }
    }
    
    newReponse.renseignement22 = t;
    newReponse.renseignement3 = req.body.renseignement3;
    newReponse.minrendement = req.body.minrendement;
    newReponse.maxpert = req.body.maxpert;
    
    newReponse.save(function(err, reponse) {
        if(err) {
            console.log('Error inserting the Reponse');
        } else {
            res.json(reponse);
        }
    });
});


module.exports = router;