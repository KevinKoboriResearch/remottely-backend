const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError, fullNameOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

        // if (!req.originalUrl.startsWith('/users')) user.role = 'viewer'
        // if (!req.user || !req.user.role) user.role = 'viewer'

        try {
            existsOrError(user.name, 'Nome não informado')
            fullNameOrError(user.name, 'O nome precisa ser completo')
            existsOrError(user.phone, 'Celular não informado')
            // emailOrError(user.phone, 'Formato de celular inválido')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(user.password, user.confirmPassword,
                'Senhas não conferem')

            const userFromDB = await app.db('users')
                .where({ phone: user.phone }).first()
            if (!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'phone', 'role', 'image')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const devices = await app.db('devices')
                .where({ userId: req.params.id })
            notExistsOrError(devices, 'Usuário possui artigos.')

            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'phone', 'role', 'image')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const saveById = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

        // if (!req.originalUrl.startsWith('/users')) user.role = 'viewer'
        // if (!req.user || !req.user.role) user.role = 'viewer'

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.phone, 'Celular não informado')
            // emailOrError(user.phone, 'Formato de celular inválido')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(user.password, user.confirmPassword,
                'Senhas não conferem')

            const userFromDB = await app.db('users')
                .where({ phone: user.phone }).first()
            if (!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const saveByIdImage = async (req, res) => {
        const image = { ...req.body }

        try {
            existsOrError(image, 'imagem não informada')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        const userFromDB = await app.db('users')
            .where({ id: req.params.id }).first()

        // var reader = new FileReader()
        // userFromDB.image = reader.readAsDataURL(image)
        userFromDB.image = image

        app.db('users')
            .update(userFromDB)
            .where({ id: userFromDB.id })
            .whereNull('deletedAt')
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const removeById = async (req, res) => {
        try {
            const devices = await app.db('devices')
                .where({ userId: req.params.id })
            notExistsOrError(devices, 'Você possui artigos.')

            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Você não foi encontrado no BD.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { get, save, remove, getById, saveById, saveByIdImage, removeById }
}