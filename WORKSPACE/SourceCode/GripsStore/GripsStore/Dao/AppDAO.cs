using System;
using System.Collections.Generic;
using System.Text;
using GripsStore.Common;
using GripsStore.Models;
using MyLiblay;
using Npgsql;
using static GripsStore.Models.App;

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
                    sbSQL.AppendLine("SELECT app.appid, app.name, app.description, app.icon");
                    sbSQL.AppendLine("FROM mapp app");
                    sbSQL.AppendLine("WHERE app.startstmp <= CURRENT_TIMESTAMP  AND app.endstmp >= CURRENT_TIMESTAMP");
                    if (keys != null && keys.Length > 0)
                    {
                        sbSQL.AppendLine("AND (app.appid LIKE :p_key OR LOWER(app.name) LIKE :p_key");
                        if (keys.Length > 1)
                        {
                            for (int i = 1; i < keys.Length; i++)
                            {
                                sbSQL.AppendLine("OR app.appid LIKE :p_key_" + i + " OR LOWER(app.name) LIKE :p_key_" + i);
                            }
                        }
                        sbSQL.AppendLine(")");
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
                    sbSQL.AppendLine("SELECT app.appid, app.name, app.description, app.icon, installfile.vercd, installfile.vernm, installfile.filenm");
                    sbSQL.AppendLine("FROM mapp app");
                    sbSQL.AppendLine("LEFT JOIN(SELECT installfile.appid, installfile.vercd, installfile.vernm, installfile.filenm");
                    sbSQL.AppendLine("        FROM dinstallfile installfile");
                    sbSQL.AppendLine("        INNER JOIN (SELECT appid, max(vercd) maxvercd FROM dinstallfile GROUP BY appid) newleast");
                    sbSQL.AppendLine("        ON installfile.appid = newleast.appid AND installfile.vercd = newleast.maxvercd) installfile");
                    sbSQL.AppendLine("ON installfile.appid = app.appid");
                    sbSQL.AppendLine("WHERE app.appid = :p_id");
                    sbSQL.AppendLine("AND app.startstmp <= CURRENT_TIMESTAMP  AND app.endstmp >= CURRENT_TIMESTAMP");
                    npgDB.Command = sbSQL.ToString();
                    npgDB.SetParams(":p_id", id);
                    using (NpgsqlDataReader rec = npgDB.Query())
                    {
                        if (rec.Read())
                        {
                            app = new App(rec, true);
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return app;
        }

        public AppJSON DeleteApp(string staffCode, string appId)
        {
            AppJSON result = new AppJSON();
            StringBuilder sbSQL = new StringBuilder();
            try
            {
                using (NpgDB npgDB = Connection.DBConnect())
                {
                    sbSQL.AppendLine("UPDATE mapp");
                    sbSQL.AppendLine("SET endstmp = CURRENT_TIMESTAMP,");
                    sbSQL.AppendLine("upopr = :p_staff_code,");
                    sbSQL.AppendLine("upstmp = CURRENT_TIMESTAMP");
                    sbSQL.AppendLine("WHERE appid = :p_appid");
                    sbSQL.AppendLine("RETURNING appid");

                    npgDB.Command = sbSQL.ToString();
                    npgDB.SetParams(":p_staff_code", staffCode);
                    npgDB.SetParams(":p_appid", appId);
                    using (NpgsqlDataReader rec = npgDB.Query())
                    {
                        if (rec.Read())
                        {
                            string deletedAppId = NpgDB.getString(rec, "appid");
                            result.app = new App();
                            result.app.appId = deletedAppId;
                            result.success = true;
                        }
                    }
                }
            }
            catch (Exception ex) { }
            return result;
        }
    }
}