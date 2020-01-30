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
        public List<App> GetApps(string key)
        {
            string[] keys = null;
            if (key != null)
            {
                keys = key.ToLower().Split(new string[] { " ", "　" }, StringSplitOptions.None);
            }
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
                    if (keys != null && keys.Length > 0)
                    {
                        sbSQL.AppendLine("WHERE app.appid LIKE :p_key OR LOWER(app.name) LIKE :p_key");
                        if (keys.Length > 1)
                        {
                            for (int i = 1; i < keys.Length; i++)
                            {
                                sbSQL.AppendLine("OR app.appid LIKE :p_key_" + i + " OR LOWER(app.name) LIKE :p_key_" + i);
                            }
                        }
                    }

                    npgDB.Command = sbSQL.ToString();
                    if (keys != null && keys.Length > 0)
                    {
                        npgDB.SetParams(":p_key", "%" + keys[0] + "%");
                        if (keys.Length > 1)
                        {
                            for (int i = 1; i < keys.Length; i++)
                            {
                                npgDB.SetParams(":p_key_" + i, "%" + keys[i] + "%");
                            }
                        }
                    }
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