const queries = require('./queries')

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {

        const device = { ...req.body }

        if (req.params.id) device.id = req.params.id

        try {
            const userFromDB = await app.db('users').where({ id: device.userId }).first()
            const categoryFromDB = await app.db('categories').where({ id: device.categoryId }).first()
            console.log(categoryFromDB)

            notExistsOrError(categoryFromDB.parentId == null, 'Dispositivo precisa estar dentro de uma categoria valida!')

            if (!userFromDB.admin) {
                let existPossibleSpam = await app.db('devices').where({ userId: device.userId })
                console.log(existPossibleSpam.length)
                notExistsOrError(existPossibleSpam.length >= 20, 'quer adicionar mais dispositivos? contate a nossa equipe')
            }

            existsOrError(device.name, 'Nome não informado')
            existsOrError(device.description, 'Descrição não informada')
            existsOrError(device.categoryId, 'Categoria não informada')
            existsOrError(device.userId, 'Autor não informado')

        } catch (msg) {
            res.status(400).send(msg)
            return
        }

        if (device.id) {
            app.db('devices')
                .update(device)
                .where({ id: device.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('devices')
                .insert(device)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('devices')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Dispositivo não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 6

    const get = async (req, res) => {

        const page = req.query.page || 1

        app.db({ d: 'devices', u: 'users', c: 'categories' })
            .select('d.id', 'd.name', 'd.description', 'd.image', 'd.categoryId', { categoryName: 'c.name' }, { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['c.id', 'd.categoryId'])
            .whereRaw('?? = ??', ['u.id', 'd.userId'])
            // .whereIn('categoryId', ids)
            .orderBy('d.id', 'desc')
            .then(devices => res.json(devices))
            .catch(err => res.status(500).send(err))
    }

    const getByUser = async (req, res) => {

        app.db('devices')
            .select('id', 'name', 'description')
            .where({ userId: req.params.id })
            .then(devices => res.json(devices))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('devices')
            .where({ id: req.params.id })
            .first()
            .then(device => {
                return res.json(device)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({ d: 'devices', u: 'users', c: 'categories' })
            // .select('a.id', 'a.name', 'a.description', { categoryName: 'c.name' }, { author: 'u.name' })
            .select('d.id', 'd.name', 'd.description', 'd.image', 'd.categoryId', { categoryName: 'c.name' }, { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['c.id', 'd.categoryId'])
            .whereRaw('?? = ??', ['u.id', 'd.userId'])
            .whereIn('categoryId', ids)
            .orderBy('d.id', 'name')
            .then(devices => res.json(devices))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getByUser, getById, getByCategory }
}