const {Router} = require('express');
const LoginController = require('../../Controllers/LoginController');
const UserController = require('../../Controllers/UserController');

const router = Router();

// criar usuario
router.post('/account/register', UserController.createUser);

// fazer login
router.post('/account/login', LoginController.login);

//listar todos os usuarios
router.get('/users', UserController.listUser);


//fazer logout
//ver posts
//criar posts
//editar posts
// deletar posts
//like do post
//remover like do post
//comentar post
//remover comentrio do post
//notificacoes de curtida
//notificacoes de seguidores
//visualizar perfil do usuario
//pesquisar posts ou usuarios
//ranking de usuarios

module.exports = router;