const {Router} = require('express');
const LoginController = require('../Controllers/LoginController');
const UserController = require('../Controllers/UserController');
const PostController = require('../Controllers/PostController');
const LocationController = require('../Controllers/LocationController');
const ProfileController = require('../Controllers/ProfileController');
//const ComentController = require('../Controllers/ComentController');

const router = Router();

//login/ cadastro: ------------------------------------------
router.post('/account/register', UserController.createUser);
router.post('/account/login', LoginController.login);

//posts: ----------------------------------------------
router.get('/timeline', PostController.timelinePosts)
//like do post
router.put('/:id/like', PostController.likePost)
router.put('/:id/hate', PostController.hatePost)
//comentar post
//router.post('/posts/coments', ComentController.ComentPost);
//remover comentrio do post
//criar posts
router.post('/posts/create', PostController.createPost);
//ver posts
router.get('/posts/list', PostController.listAllPosts);
//editar posts
router.put('/posts/edit', PostController.editPost);
// deletar posts
router.delete('/posts/delete', PostController.deletePost);

router.get('/posts/user_post', PostController.listUserPosts);

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
//seguir usuario
router.put('/:id/follow', ProfileController.followUser);
router.put('/:id/unfollow', ProfileController.unfollowUser);
//deixar de seguir usuario




//notificacoes de curtida
//notificacoes de seguidores


//ranking de usuarios

module.exports = router;