using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentEnquiry.Models;
using System.Data.Entity;
namespace StudentEnquiry.Controllers
{
    public class StudentsController : Controller
    {
        StudenquiryDbEntities db = new StudenquiryDbEntities();

        public ActionResult Index()
        {
            return View();
        }

        public string AddStudentData( StudentDetail s)
        {
            db.StudentDetails.Add(s);
            db.SaveChanges();
            return "Student Added Successfully";
        }
        public JsonResult GetStudents()
        {
            List<StudentDetail> lst = db.StudentDetails.ToList();
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ViewStudent(int id)
        {
            StudentDetail st = db.StudentDetails.Find(id);
            db.SaveChanges();
            return Json(st, JsonRequestBehavior.AllowGet);
        }
        public string DeleteStudent(int id)
        {
            StudentDetail st = db.StudentDetails.Find(id);
            db.StudentDetails.Remove(st);
            db.SaveChanges();
            return "Studetn Deleted Successfully";
        }
        public string UpdateStudent(StudentDetail s)
        {
            db.Entry<StudentDetail>(s).State = EntityState.Modified;
            db.SaveChanges();
            return "Student Updated Successfully";
        }
	}
}