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
- admin
- manager
- authorized
- viewer
user.adminLocal = consegue editar nomes, e quem pode acionar ou nao os dispositivos
user.trigger = se pode acionar ou apenas ver os dispositivos
user.image = foto de perfil
user.deletedAt = data de quando o usuario foi deletado/nao deleta de verdade

Banco de dados - Dispositivos:
device.id = unico e gerado automaticamente
device.name = nome personalizavel pelos usuarios
device.desc = nome da porta, nome fixo
device.image = foto real do dispositivo
device.trigger = ativar e desativar dispositivos
device.adminTrigger = ativar e desativar se só admins podem controlar o dispositivo 
device.UserId = Id do usuario master
device.Users = lista de usuarios q podem acionar esse dispositivo = [ID USER, ROLE USER]
- ex: 
    - [{UserDeviceId: 100, UserDeviceRole: viewer},{UserDeviceId: 222, UserDeviceRole: adminLocal},
        {UserDeviceId: 377, UserDeviceRole: authorized},{UserDeviceId: 23, UserDeviceRole: viewer}
        {UserDeviceId: 114, UserDeviceRole: adminLocal},{UserDeviceId: 1023, UserDeviceRole: authorized}]

Banco de dados - Categorias:
category.id = unico e gerado automaticamente
category.name = nome personalizavel pelos usuarios
category.parentId = nó referente na arvore
category.userId = id do dono do nó
category.usersAdmins

Banco de dados - History:
device.id
device.deviceId
device.UserId
device.Time


DEVICES(CATEGORIES NULL) LOCATIONS / USER LOCATIONS

IMPORTANTE PARA DEIXAR AS REQUISICOES LEVES:
- CONTRUIR QUERIES Q BUSCAM APENAS O LENGTH DAS TABELAS POR USUARIO
- REQUISICOES DE ACIONAR DISPOSITIVOS COM PACOTES PEQUENOS
- REQUISICOES DE BUSCA DE DADOS MAIORES / ALOCAR VALORES EM MEMORIA LOCAL
<!-- ideias mais pra frente:
device.userIds = lista de quem pode modificar esse dispositivo -->
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



Passo a passo para melhorar o desempenho do APP após terminado:
- Melhorar / criar mais rotas de requisicao
- organizar nomenclaturas de tudo
- apagar toda linha de codigo desnecessaria / varrer o sistema e criar mecanismos de testes automatizados

WIFI
BLUETOOTH
NFC


GUARDAR NO LOCALSTORAGE INFORMACOES DAS CHAVES DO USUARIO POR ATÉ 1 OU 3 DIAS ATE Q ELE ACESSE A INTERNET NOVAMENTE???



TROGGER TERA 3 ESTADOS: ABERTO,SÓ OS ADMINS PODEM  MODIFICAR, FECHADO

disabled = user viewer




REGRAS PARA ORGANIZAR DESENVOLVIMENTO:
    ALINHAMENTO:
        PULAR LINHAS SEMPRE QUE CHAMAR UMA NOVA:
            FUNCAO JS, DB, CSS OU TAG HTML


REGRAS DE USO DO APP:
    APP USUARIO ADMIN:
        FRONTEND:

        BACKEND:

        BANCO DE DADOS:

    APP USUARIO NORMAL:        
        FRONTEND:

        BACKEND:

        BANCO DE DADOS:



        validar codigo automaticamente




--- APP ---
1 - PROPAGANDA
2 - ENTRAR / CADASTRAR

-- ERROS --
LOGIN COM PROBLEMA DE DIGITACAO



PAGES:
usuarios comuns:
- UserDevices.vue {select category}

- UserEvents.vue
  - UserEvent.vue
  - UserNewEvent.vue

- Notificatons.vue

- UserProfile.vue

- UserDevicesHistory.vue {show devices}
  - DeviceHistory.vue {show userToDevice history}
    <!-- - devices.vue -->

Gestores apenas:
- DevicesConfig.vue
- Users.vue {select category} show users from category