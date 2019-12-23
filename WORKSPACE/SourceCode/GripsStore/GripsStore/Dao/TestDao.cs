using GripsStore.Common;
using MyLiblay;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace GripsStore.Dao
{
    public class TestDao
    {
        public String getDemo()
        {
            //
            String rs = "";
            //
            StringBuilder sbSQL = new StringBuilder();
            //
            //DB接続
            using (NpgDB npgDB = Connection.DBConnect())
            {
                // ﾃﾞｰﾀ取得
                sbSQL.Clear();
                sbSQL.AppendLine(" SELECT * ");
                sbSQL.AppendLine(" FROM m_staff ");
                sbSQL.AppendLine(" WHERE staffcd = :p_staffcd ");
                npgDB.Command = sbSQL.ToString();
                npgDB.SetParams("p_staffcd", "1001");
                using (NpgsqlDataReader rec = npgDB.Query())
                {
                    if (rec.Read())
                    {
                        rs = NpgDB.getString(rec,"staffnm");
                    }
                }
            }
            //EXIT
            return rs;
        }
    }
}