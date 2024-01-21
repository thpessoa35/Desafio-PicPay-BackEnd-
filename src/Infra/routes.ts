import express, { Router } from 'express'
import { emailController } from '../Services';
import { transactionController } from '../UseCase/Transference/Create';
import { getController } from '../UseCase/Client/Get';
import { clientController } from '../UseCase/Client/Create';
import { getTransactionController } from '../UseCase/Transference/Get';
import { getIDtransactionController } from '../UseCase/Transference/GetID';

const router = express.Router()


router.get('/client', (req, res)=>{
    return getController.findALL(req, res)
});
router.post('/client', (req, res) => {
    return clientController.save(req, res)
});

router.get('/transaction', (req, res) => {
    return getTransactionController.findMany(req, res)
});
router.get('/transaction/:idTransfer', (req, res) => {
    return getIDtransactionController.FindUnique(req, res)
});

router.post('/transaction', (req, res) => {
    return transactionController.save(req, res)
});

export { router }