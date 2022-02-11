// Write your "actions" router here!
const router = require('express').Router()

const Actions = require('./actions-model')

const { validateID, validateAction, validateActionPut } = require('./actions-middlware')

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get('/:id', validateID, (req, res, next) => {
            res.status(200).json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.put('/:id', validateID, validateAction, validateActionPut, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.delete('/:id', validateID, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'Success'})
        })
        .catch(next)
})



module.exports = router;