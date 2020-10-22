﻿using GripsStore.Dao;
using GripsStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using PagedList.Mvc;
using PagedList;

namespace GripsStore.Controllers
{
    public class StaffController : Controller
    {
        // GET: Staff
        //[HttpGet]
        public ActionResult Index()
        {
            StaffDao staffDao = new StaffDao();
            List<Staff> list = staffDao.GetListStaff(0);
            ViewData["Staffs"] = list;
            return View();
        }
        [HttpPost]
        public JsonResult GetIndex(string pageCount)
        {
            StaffDao staffDao = new StaffDao();
            List<Staff> list = staffDao.GetListStaff(int.Parse(pageCount));
            return Json(list);
        }

        [HttpPost]
        public JsonResult SearchStaffById(string staffCode)
        {
            StaffDao staffDao = new StaffDao();
            List<Staff> list = staffDao.GetListStaff(staffCode);
            return Json(list);
        }

        [HttpPost]
        public JsonResult GetPageCount()
        {
            StaffDao staffDao = new StaffDao();
            return Json(staffDao.PageCount());

        }

        public JsonResult Delete(string staffCode)
        {
            StaffDao staffDao = new StaffDao();
            var result = Json(staffDao.Delete(staffCode));
            return result;
        }



        public ActionResult Details(string code)
        {
            StaffDao staffDao = new StaffDao();

            Staff list = staffDao.Getstaff(code);
            ViewData["Staffs"] = list;
            return View();
        }



        // GET: Staff/Edit/5
        public ActionResult Edit(string code)
        {
            StaffDao staffDao = new StaffDao();
            Staff staff = staffDao.Getstaff(code);
            ViewData["Staff"] = staff;


            return View(staff);

        }
        public JsonResult Update(string staffCode, string kanjiName, string kanaName, string generationno)
        {
            StaffDao staffDao = new StaffDao();
            Staff staff = new Staff
            {
                staffCode = staffCode,
                kanjiName = kanjiName,
                kanaName = kanaName,
                generationno = generationno

            };
            return Json(staffDao.Update(staffCode, staff));
        }
        public JsonResult CreateStaff(string staffCode, string kanjiName, string kanaName, string generationno)
        {
            StaffDao staffDao = new StaffDao();
            Staff staff = new Staff
            {
                staffCode = staffCode,
                kanjiName = kanjiName,
                kanaName = kanaName,
                generationno = generationno,
            };
            return Json(staffDao.Create(staffCode, staff));
        }






        // POST: Staff/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index/staff");
            }
            catch
            {
                return View();
            }
        }
        public ActionResult Register()
        {
            ViewBag.Title = "新しいスタッフを作成する";
            return View();
        }
        //[HttpGet]
        //public long pageCount()
        //{
        //    StaffDao staffDao = new StaffDao();
        //    long result = 0;
        //    int PageSize = 10;
        //    result = staffDao.PageCount();
        //    return result;
        //}

        ///// 
        ///phân trang







    }
}
