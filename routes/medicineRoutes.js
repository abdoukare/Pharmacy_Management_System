import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Medicine from "../models/Medicine.js";

// add a new medicine 
router.post('/', async(req, res) => {
    try{
        const medicine = new Medicine(req.body);
        await medicine.save();
        res.status(201).json(medicine);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

// get all medicines
router.get('/', async(req, res) => {
    try{
        const medicines = await Medicine.find();
        res.json(medicines);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// update a medicine
router.put('/:id', async(req, res) =>{
    try{
        const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(medicine);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// delete a medicine
router.delete('/:id', async(req, res) => {
    try{
        await Medicine.findByIdAndRemove(req.params.id);
        res.json({message: 'Medicine deleted successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

export default router;