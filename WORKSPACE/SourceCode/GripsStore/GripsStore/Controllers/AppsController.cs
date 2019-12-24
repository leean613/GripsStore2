using GripsStore.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static GripsStore.Models.App;

namespace GripsStore.Controllers
{
    public class AppsController : ApiController
    {
        // GET api/apps/
        public AppJSON Get()
        {
            AppJSON appJSON = new AppJSON();
            try
            {
                AppDao appDao = new AppDao();
                return appDao.GetApps();
            }
            catch (Exception) { }
            return appJSON;
        }
    }
}
