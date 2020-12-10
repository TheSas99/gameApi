// Database model for cool people
const gameModel = require('../models/gameModel')
const paginationHelper = require('../PaginationHelper')

let controller = {

index: function(req, res){

    // count all documents
    gameModel.countDocuments({}, function(err, count){

        // if get limit is set, take that value. else get all documents
        let limit = (req.query.limit != null ? parseInt(req.query.limit) : count)

        // if get start is set, take that value. else start at 1
        let start = (req.query.start != null ? parseInt(req.query.start) : 1)

        let documentCount = count

        gameModel.find({})
            .limit(limit)
            .skip((start != 0 ? start * limit - limit : 0))
            .exec(function(err, project){

            if(err){
                res.status(500).send(err)
            
            } else{
                // return json compliled over at the pagination helper
                res.json(paginationHelper.formatResouceData(project, start, count, limit, req)) 
            }
        })
    })
},
show: function (req, res) {
    
    let id = req.params.id
    let resourceUrl = req.protocol + '://' + req.get('host')+'/games/'

    gameModel.findById(id, function(err, game){
        if(err){
            return res.status(404).send(err).end()
        } else {  
            if(game == null){
                return res.status(404).send("not found").end()
            }
            game._links = {
                self: {
                href: resourceUrl+game._id
                },
                collection: {
                    href: resourceUrl
                }
            }
            res.json(game)
        }
    })
},
create: function(req, res){
    console.log(req.body)
    let form = req.body
    let newGame = gameModel({title: form.title, developer: form.developer, desc: form.desc})

    newGame.save(function(err){
        if (err) return res.status(400).send(err)
        console.log('saved!')
        return res.status(201).json({message: 'success'})
    })
},
update: function(req, res){
    let id = req.params.id
    let form = req.body
    
    gameModel.findById(id, function(err, game){
        if(err){
            return res.status(404).send(err).end()
        } else {  
            if(game == null){
                return res.status(404).send("not found").end()
            }
            
            game.title = form.title
            game.developer = form.developer
            game.desc = form.desc

            game.save(function(err){
                if (err) return res.status(400).send(err)
                console.log('saved!')
                return res.status(200).json(game)
            })

        }
    })
},
delete: function(req, res){

    let id = req.params.id
    gameModel.findByIdAndDelete(id, function(err){
        if(err) return res.status(404).send(err)
    })
    return res.status(204).json({message: 'success'})
    
},
options: function(req, res){
    res.header('Allow', 'GET, POST, OPTIONS')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.sendStatus(200).end()
},
optionsDetail: function(req, res){
    res.header('Allow', 'GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
    res.sendStatus(200).end()
},
}
module.exports = controller