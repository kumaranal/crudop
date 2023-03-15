const express=require("express");
const { savefn, updatefn, deletefn, getfn } = require('../controllers/todocontroller');

const router=express.Router()

router.get('/view',getfn)
router.post('/save',savefn)
router.post('/update',updatefn)
router.post('/delete',deletefn)

module.exports=router;