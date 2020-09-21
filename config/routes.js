const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.saveById)
        .get(app.api.user.getById)
        .delete(app.api.user.removeById) // verificar se é o usuario logado

    app.route('/user/:id/upload-image')
        .all(app.config.passport.authenticate())
        .post(app.api.user.saveByIdImage)

    app.route('/user/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByUser)

    app.route('/user/:id/categories')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getByUser)

    app.route('/user/:id/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTreeByUser)

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(app.api.category.get)
        // .post(admin(app.api.category.save))
        .post(app.api.category.save)

    app.route('/categories/tree')
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .get(app.api.category.getById)
        // .all(app.config.passport.authenticate())
        .put(app.api.category.save)
        .delete(app.api.category.remove)
    // .put(admin(app.api.category.save))
    // .delete(admin(app.api.category.remove))

    app.route('/articles')
        // .all(app.config.passport.authenticate())
        .get(app.api.article.get)
        .post(app.api.article.save)

    app.route('/articles/:id')
        .get(app.api.article.getById)
        // .all(app.config.passport.authenticate())
        .put(app.api.article.save) //temporario
        .delete(app.api.article.remove)

    app.route('/categories/:id/articles')
        .get(app.api.article.getByCategory)
}