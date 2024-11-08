const express = require('express');
const fileUpload = require('express-fileupload');
const mentorController = require('../Controllers/mentorController');
const {verifyTokenMentor} = require('../Middlesware/authMiddleware')


const router = express.Router();



router.post('/MentorRegister', fileUpload(),async (req, res) => {
    try {
        if (req.files && req.files.resume) {
          const fileBuffer = req.files.resume.data;
          req.fileUrl = await mentorController.uploadFileToCloudinary(fileBuffer);
        } else {
          return res.status(400).json({ error: 'File is required' });
        }
        await mentorController.Register(req, res);
      } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Server error' });
      }
});

router.post('/Login',mentorController.Login)
router.post('/password-reset/send-otp',mentorController.passwordResetSendOtp);
router.post('/password-reset/verify-otp',mentorController.passwordResetVerifyOtp );
router.post('/password-reset/reset-password',mentorController.passwordResetResetPassword );
router.get('/Profile',verifyTokenMentor,mentorController.getMentorProfile)
router.post('/logout', verifyTokenMentor,mentorController.logoutMentor);
router.post('/mentorchat',verifyTokenMentor,mentorController.sendChatMessage);
router.get('/chats',verifyTokenMentor,mentorController.retrieveChatMessage);
router.post('/scheduleMeeting/:courseId',verifyTokenMentor,mentorController.scheduleMeet);
router.get('/scheduledMeets/:courseId', verifyTokenMentor, mentorController.getScheduledMeets);
router.put('/course/:courseId/meeting/:meetingId',verifyTokenMentor,mentorController.updateMeeting); // Update meeting
router.delete('/course/:courseId/meeting/:meetingId',verifyTokenMentor,mentorController.deleteMeeting)
router.get('/students/mystudents',verifyTokenMentor,mentorController.getStudentsByCourse);
router.get('/getCourseDetailsMentor',verifyTokenMentor,mentorController.getCourseDetailsMentor)

router.put('/addVideo/:id',verifyTokenMentor, fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}),mentorController.AddVideo)
router.delete('/courses/:courseId/lessons/:lessonIndex', verifyTokenMentor,mentorController.deleteLesson);
router.put('/editVideo/:courseId/:lessonId', verifyTokenMentor, fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}), mentorController.editLessonVideo);
router.put('/courses/:courseId/lessons/:lessonId',verifyTokenMentor,mentorController.updatelesson)


module.exports = router;
