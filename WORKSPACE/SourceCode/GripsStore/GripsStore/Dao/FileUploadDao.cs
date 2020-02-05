using System;
using System.IO;
using System.Web;
using System.Web.Configuration;

namespace GripsStore.Dao
{
    public class FileUploadDao
    {
        public const string UPLOAD_FILE_TAG = "file";

        public const string UPLOAD_ACTION_TAG = "action";
        public const string UPLOAD_APP_ID_TAG = "appId";
        public const string UPLOAD_ACTION_INSTALL_FILE = "install file";
        public const string UPLOAD_ACTION_APP_ICON = "app icon image";

        public const string UPLOAD_FILE_PATH_APP_ICON = "Icon";
        public const string UPLOAD_FILE_PATH_INSTALL_FILE = "InstallFile";

        public const string FILE_INFOR_SEPERATOR = ";";
        public const string FILE_PATH_SEPERATOR = "\\";
        public const string DEFALUT_CONTENT_TYPE = "default";

        //mine type
        public const string MINE_TYPE_IMAGE = "image";

        public static bool IsImageFile(string fileType)
        {
            return fileType != null && fileType.IndexOf(MINE_TYPE_IMAGE) > -1;
        }

        public static bool IsInstallFile(string fileType)
        {
            return fileType != null && !(fileType.IndexOf(MINE_TYPE_IMAGE) > -1);
        }

        public static bool SaveFile(HttpPostedFile httpPostedFile, string path, string fileName)
        {
            try
            {
                if (httpPostedFile != null)
                {
                    string fileFolder = WebConfigurationManager.AppSettings["UploadPath"] + path;
                    if (!Directory.Exists(fileFolder))
                    {
                        DirectoryInfo di = Directory.CreateDirectory(fileFolder);
                    }
                    // Get the complete file path
                    var fileSavePath = Path.Combine(fileFolder + fileName);
                    //TODO check file is exist
                    // Save the uploaded file to "UploadedFiles" folder
                    httpPostedFile.SaveAs(fileSavePath);
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        public static string GetAppIconFilePath(string appId)
        {
            //return appId + "\\" + UPLOAD_FILE_PATH_APP_ICON;
            return "\\" + UPLOAD_FILE_PATH_APP_ICON;
        }

        public static string GetAppInstallFilePath(string appId)
        {
            //return appId + "\\" + UPLOAD_FILE_PATH_INSTALL_FILE;
            return "\\" + UPLOAD_FILE_PATH_INSTALL_FILE;
        }

        public static string getContentTypeFromFileNameWithHeader(string fileNameWithHeader)
        {
            if (fileNameWithHeader != null)
            {
                string[] splited = fileNameWithHeader.Split(FILE_INFOR_SEPERATOR.ToCharArray());
                if (splited.Length == 2)
                    return splited[1];

                else return DEFALUT_CONTENT_TYPE;
            }
            else
            {
                return DEFALUT_CONTENT_TYPE;
            }
        }
    }
}