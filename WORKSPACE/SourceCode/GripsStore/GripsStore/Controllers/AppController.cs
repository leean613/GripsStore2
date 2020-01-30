using GripsStore.Dao;
using GripsStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GripsStore.Controllers
{
    public class AppController : Controller
    {
        public ActionResult Detail(string id)
        {
            AppDao appDao = new AppDao();
            App app = appDao.GetApp(id);
            ViewData["App"] = app;
            if (app != null)
            {
                ViewBag.Title = app.name;
            }
            ViewBag.PageId = id;
            return View(app);
        }
    }
}
