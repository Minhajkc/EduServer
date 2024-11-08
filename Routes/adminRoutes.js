const express = require('express')
const AdminController = require('../Controllers/adminController')
const { verifyTokenAdmin,timeout } = require('../Middlesware/authMiddleware')
const fileUpload = require('express-fileupload');
const router = express.Router()

router.post('/login',AdminController.AdminLogin)
router.get('/checkAuth', verifyTokenAdmin, AdminController.checkAuth)
router.get('/StudentsAuth',verifyTokenAdmin,AdminController.AuthPage)
router.post('/Students/:id/block',verifyTokenAdmin,AdminController.BlockStudent)
router.post('/Students/:id/unblock',verifyTokenAdmin,AdminController.UnBlockStudent)
router.get('/Mentorauth',verifyTokenAdmin,AdminController.GetMentors)
router.patch('/Mentorauth/:id/approve',verifyTokenAdmin,AdminController.ApproveMentor)
router.patch('/Mentorauth/:id/reject',verifyTokenAdmin,AdminController.RejectMentor)
router.post('/categories',verifyTokenAdmin,AdminController.createCategory);
router.get('/categories',verifyTokenAdmin,AdminController.getCategory)
router.post('/courses', verifyTokenAdmin,  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}), AdminController.createCourse);
router.get('/coursesById', verifyTokenAdmin, AdminController.getCourses);
router.get('/courses/:id',verifyTokenAdmin,AdminController.getCategoryById)
router.delete('/categories/:id',verifyTokenAdmin,AdminController.deleteCategory)
router.put('/categories/:id',verifyTokenAdmin,AdminController.editcategory)
router.delete('/courses/:id',verifyTokenAdmin,AdminController.deleteCourse)
router.get('/getCoursebyId/:id',verifyTokenAdmin,AdminController.getCourseById)
router.put('/updateCourse/:id',verifyTokenAdmin, fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}),AdminController.updateCourse)
router.put('/addVideo/:id',verifyTokenAdmin, fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}),timeout(120000),AdminController.AddVideo)
router.delete('/courses/:courseId/lessons/:lessonIndex', verifyTokenAdmin,AdminController.deleteLesson);
router.post('/logout',AdminController.Logout)
router.get('/coursedetailsmentor',verifyTokenAdmin,AdminController.getCourseDetailsForMentor)
router.put('/editVideo/:courseId/:lessonId', verifyTokenAdmin, fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}), timeout(120000), AdminController.editLessonVideo);
router.put('/settings',verifyTokenAdmin,AdminController.updateAdminSettings);
router.get('/settings', verifyTokenAdmin,AdminController.getAdminSettings);
router.post('/subscription/update-rates',verifyTokenAdmin,AdminController.updateSubscriptionRates);
router.get('/get-rates-subscription',AdminController.getSubscriptionRates);
router.post('/ads',verifyTokenAdmin,fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}),AdminController.AddAds)
router.get('/ads',verifyTokenAdmin,AdminController.GetAds)
router.put('/ads/:id',verifyTokenAdmin,fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}),AdminController.EditAds)
router.delete('/ads/:id',verifyTokenAdmin,AdminController.DeleteAds)
router.put('/courses/:courseId/instructor',verifyTokenAdmin,AdminController.updateCourseInstructor);
router.put('/editVideo/admin/:courseId/:lessonId', verifyTokenAdmin, fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
  }), AdminController.editLessonVideos);
  router.put('/courses/admin/:courseId/lessons/:lessonId',verifyTokenAdmin,AdminController.updatelesson)
  router.get('/dashboard-metrics', verifyTokenAdmin,AdminController.getDashboardMetrics);

module.exports = router;