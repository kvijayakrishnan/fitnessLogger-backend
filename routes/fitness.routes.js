const express = require('express');
const Fitness = require('../model/fitness.model.js');
const router = express.Router();    




// to get all fitness dashboard
router.get('/fitness', async(req,res)=>{
    try{
            const data = await Fitness.find();
            res.status(200).send(data);
    }catch(err){
        res.status(500).send({message:'Internal server error'});
    }
});

// to get single fitness log
router.get('/fitness/:id', async(req,res) =>{
    try{
        const fitnesID = req.params.id
        console.log(fitnesID);
      let data = await Fitness.findOne({_id: req.params.id},)
         res.status(200).send(data);
    }catch(err){
        res.status(500).send({message:'Internal server error'})
    }
})



// Add new fitness log

router.post('/fitness', async(req,res) => {
    const data = req.body;
    const fit = new Fitness(data);
   try{
    const fitn = await fit.save()
    res.status(200).json(fitn)
   }catch(err){
    res.status(500).send({message:'Internal server error'})
   }
});



// To update an fitness log
router.put('/fitness/:fitID', async (req,res) => {
    try{
        const fitnessID = req.params.fitID;
        await Fitness.findOneAndUpdate({_id: fitnessID},{$set:req.body})
             res.status(200).send({id:req.params.fitID, message:"Fitness log has updated successfully.. "});
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Internal server error"})
    }
})



// delete log
router.delete('/fitness/:fitID', async (req, res) =>{
    try{
        const fitnessID = req.params.fitID;
        
       await Fitness.deleteOne({_id:fitnessID})
                   res.status(200).send({message:"Fitness log is deleted successfully..."})
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Internal server error"})
    }
})
















module.exports = router;
