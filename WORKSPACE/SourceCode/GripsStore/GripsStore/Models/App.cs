using Npgsql;
using MyLiblay;
using System.Collections.Generic;

namespace GripsStore.Models
{
    public class App
    {
        public string appId;
        public string name;
        public string description;
        public string icon;
        public string verCd;
        public string verNm;
        public string fileNm;

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
        public App(NpgsqlDataReader rec)
        {
            this.appId = NpgDB.getString(rec, "appid");
            this.name = NpgDB.getString(rec, "name");
            this.description = NpgDB.getString(rec, "description");
            this.icon = NpgDB.getString(rec, "icon");
            this.verCd = NpgDB.getLongString(rec, "vercd");
            this.verNm = NpgDB.getString(rec, "vernm");
            this.fileNm = NpgDB.getString(rec, "filenm");
        }

        public class AppJSON
        {
            public bool success = false;
            public List<App> apps;
        }
    }
}