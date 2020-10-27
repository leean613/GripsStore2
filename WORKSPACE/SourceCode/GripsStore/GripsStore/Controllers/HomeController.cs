using GripsStore.Dao;
using GripsStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GripsStore.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string key)
        {

            //TODO check login
            AppDao appDao = new AppDao();
            List<App> apps = appDao.GetApps(key);
            ViewData["Apps"] = apps;
            ViewBag.Title = "Gripsストア";
            return View();
        }
    }
}
