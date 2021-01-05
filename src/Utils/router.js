const {Router} = require('express');
const LoginController = require('../Controllers/LoginController');
const UserController = require('../Controllers/UserController');
const PostController = require('../Controllers/PostController');
const LocationController = require('../Controllers/LocationController');

const router = Router();

//usuario: ------------------------------------------
router.post('/account/register', UserController.createUser);
router.post('/account/login', LoginController.login);
router.get('/users', UserController.listUser);

//posts: ----------------------------------------------
router.post('/posts/create', PostController.createPost);
router.get('/posts/list', PostController.listAllPosts);
router.put('/posts/:post_id/edit', PostController.editPost);
router.put('/posts/:post_id/delete', PostController.deletePost);

//localizacao: ------------------------------------------
router.get('/users/location', LocationController.listCoordinates);

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