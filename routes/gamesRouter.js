const gameController = require('../controllers/gameController')


let router = function(express){

    let gameRouter = express.Router()
    // Show complete list games
    gameRouter.get('/', gameController.index);
    // create a single game
    gameRouter.post('/', gameController.create);
    // show the total game list options
    gameRouter.options('/', gameController.options);
    // show a single game
    gameRouter.get('/:id', gameController.show);
    // update a single game
    gameRouter.put('/:id', gameController.update);
    // deelete a single game
    gameRouter.delete('/:id', gameController.delete);
    // show single game page options
    gameRouter.options('/:id', gameController.optionsDetail);

    return gameRouter
}

module.exports = router

