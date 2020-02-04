using GripsStore.Dao;
using GripsStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static GripsStore.Models.Staff;

namespace GripsStore.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult Login(string id)
        {
            return PartialView();
        }

        public JsonResult CheckLogin(string staffCode, string password)
        {
            StaffDao staffDao = new StaffDao();
            return Json(staffDao.CheckLogin(staffCode, password));
        }
    }
}
