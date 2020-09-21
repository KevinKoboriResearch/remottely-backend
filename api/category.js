module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        let category = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId,
            userId: req.body.userId
        }
        // console.log(category)

        const userFromDB = await app.db('users').where({ id: req.body.userId }).first()


        if (!userFromDB.admin) {
            if (req.body.id != null || req.body.id != undefined) {
                let category2 = await app.db('categories').where({ id: req.body.id, userId: req.body.userId }).first()
                category.parentId = category2.parentId
            }
            // console.log(category.name)
            if (category.parentId == null) {
                let existSameNameRoot = await app.db('categories').where({ name: category.name, parentId: null }).first()

                try {
                    notExistsOrError(existSameNameRoot, 'Nome já existe')
                } catch (msg) {
                    return res.status(400).send(msg)
                }

                let existOneNotAdmin = await app.db('categories').where({ userId: category.userId, parentId: null }).first()
                // console.log(existOneNotAdmin)
                if (existOneNotAdmin) {
                    if (category.id != existOneNotAdmin.id) {
                        try {
                            notExistsOrError(existOneNotAdmin, 'Você só pode criar um Nó Raiz')
                        } catch (msg) {
                            return res.status(400).send(msg)
                        }
                    }
                }
            }
        }

        if (category.id !== undefined && category.parentId === undefined) {
            const cat = await app.db('categories').where({ id: category.id }).first()
            category.parentId = cat.parentId
        }
        try {
            existsOrError(category.name, 'Nome não informado')
            existsOrError(category.userId, 'usuario não informado')

            if (category.parentId === null || category.parentId === undefined) {
                console.log('2')
                const categoryFromDB = await app.db('categories')
                    .where({ name: category.name, parentId: null }).first()
                notExistsOrError(categoryFromDB, 'Nome da categoria já existe nesse nó 1')
            } else {
                console.log(category.parentId)
                const categoryFromDB = await app.db('categories')
                    .where({ name: category.name, parentId: category.parentId }).first()
                // if (!category.id) {
                // existsOrError(categoryFromDB, 'Nome da categoria já existe nesse nó')
                notExistsOrError(categoryFromDB, 'Nome da categoria já existe nesse nó 2')
                // } else if () {

                // }
            }

        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        // }
    }

    // const saveName = async (req, res) => {
    //     const category = {
    //         id: req.body.id,
    //         name: req.body.name,
    //         parentId: req.body.parentId,
    //         userId: req.body.userId
    //     }
    //     console.log(category)
    //     const existany = await app.db('categories')

    //     if (category.id != undefined && category.parentId == undefined && existany.length >= 1) {
    //         const cat = await app.db('categories').where({ id: category.id }).first()
    //         // if (cat.parentId === null) {
    //         // category.id = cat.id
    //         // }
    //         category.parentId = cat.parentId
    //     }

    //     // try {
    //     //     existsOrError(category.name, 'Nome não informado')

    //     //     if (category.parentId != null) {
    //     //         const categoryFromDB = await app.db('categories')
    //     //             .where({ name: category.name, parentId: category.parentId }).first()
    //     //         // console.log('1')
    //     //         // if (category.id) {
    //     //         notExistsOrError(categoryFromDB, 'Nome da categoria já existe nesse nó')
    //     //         // console.log('3')
    //     //         // }
    //     //         // console.log('5')
    //     //     } else {
    //     //         const categoryFromDB = await app.db('categories')
    //     //             .where({ name: category.name }).first()
    //     //         // console.log('2: ' + category.name)
    //     //         // if (category.id) {
    //     //         notExistsOrError(categoryFromDB, 'Nome da categoria já existe nesse nó')
    //     //         // console.log('4')
    //     //         // }
    //     //         // console.log('6')
    //     //     }
    //     //     // }

    //     // } catch (msg) {
    //     //     return res.status(400).send(msg)
    //     // }

    //     // console.log(category)
    //     // if (category.id) {
    //     //     app.db('categories')
    //     //         .update(category)
    //     //         .where({ id: category.id })
    //     //         .then(_ => res.status(204).send())
    //     //         .catch(err => res.status(500).send(err))
    //     // } else {
    //     //     app.db('categories')
    //     //         .insert(category)
    //     //         .then(_ => res.status(204).send())
    //     //         .catch(err => res.status(500).send(err))
    //     // }
    //     try {
    //         existsOrError(category.name, 'Nome não informado')
    //         existsOrError(category.userId, 'usuario não informado')

    //         if (category.parentId != null) {
    //             // console.log(category)
    //             const categoryFromDB = await app.db('categories')
    //                 .where({ name: category.name, parentId: category.parentId }).first()
    //             if (!category.id) {
    //                 notExistsOrError(categoryFromDB, 'Nome da categoria já existe nesse nó')
    //             }
    //         } else {
    //             // console.log(category.parentId)
    //             const categoryFromDB = await app.db('categories')
    //                 .where({ name: category.name }).first()
    //             console.log(categoryFromDB.parentId)
    //             // if (!category.id) {
    //             // notExistsOrError(categoryFromDB, 'Nome da categoria já existe nesse nó')
    //             // }
    //             // if (categoryFromDB.parentId == category.parentId && existany.length > 1) {
    //             //     throw 'Nome da categoria já existe nesse nó'
    //             // }
    //         }

    //     } catch (msg) {
    //         return res.status(400).send(msg)
    //     }
    //     console.log(category)
    //     if (category.id) {
    //         app.db('categories')
    //             .update(category)
    //             .where({ id: category.id })
    //             .then(_ => res.status(204).send())
    //             .catch(err => res.status(500).send(err))
    //     } else {
    //         app.db('categories')
    //             .insert(category)
    //             .then(_ => res.status(204).send())
    //             .catch(err => res.status(500).send(err))
    //     }
    // }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da Categoria não informado.')

            const subcategory = await app.db('categories')
                .where({ parentId: req.params.id })
            notExistsOrError(subcategory, 'Categoria possui subcategorias.')

            const articles = await app.db('articles')
                .where({ categoryId: req.params.id })
            notExistsOrError(articles, 'Categoria possui artigos.')

            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)

            while (parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }

            return { ...category, path }
        })

        categoriesWithPath.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }

    const get = (req, res) => {
        app.db('categories')
            .then(categories => res.json(withPath(categories)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    const getByUser = (req, res) => {
        // console.log(req.params.id)
        app.db('categories')
            // .select('id', 'name', 'parentId', 'userId')
            .where({ userId: req.params.id })
            .then(categories => res.json(withPath(categories)))
            .catch(err => res.status(500).send(err))
    }

    // const toTree = (categories, tree) => {
    //     if(!tree) tree = categories.filter(c => !c.parentId)
    //     tree = tree.map(parentNode => {
    //         const isChild = node => node.parentId == parentNode.id
    //         const articles = app.db('articles')
    //         .where({ categoryId: parentNode.id })
    //         .then(articles => articles)
    //         .catch(err => err)
    //         // const articles 
    //         if(articles != null) {
    //             for (var i = 0; i < articles.length; i++) {
    //                 parentNode.children = articles[i].name
    //             }
    //         }
    //         parentNode.children = toTree(categories, categories.filter(isChild))
    //         return parentNode
    //     })
    //     return tree
    // }

    // const toTree = (categories, tree) => {
    //     if(!tree) tree = categories.filter(c => !c.parentId)
    //     tree = tree.map(parentNode => {
    //         const isChild = node => node.parentId == parentNode.id

    //         // const articlesByCategory = await app.db('articles')
    //         // .where({ categoryId: 4 }).first()
    //         const articlesByCategory = app.db('categories')
    //                 .where({ parentId: node.parentId }).first()
    //         // if(articlesByCategory != null) {
    //             // for (var i = 0; i < articlesByCategory.length; i++) {
    //             //     parentNode.children = articlesByCategory[i].name
    //             // }
    //         // }
    //         // parentNode.children = 'oi'
    //         // parentNode.children = toTree(categories, categories.filter(isChild))
    //         parentNode.children = articlesByCategory[0].name
    //         return parentNode
    //     })
    //     return tree
    // }

    const toTree = (categories, tree) => {
        if (!tree) tree = categories.filter(c => !c.parentId)
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })
        return tree
    }

    const getTree = (req, res) => {
        app.db('categories')
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    }

    const getTreeByUser = (req, res) => {
        app.db('categories')
            .where({ userId: req.params.id })
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getByUser, getById, getTree, getTreeByUser }
}