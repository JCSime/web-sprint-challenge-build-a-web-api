const router = require('express').Router()
const Projects = require('./projects-model')
const { validateID, validateProject, validateProjectPut } = require('./projects-middleware')


router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            console.log('test')
            res.status(200).json(projects)
        })
        .catch(next);
})

router.get('/:id', validateID, (req, res, next) => {
            res.status(200).json(req.proj)

})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})

router.put('/:id', validateProject, validateProjectPut, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(proj => {
            res.status(200).json(proj)
        })
        .catch(next)
})

router.delete('/:id', validateID, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'Success'})
        })
        .catch(next)
})

router.get('/:id/actions', validateID, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(acts => {
            res.status(200).json(acts)
        })
        .catch(next)
})


module.exports = router;