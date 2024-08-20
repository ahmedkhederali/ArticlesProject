const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

const User = require("../../models/Users/Users");

const createAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "24h" });

const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // التحقق من أن المستخدم موجود بالفعل
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(500).json({ msg: "هذا البريد الإلكتروني مسجل بالفعل" });
    const existingUserPhone = await User.findOne({ phone });
    if (password.length < 6) return res.status(500).json({ msg: "يجب أن تكون كلمة المرور 6 أحرف على الأقل" });
    if (existingUserPhone) return res.status(500).json({ msg: "هذا الرقم مسجل بالفعل" });

    // تشفير كلمة المرور
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    await newUser.save();

    // إنشاء رمز JWT للمصادقة
    const accessToken = createAccessToken({ id: newUser._id,role:newUser.role });

    res.status(200).json({ user: { ...newUser._doc, password: undefined }, accessToken });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {  
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(500).json({ msg: "البريد الإلكتروني غير صحيح" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(500).json({ msg: "كلمة المرور غير صحيحة" });

      // إنشاء رمز JWT للمصادقة
      const accessToken = createAccessToken({ id: user._id,role:user.role });
      
    // إزالة حقل كلمة المرور من كائن المستخدم
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({ accessToken, user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

const GetAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json({ users, msg: "تم استرجاع جميع المستخدمين بنجاح" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
// const forgetPassword = async (req, res) => {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
  
//     if (!user) return res.status(500).json({ msg: "لم يتم العثور على المستخدم" });
  
//     // الحصول على رمز إعادة تعيين كلمة المرور
//     const resetToken = user.getRestPasswordToken();
//     await user.save({ validateBeforeSave: false });
  
//     const resetPasswordUrl = `${process.env.FRONTEND_URL}/api/v1/user/reset/${resetToken}`;
//     const message = `رمز إعادة تعيين كلمة المرور الخاص بك هو:\n\n${resetPasswordUrl}\n\nإذا لم تطلب ذلك، يرجى تجاهل هذا البريد الإلكتروني.`;
  
//     try {
//       await sendEmail({
//         email: user.email,
//         subject: "طلب إعادة تعيين كلمة المرور",
//         message,
//       });
  
//       res.status(200).json({
//         success: true,
//         message: `تم إرسال البريد الإلكتروني إلى ${user.email} بنجاح`,
//       });
//     } catch (error) {
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;
//       await user.save({ validateBeforeSave: false });
//       res.status(500).json({ msg: error.message });
//     }
//   };

const resetPassword = async (req, res) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return res.status(400).json({ msg: "رمز إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية" });
    }
  
    if (req.body.password !== req.body.confirmpassword) {
      return res.status(400).json({ msg: "كلمات المرور غير متطابقة" });
    }
  
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    user.password = passwordHash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    const accessToken = createAccessToken({ id: user._id });
    await user.save();
  
    res.status(200).json({ msg: "تم تحديث كلمة المرور بنجاح", accessToken, user, success: true });
  };
  
const ChangePassword = async (req, res) => {
    const { id } = req.params;
    const { password, confirmpassword } = req.body;
  
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: "المستخدم غير موجود" });
    }
  
    if (password !== confirmpassword) {
      return res.status(400).json({ msg: "كلمات المرور غير متطابقة" });
    }
  
    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;
    const accessToken = createAccessToken({ id: user._id });
    await user.save();
  
    res.status(200).json({ msg: "تم تحديث كلمة المرور بنجاح", accessToken, user, success: true });
  };
  
const deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
  
      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(400).json({
        status: "فشل",
        error,
      });
    }
  };
  
const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
  
      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(400).json({
        status: "فشل",
        error,
      });
    }
  };
  
const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).select("-password");
  
      res.status(200).json({
        user,
        message: "تم تحديث المستخدم بنجاح",
      });
    } catch (error) {
      res.status(400).json({
        status: "فشل",
        error,
        msg: "حاول مرة أخرى لاحقاً",
      });
    }
  };

const updateUserProfileImg = async (req, res) => {
    try {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "UserProfileImages",
        width: 150,
        crop: "scale",
      });
  
      const user = await User.findByIdAndUpdate(req.params.id, {
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      }).select("-password");
  
      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(400).json({
        status: "فشل",
        error,
      });
    }
  };

module.exports = {
    login,
    register,
    // forgetPassword,
    resetPassword,
    deleteUser,
    getUserById,
    updateUser,
    GetAllUsers,
    updateUserProfileImg,
    ChangePassword
  };
