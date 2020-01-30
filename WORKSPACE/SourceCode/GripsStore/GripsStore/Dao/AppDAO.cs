using System;
using System.Collections.Generic;
using System.Text;
using GripsStore.Common;
using GripsStore.Models;
using MyLiblay;
using Npgsql;

namespace GripsStore.Dao
{
    public class AppDao
    {
        public List<App> GetApps()
        {
            List<App> apps = new List<App>();
            StringBuilder sbSQL = new StringBuilder();
            try
            {
                using (NpgDB npgDB = Connection.DBConnect())
                {
                    sbSQL.AppendLine("SELECT app.appid, app.name, app.description, app.icon, apk.vercd, apk.vernm, apk.filenm");
                    sbSQL.AppendLine("FROM mapp app");
                    sbSQL.AppendLine("LEFT JOIN(SELECT apk.appid, apk.vercd, apk.vernm, apk.filenm");
                    sbSQL.AppendLine("        FROM dapk apk");
                    sbSQL.AppendLine("        INNER JOIN (SELECT appid, max(vercd) maxvercd FROM dapk GROUP BY appid) newleast");
                    sbSQL.AppendLine("        ON apk.appid = newleast.appid AND apk.vercd = newleast.maxvercd) apk");
                    sbSQL.AppendLine("ON apk.appid = app.appid");
                    npgDB.Command = sbSQL.ToString();
                    using (NpgsqlDataReader rec = npgDB.Query())
                    {
                        while (rec.Read())
                        {
                            App app = new App(rec);
                            apps.Add(app);
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return apps;
        }

        public App GetApp(string id)
        {
            App app = new App();
            StringBuilder sbSQL = new StringBuilder();
            try
            {
                using (NpgDB npgDB = Connection.DBConnect())
                {
                    sbSQL.AppendLine("SELECT app.appid, app.name, app.description, app.icon, apk.vercd, apk.vernm, apk.filenm");
                    sbSQL.AppendLine("FROM mapp app");
                    sbSQL.AppendLine("LEFT JOIN(SELECT apk.appid, apk.vercd, apk.vernm, apk.filenm");
                    sbSQL.AppendLine("        FROM dapk apk");
                    sbSQL.AppendLine("        INNER JOIN (SELECT appid, max(vercd) maxvercd FROM dapk GROUP BY appid) newleast");
                    sbSQL.AppendLine("        ON apk.appid = newleast.appid AND apk.vercd = newleast.maxvercd) apk");
                    sbSQL.AppendLine("ON apk.appid = app.appid");
                    sbSQL.AppendLine("WHERE app.appid = :p_id");
                    npgDB.Command = sbSQL.ToString();
                    npgDB.SetParams(":p_id", id);
                    using (NpgsqlDataReader rec = npgDB.Query())
                    {
                        if (rec.Read())
                        {
                            app = new App(rec);
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return app;
        }
    }
}