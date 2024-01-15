import express, { Router } from 'express'
import { clientController } from '../UseCase/Client'
import { emailController } from '../Services';
import {  transactionController } from '../UseCase/Transference/Create';

 const router = express.Router()

router.post('/client', (req,res)=>{
    return clientController.save(req,res)
});

router.post('/send-email',(req, res)=>{
    return emailController.sendEmail(req, res)
})
router.post('/transaction', (req, res)=>{
    return transactionController.save(req, res)
})



export { router }