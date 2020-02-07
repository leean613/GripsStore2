using System;
using System.Collections.Generic;
using System.Text;
using GripsStore.Common;
using GripsStore.Models;
using MyLiblay;
using Npgsql;
using static GripsStore.Models.App;
using static GripsStore.Models.InstallFile;

namespace GripsStore.Dao
{
    public class InstallFileDAO
    {
        public InstallFileJSON UpdateFile(string staffCode, InstallFile installFile)
        {
            InstallFileJSON result = new InstallFileJSON();
            if (installFile != null)
            {
                StringBuilder sbSQL = new StringBuilder();
                try
                {
                    using (NpgDB npgDB = Connection.DBConnect())
                    {
                        sbSQL.AppendLine("INSERT INTO dinstallfile");
                        sbSQL.AppendLine("(appid, vercd, vernm, filenm, upopr)");
                        sbSQL.AppendLine("VALUES (");
                        sbSQL.AppendLine(":p_appid, :p_vercd, :p_vernm, :p_filenm, :p_upopr");
                        sbSQL.AppendLine(")");
                        sbSQL.AppendLine("RETURNING appid, vercd, vernm, filenm, upopr");

                        npgDB.Command = sbSQL.ToString();
                        npgDB.SetParams(":p_appid", installFile.appId);
                        npgDB.SetParamsLongString(":p_vercd", installFile.verCd + "");
                        npgDB.SetParams(":p_vernm", installFile.verNm);
                        npgDB.SetParams(":p_filenm", installFile.fileNm);
                        npgDB.SetParams(":p_upopr", staffCode);
                        using (NpgsqlDataReader rec = npgDB.Query())
                        {
                            if (rec.Read())
                            {
                                result.fileContent = new InstallFile(rec);
                                result.success = true;
                            }
                        }
                    }
                }
                catch (Exception ex) { }
            }
            return result;
        }
    }
}