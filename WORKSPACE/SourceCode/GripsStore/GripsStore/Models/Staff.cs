using Npgsql;
using MyLiblay;
namespace GripsStore.Models
{
    public class Staff
    {
        public string staffCode;
        public string kanjiName;
        public string kanaName;
        public string generationno;
        //  public string staffWardCode;
        //  public string staffWardName;

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
        public Staff(NpgsqlDataReader rec, bool isGetStaffInfo = false)
        {
            this.staffCode = NpgDB.getString(rec, "staffcode");
            this.kanjiName = NpgDB.getString(rec, "kanjiname");
            this.kanaName = NpgDB.getString(rec, "kananame");
            this.generationno = NpgDB.getString(rec, "generationno");
            //   this.staffWardCode = NpgDB.getString(rec, "wardcode");
            //   this.staffWardName = NpgDB.getString(rec, "wardname");
        }

        public class StaffJSON
        {
            public bool success = false;
            public Staff staff;
        }
        public int CurrentPageIndex { get; set; }
        public int Pagecount { get; set; }


    }
}