using GripsStore.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GripsStore.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            String rs = new TestDao().getDemo();
            ViewBag.Title = rs;
            return View();
        }
    }
}
