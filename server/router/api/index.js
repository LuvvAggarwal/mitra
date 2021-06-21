

const router = require('express').Router();

router.use('/users', require('./usersRouter'));
router.use('/groups', require('./groupsRouter'));
router.use('/groupMember', require('./groupMemberRouter'));

router.use('/', require('./authRouter'));

module.exports = router;
