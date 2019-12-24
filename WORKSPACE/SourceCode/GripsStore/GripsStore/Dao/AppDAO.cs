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
        public AppJSON GetApps()
        {
            AppJSON result = new AppJSON
            {
                apps = new List<App>()
            };
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
                            result.apps.Add(app);
                        }
                    }
                    if(result.apps.Count > 0)
                    {
                        result.success = true; 
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return result;
        }
    }
}