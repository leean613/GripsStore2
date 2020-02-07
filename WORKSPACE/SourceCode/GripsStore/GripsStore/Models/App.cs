using Npgsql;
using MyLiblay;
using System;

namespace GripsStore.Models
{
    public class App
    {
        public string appId;
        public string name;
        public string description;
        public string icon;
        public int verCd;
        public string verNm;
        public string fileNm;
        public string upstmp;

        //////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// ｺﾝｽﾄﾗｸﾀ
        /// </summary>
        public App()
        {
        }

        //////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// ｺﾝｽﾄﾗｸﾀ
        /// </summary>
        /// <param name="rec"></param>
        public App(NpgsqlDataReader rec, bool isGetFileInfo = false)
        {
            this.appId = NpgDB.getString(rec, "appid");
            this.name = NpgDB.getString(rec, "name");
            this.description = NpgDB.getString(rec, "description");
            this.icon = NpgDB.getString(rec, "icon");
            if (isGetFileInfo)
            {
                string verCdStr = NpgDB.getLongString(rec, "vercd");
                try
                {
                    this.verCd = int.Parse(verCdStr);
                }
                catch (Exception ex)
                {

                }
                this.verNm = NpgDB.getString(rec, "vernm");
                this.fileNm = NpgDB.getString(rec, "filenm");
            }
        }

        public class AppJSON
        {
            public bool success = false;
            public App app;
        }
    }
}