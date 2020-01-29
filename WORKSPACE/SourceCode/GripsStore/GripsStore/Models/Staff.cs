using Npgsql;
using MyLiblay;
namespace GripsStore.Models
{
    public class Staff
    {
        public string staffCode;
        public string staffName;
        public string staffDeptCode;
        public string staffDeptName;

        //////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// ｺﾝｽﾄﾗｸﾀ
        /// </summary>
        public Staff()
        {
        }
    
        //////////////////////////////////////////////////////////////////////////////////////
        /// <summary>
        /// ｺﾝｽﾄﾗｸﾀ
        /// </summary>
        /// <param name="rec"></param>
        public Staff(NpgsqlDataReader rec)
        {
            this.staffCode = NpgDB.getString(rec, "staffcd");
            this.staffName = NpgDB.getString(rec, "staffnm");
            this.staffDeptCode = NpgDB.getString(rec, "deptcd");
            this.staffDeptName = NpgDB.getString(rec, "deptnm");
        }

        public class StaffJSON
        {
            public bool success = false;
            public Staff staff;
        }
    }
}