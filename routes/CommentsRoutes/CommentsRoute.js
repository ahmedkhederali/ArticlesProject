const express = require('express');

const router = express.Router();
const { createComment, getCommentsByModel, deleteComment } = require('../../controllers/CommentCtrl/CommentCtrl');
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Route to create a comment
router.post('/comments', auth, createComment);

// Route to get comments by model
router.get('/comments/:refId/:onModel', getCommentsByModel);

// Route to delete a comment
router.delete('/comments/:id', auth, deleteComment);

module.exports = router;
