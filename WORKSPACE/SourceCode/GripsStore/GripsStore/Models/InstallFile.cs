using Npgsql;
using MyLiblay;
using System;

namespace GripsStore.Models
{
    public class InstallFile
    {
        public string appId;
        public int verCd;
        public string verNm;
        public string fileNm;
        public string upOpr;

        //////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// ｺﾝｽﾄﾗｸﾀ
        /// </summary>
        public InstallFile()
        {
        }

        //////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// ｺﾝｽﾄﾗｸﾀ
        /// </summary>
        /// <param name="rec"></param>
        public InstallFile(NpgsqlDataReader rec)
        {
            this.appId = NpgDB.getString(rec, "appid");
            this.verNm = NpgDB.getString(rec, "vernm");
            this.fileNm = NpgDB.getString(rec, "filenm");
            this.upOpr = NpgDB.getString(rec, "upopr");
            string verCdStr = NpgDB.getLongString(rec, "vercd");
            try
            {
                this.verCd = int.Parse(verCdStr);
            }
            catch (Exception ex) { }
        }

        public class InstallFileJSON
        {
            public bool success = false;
            public InstallFile fileContent;
        }
    }
}