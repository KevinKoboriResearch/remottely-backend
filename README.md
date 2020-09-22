# remottel-quasar-backend


ok - admins app: editar todos os usuarios e fechaduras do app
admins master: editar todos os usuarios e fechaduras do appadmin master: editar todos os usuarios e fechaduras do app
admins local: editar todos os usuarios locais e nomes das fechaduras
usuario local: pode visualizar ou abrir/fechar

estados do usuario local+devide:
- editar todos
- editar todos menos 
- acessar
- visualizar


category:
- pronto


User Admin App = UAA
<!-- User Admin Local Master = UAM -->
User Admin Local = UAL
User Local Control = UAL
User Local view = UAL

login por telefone
senha
nome


BANCO DE DADOS - Usuario: 
user.id = unico e gerado automaticamente
user.name = nome completo para q os usuarios/admins se encontrem com maior facilidade
user.cellphone = numero de telefone/tem q ser unico
user.cellphoneConfirm = sms verificado? - sempre q o campo cellphone for modificado setar para falso
user.admin = consegue editar tudo, administradores globais da empresa
user.adminLocal = consegue editar nomes, e quem pode acionar ou nao os dispositivos
user.trigger = se pode acionar ou apenas ver os dispositivos
user.image = foto de perfil
user.deletedAt = data de quando o usuario foi deletado/nao deleta de verdade

Banco de dados - Dispositivos:
article.id = unico e gerado automaticamente
article.name = nome personalizavel pelos usuarios
article.desc = nome da porta, nome fixo
article.image = foto real do dispositivo
article.trigger = ativar e desativar dispositivos
article.UserId = 
article.Users = lista de usuarios q podem acionar esse dispositivo

Banco de dados - Categorias:
category.id = unico e gerado automaticamente
category.name = nome personalizavel pelos usuarios
category.parentId = nó referente na arvore
category.userId = id do dono do nó
category.usersAdmins

Banco de dados - History:
article.id
article.ArticleId
article.UserId
article.Time


DEVICES(CATEGORIES NULL) LOCATIONS / USER LOCATIONS

IMPORTANTE PARA DEIXAR AS REQUISICOES LEVES:
- CONTRUIR QUERIES Q BUSCAM APENAS O LENGTH DAS TABELAS POR USUARIO
- REQUISICOES DE ACIONAR DISPOSITIVOS COM PACOTES PEQUENOS
- REQUISICOES DE BUSCA DE DADOS MAIORES / ALOCAR VALORES EM MEMORIA LOCAL
<!-- ideias mais pra frente:
article.userIds = lista de quem pode modificar esse dispositivo -->
user sql:
- https://stackoverflow.com/questions/25416915/sql-user-relationship


vuejs re-render:
- https://michaelnthiessen.com/26-time-saving-tips/

localstorage
- https://medium.com/js-dojo/how-to-permanently-save-data-with-vuex-localstorage-in-your-vue-app-f1d5c140db69

security:
- https://vuejs.org/v2/guide/security.html

vuejs best pratices:
- https://012.vuejs.org/guide/best-practices.html

native script vue com sistema de localizacao pronto:
- https://medium.com/saibbyweb/building-a-real-time-location-tracking-app-with-nativescript-vue-under-350-lines-of-code-8b51ad40d657

flutter pronto:
- https://www.youtube.com/watch?v=K1uH_SN4X0w



knex migrate:make create_table_locations
