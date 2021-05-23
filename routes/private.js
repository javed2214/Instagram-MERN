const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
const { home, createPost, getAllPosts, getUserPost, deletePost, likePost, unlikePost, addFavourite, removeFavourite, getFavourites, updateProfile, uploadProfile, uploadImage, updatePost, userFollow, userUnFollow } = require('../controllers/private')

router.route('/home').post(auth, home)
router.route('/createpost').post(auth, createPost)
router.route('/delete/:id').delete(auth, deletePost)
router.route('/getallposts').post(auth, getAllPosts)
router.route('/getuserpost').post(auth, getUserPost)
router.route('/like/:id').put(auth, likePost)
router.route('/unlike/:id').put(auth, unlikePost)
router.route('/addfavourite/:id').put(auth, addFavourite)
router.route('/removefavourite/:id').put(auth, removeFavourite)
router.route('/getfavourites').post(auth, getFavourites)
router.route('/updateprofile/:id').put(auth, updateProfile)
router.route('/uploadprofile').put(auth, uploadProfile)
router.route('/uploadimage').put(auth, uploadImage)
router.route('/updatepost/:id').put(auth, updatePost)
router.route('/follow/:id').put(auth, userFollow)
router.route('/unfollow/:id').put(auth, userUnFollow)

module.exports = router
