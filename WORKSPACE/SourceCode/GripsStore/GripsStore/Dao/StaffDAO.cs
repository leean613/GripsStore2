using System;
using System.Text;
using GripsStore.Common;
using GripsStore.Models;
using MyLiblay;
using Npgsql;
using static GripsStore.Models.Staff;

namespace GripsStore.Dao
{
    public class StaffDao
    {
        public StaffJSON CheckLogin(string staffCode, string password)
        {
            StaffJSON result = new StaffJSON();
            StringBuilder sbSQL = new StringBuilder();
            try
            {
                using (NpgDB npgDB = Connection.DBConnect())
                {
                    sbSQL.AppendLine("SELECT staff.staffcode, staff.kanjiname, staff.kananame, ward.wardcode, ward.wardname");
                    sbSQL.AppendLine("FROM mstaff staff");
                    sbSQL.AppendLine("LEFT JOIN mward ward ON ward.wardcode = ward.wardname");
                    sbSQL.AppendLine("WHERE staff.staffcode = :p_staffCode");
                    sbSQL.AppendLine("AND staff.password = :p_password");
                    sbSQL.AppendLine("AND staff.validstartdate <= CURRENT_DATE");
                    sbSQL.AppendLine("AND staff.validenddate >= CURRENT_DATE");

                    npgDB.Command = sbSQL.ToString();
                    npgDB.SetParams("p_staffCode", staffCode);
                    npgDB.SetParams("p_password", password);
                    using (NpgsqlDataReader rec = npgDB.Query())
                    {
                        if (rec.Read())
                        {
                            result.staff = new Staff(rec);
                            result.success = true;
                        }
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