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
        const updatedMedicines = medicines.map(medicine => {
            medicine.status = medicine.calculateStatus();
            return medicine
        })
        await Promise.all(updatedMedicines.map(medicine => medicine.save()));
        res.json(updatedMedicines);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// update a medicine
router.put('/', async(req, res) =>{
    try{
       const { id, ...updateData } = req.body;
       const medicine = await Medicine.findById(id);

       if (!medicine) {
         return res.status(404).json({ error: "Medicine not found" });
       }

       Object.assign(medicine, updateData);
       await medicine.save();
       
       res.json(medicine);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// delete a medicine
router.delete('/', async(req, res) => {
    try{
        const { id } = req.body
        await Medicine.findByIdAndDelete(id);
        res.json({message: 'Medicine deleted successfully'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

export default router;