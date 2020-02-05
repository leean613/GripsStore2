﻿using GripsStore.Dao;
using GripsStore.Models;
using System.Linq;
using System.Web;
using System.Web.Http;
using static GripsStore.Models.FileUpload;

namespace GripsStore.Controllers
{
    public class UploadController : ApiController
    {
        [HttpPost]
        public FileUploadJson Post()
        {
            FileUploadJson fileUploadJson = new FileUploadJson
            {
                success = false
            };

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection
                HttpPostedFile httpPostedFile = HttpContext.Current.Request.Files[FileUploadDao.UPLOAD_FILE_TAG];
                string action = HttpContext.Current.Request.Params.Get(FileUploadDao.UPLOAD_ACTION_TAG);
                string appId = HttpContext.Current.Request.Params.Get(FileUploadDao.UPLOAD_APP_ID_TAG);
                if (httpPostedFile != null && action != null && appId != null)
                {
                    string fileName = httpPostedFile.FileName;
                    string path = "";
                    if (action.Equals(FileUploadDao.UPLOAD_ACTION_APP_ICON))
                    {
                        path = FileUploadDao.GetAppIconFilePath(appId);
                    }
                    else
                    {
                        path = FileUploadDao.GetAppInstallFilePath(appId);
                    }
                    if (path != "")
                    {
                        if (FileUploadDao.SaveFile(httpPostedFile, path, fileName))
                        {
                            fileUploadJson.success = true;
                            fileUploadJson.fileUpload = new FileUpload
                            {
                                fileName = fileName,
                                action = action,
                                contentType = httpPostedFile.ContentType
                            };
                        }
                    }
                }
            }
            return fileUploadJson;
        }
    }
}