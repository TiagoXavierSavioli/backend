const {Router} = require('express');
const LoginController = require('../Controllers/LoginController');
const UserController = require('../Controllers/UserController');
const PostController = require('../Controllers/PostController');
const LocationController = require('../Controllers/LocationController');
const ProfileController = require('../Controllers/ProfileController');
const LikeController = require('../Controllers/LikeController');

const router = Router();

//login/ cadastro: ------------------------------------------
router.post('/account/register', UserController.createUser);
router.post('/account/login', LoginController.login);

//posts: ----------------------------------------------
//like do post
router.post('/posts/likes', LikeController.likePost);
//remover like do post
router.post('/posts/dislikes', LikeController.dislikePost);
//comentar post
//remover comentrio do post
//criar posts
router.post('/posts/create', PostController.createPost);
//ver posts
router.get('/posts/list', PostController.listAllPosts);
//editar posts
router.put('/posts/edit', PostController.editPost);
// deletar posts
router.delete('/posts/delete', PostController.deletePost);

//usuario: ------------------------------------------

router.get('/users', UserController.listUser);
router.get('/users/find', UserController.findUser);
router.post('/users/edit', UserController.editUser);
router.get('/users/verifyExist', UserController.verifyUserExists);
//fazer logout

//coordinates: --------------------------------------
router.post('/users/location', LocationController.FistCoordinates);
router.get('/users/location/list/proxim', LocationController.ListProximCoordinates);
router.get('/users/location/list', LocationController.ListAllCoordinates);

//Profile: -----------------------------------------------------
//visualizar perfil do usuario
router.get('/profile', ProfileController.getProfile);
//pesquisar posts ou usuarios





//notificacoes de curtida
//notificacoes de seguidores


//ranking de usuarios

module.exports = router;