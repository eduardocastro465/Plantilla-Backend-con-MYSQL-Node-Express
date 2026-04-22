import { Router } from 'express';
import {
    getLogs, getLogById, getLogsByUserId, getLogsByDate, getLogsByNivel,
    getLogsByRuta, getLogsByDateRange, getLogsByStatusCode, getLogsStats
} from '../../controllers/auth/log.controller.js';
import { deleteLog, deleteLogsByDateRange, deleteAllLogs }
    from '../../controllers/auth/log.controller.js';


const router = Router();

router.get('/', getLogs);
router.get('/stats', getLogsStats);
router.get('/ruta', getLogsByRuta);
router.get('/rango', getLogsByDateRange);
router.get('/nivel/:nivel', getLogsByNivel);
router.get('/status/:status', getLogsByStatusCode);
router.get('/date/:date', getLogsByDate);
router.get('/user/:id', getLogsByUserId);
router.get('/:id', getLogById);


router.delete('/:id', deleteLog);
router.delete('/rango', deleteLogsByDateRange);
router.delete('/', deleteAllLogs);

export default router;