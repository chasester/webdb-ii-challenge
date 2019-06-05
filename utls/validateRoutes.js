const validateObject = require("./validateObject");
const db_action = require("../data/accounts-model");

function validateAccount(req, res, next) {
    let post =
    {
        name: req.body.name ? req.body.name.substring(0,128) : undefined,
        budget: req.body.budget
    }

    let str = validateObject(post);
    if(str !== "") res.status(400).json({error: `missed data: needs ${str}`});
    req.data = post;
    next();
};

function validateAccountId(req, res, next) {
    if(!req.params || !req.params.id || !parseInt(req.params.id) || req.params.id < 1) return res.status(400).json({error: "id is not defined"});
    db_action.findById(req.params.id)
    .then(result =>
    {
        if(!result || result.length==0) return res.status(400).json({error: "this id does not exist"})
        req.data = result;
        next();
    })
    .catch(error => res.status(500).json({error: error, message: "internal error of data"}) )
};


module.exports = {validateAccount, validateAccountId};