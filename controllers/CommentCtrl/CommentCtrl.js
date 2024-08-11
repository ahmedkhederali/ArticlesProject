const Comment = require('../../models/CommentSchema/CommentSchema'); // Import the Comment model

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { refId, onModel, comment} = req.body;
    const userId = req.user.id; // Assuming you have authentication middleware that sets req.user

    // Validate that the onModel is a valid value
    if (!['Doctor', 'Pharmacy', 'MedicalLab'].includes(onModel)) {
      return res.status(400).json({ msg: 'Invalid onModel value' });
    }

    const newComment = new Comment({
      refId,
      onModel,
      user: userId,
      comment,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all comments for a specific model (Doctor, Pharmacy, MedicalLab)
exports.getCommentsByModel = async (req, res) => {
  try {
    const { refId, onModel } = req.params;
    const comments = await Comment.find({ refId, onModel }).populate('user', 'name')
    // .sort({ date: -1 }); // Sort by date in descending order (most recent first)

    // Populate user to include user details
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the comment exists
      const comment = await Comment.findById(id);
      if (!comment) return res.status(404).json({ msg: "Comment not found" });
  
      // Ensure the comment belongs to the authenticated user or the user is an admin
      if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ msg: "Access denied" });
      }
  
      // Remove the comment using deleteOne
      await Comment.deleteOne({ _id: id });
  
      res.status(200).json({ msg: "Comment deleted" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
