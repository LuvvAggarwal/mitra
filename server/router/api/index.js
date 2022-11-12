

const router = require('express').Router();

router.use('/users', require('./usersRouter'));
router.use('/groups', require('./groupsRouter'));
router.use('/groupMember', require('./groupMemberRouter'));
router.use('/follow', require('./followerFollowingRouter'));
router.use('/post', require('./postRouter'));
router.use('/postAction', require('./postActionRouter'));
router.use('/dataLookup', require('./dataLookupRouter'));
router.use('/notification', require('./notificationRouter')); 
router.use('/booking', require('./bookingRouter')); 
router.use('/', require('./authRouter'));

module.exports = router;
