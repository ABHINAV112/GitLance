var express = require("express");
var router = express.Router();
var admin = require("firebase-admin");
var db = admin.firestore();
var cors = require('cors')({origin: true});

module.exports = () =>{
    router.use(cors);
    router.post("/makeTransaction",async (req,res)=>{
        var from = req.body.from;
        var to = req.body.to;
        var amount = req.body.amount;
        var fromAmountDoc = await db.collection('money').doc(from);
        var toAmountDoc = await db.collection('money').doc(to);
        var fromAmount = await fromAmountDoc.get();
        var toAmount = await toAmountDoc.get();
        toAmount = toAmount.data();
        fromAmount = fromAmount.data()
        if(fromAmount.money<amount){
            return res.send({'paymentStatus':false});
        }
        fromAmountDoc.set({'money':Number(fromAmount.money)-Number(amount)});
        toAmountDoc.set({'money':Number(toAmount.money)+Number(amount)});
        return res.send({'paymentStatus':true});
    })

    router.post("/checkBalance",async(req,res)=>{
        var userId = req.body.userId;
        var documentData = await db.collection('money').doc(userId).get();
        if(!documentData.exists){
            db.collection('money').doc(userId).set({'money':50});
            return res.send({'money':50});
        }
        return res.send(documentData.data());
    })

    return(router);
}