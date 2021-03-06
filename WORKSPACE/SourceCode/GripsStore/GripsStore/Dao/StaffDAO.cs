﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
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
                    sbSQL.AppendLine("SELECT staff.staffcode, staff.kanjiname, staff.kananame, ward.wardcode, ward.wardname,staff.generationno  ");
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
        public List<Staff> GetListStaff(int pageCount)
        {
            List<Staff> staffs = new List<Staff>();
            try
            {
                StringBuilder sbSQL = new StringBuilder();
                using (NpgDB npgDB = Connection.DBConnect())
                {

                    sbSQL.AppendLine("SELECT mstaff.staffcode, mstaff.kananame, mstaff.kanjiname, mstaff.password, mward.wardcode,mward.wardname, mstaff.generationno");
                    sbSQL.AppendLine("FROM mstaff");
                    sbSQL.AppendLine("LEFT JOIN mward ON mward.wardcode = mstaff.wardcode");
                    sbSQL.AppendLine("ORDER BY mstaff.staffcode");
                    sbSQL.AppendLine("LIMIT 10");
                    sbSQL.AppendLine(" offset :p_pageCount");
                    pageCount = pageCount * 10;
                    npgDB.Command = sbSQL.ToString();
                    npgDB.SetParams(":p_pageCount", pageCount);
                    Debug.Write(sbSQL.ToString());
                    using (NpgsqlDataReader rec = npgDB.Query())
                    {
                        while (rec.Read())
                        {
                            staffs.Add(new Staff(rec));

                        }
                    }
                }

            }
            catch (Exception ex)
            {
                throw (ex);
            }

            return staffs;

        }
        public List<Staff> GetListStaff(string code, int pageCount)
        {
            int offset = pageCount * 5;
            List<Staff> staffs = new List<Staff>();
            try
            {
                StringBuilder sbSQL = new StringBuilder();
                using (NpgDB npgDB = Connection.DBConnect())
                {
                    sbSQL.AppendLine("SELECT mstaff.staffcode, mstaff.kananame, mstaff.kanjiname, mstaff.password, mward.wardcode, mward.wardname, mstaff.generationno FROM mstaff");
                    sbSQL.AppendLine("LEFT JOIN mward ON mward.wardcode = mstaff.wardcode");

                    sbSQL.AppendLine("WhERE (mstaff.staffcode LIKE :p_staffcode ");

                    sbSQL.AppendLine("OR mstaff.kananame LIKE :p_staffcode ");

                    sbSQL.AppendLine("OR mstaff.kanjiname LIKE :p_staffcode )");

                    //sbSQL.AppendLine(" offset :p_pageCount");
                    sbSQL.AppendLine("ORDER BY mstaff.staffcode");
                    sbSQL.AppendLine("LIMIT 5");
                    //sbSQL.AppendLine("OFFSET 5");
                    sbSQL.AppendLine("OFFSET :p_pageCount");




                    //sbSQL.AppendLine("LEFT join m_deptgroup ");
                    //sbSQL.AppendLine("ON m_department.deptgrpcd=m_deptgroup.deptgrpcd");
                    //sbSQL.AppendLine("ORDER by mstaff.staffcode");


                    npgDB.Command = sbSQL.ToString();
                    npgDB.SetParams("p_staffcode", "%" + code + "%");
                    npgDB.SetParams(":p_pageCount", offset);
                    Debug.Write(sbSQL.ToString());
                    using (NpgsqlDataReader rec = npgDB.Query())
                    {
                        while (rec.Read())
                        {
                            staffs.Add(new Staff(rec));
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                throw (ex);
            }

            return staffs;

        }

        public Staff Getstaff(string code)
        {
            Staff staff = new Staff();
            try
            {
                StringBuilder sbSQL = new StringBuilder();
                using (NpgDB npgDB = Connection.DBConnect())
                {   // siêu cấp mạnh mẽ
                    //sbSQL.AppendLine("SELECT * FROM mstaff");
                    sbSQL.AppendLine("SELECT mstaff.staffcode, mstaff.kananame, mstaff.kanjiname, mstaff.password, mward.wardcode,mward.wardname, mstaff.generationno");
                    sbSQL.AppendLine("FROM mstaff");
                    sbSQL.AppendLine("LEFT JOIN mward ON mward.wardcode = mstaff.wardcode");
                    sbSQL.AppendLine("WHERE mstaff.staffcode = :p_staffCode");
                    sbSQL.AppendLine("ORDER BY mstaff.staffcode");

                    //sbSQL.AppendLine("SELECT staff.staffcode, staff.kanjiname, staff.kananame, ward.wardcode, ward.wardname,staff.generationno  ");
                    //sbSQL.AppendLine("FROM mstaff staff");
                    //sbSQL.AppendLine("LEFT JOIN mward ward ON ward.wardcode = ward.wardname");
                    //sbSQL.AppendLine("WHERE staff.staffcode = :p_staffCode");
                    //sbSQL.AppendLine("AND staff.password = :p_password");
                    //sbSQL.AppendLine("AND staff.validstartdate <= CURRENT_DATE");
                    //sbSQL.AppendLine("AND staff.validenddate >= CURRENT_DATE");

                    //sbSQL.AppendLine("LEFT join m_deptgroup ");
                    //sbSQL.AppendLine("ON m_department.deptgrpcd=m_deptgroup.deptgrpcd");
                    //sbSQL.AppendLine("ORDER by mstaff.staffcode");


                    npgDB.Command = sbSQL.ToString();
                    npgDB.SetParams("p_staffcode", code);
                    Debug.Write(sbSQL.ToString());
                    using (NpgsqlDataReader rec = npgDB.Query())
                    {
                        while (rec.Read())
                        {
                            staff = new Staff(rec, true);
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                throw (ex);
            }

            return staff;

        }


        public StaffJSON Update(string staffCod, Staff staff)
        {
            StaffJSON result = new StaffJSON();
            //result.success = false;
            if (staff != null)
            {
                StringBuilder sbSQL = new StringBuilder();
                try
                {
                    using (NpgDB npgDB = Connection.DBConnect())
                    {
                        sbSQL.AppendLine("UPDATE mstaff");
                        sbSQL.AppendLine("SET");
                        sbSQL.AppendLine("kananame = :p_kananame,");
                        sbSQL.AppendLine("kanjiname = :p_kanjiname,");
                        sbSQL.AppendLine("generationno = :p_generationno,");
                        sbSQL.AppendLine("password = :p_password,");
                        sbSQL.AppendLine("wardcode = :p_wardcode");
                        sbSQL.AppendLine("WHERE staffcode = :p_staffcode");
                        sbSQL.AppendLine("RETURNING staffcode, kananame, kanjiname, password, generationno, wardcode");
                        npgDB.Command = sbSQL.ToString();
                        npgDB.SetParams(":p_staffcode", staff.staffCode);
                        npgDB.SetParams(":p_kananame", staff.kanaName);
                        npgDB.SetParams(":p_kanjiname", staff.kanjiName);
                        npgDB.SetParams(":p_generationno", staff.generationno);
                        npgDB.SetParams(":p_password", staff.password);
                        npgDB.SetParams(":p_wardcode", staff.staffWardCode);
                        Debug.WriteLine(sbSQL.ToString());
                        //npgDB.ExecuteNonQuery();
                        //result.success = true;
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
                catch (Exception ex) { }
            }
            return result;
        }
        public StaffJSON Create(Staff staff)
        {
            StaffJSON result = new StaffJSON();
            if (staff != null)
            {
                StringBuilder sbSQL = new StringBuilder();
                try
                {
                    using (NpgDB npgDB = Connection.DBConnect())
                    {
                        sbSQL.AppendLine("INSERT INTO mstaff");
                        sbSQL.AppendLine("(");
                        sbSQL.AppendLine("staffcode, kananame, kanjiname, password, generationno");
                        sbSQL.AppendLine(")");
                        sbSQL.AppendLine("VALUES");
                        sbSQL.AppendLine("(");
                        sbSQL.AppendLine("nextval('staffcode_sequence'), :p_kananame, :p_kanjiname, :p_password, :p_generationno");
                        sbSQL.AppendLine(")");
                        sbSQL.AppendLine("RETURNING staffcode, kananame, kanjiname, password, generationno");

                        npgDB.Command = sbSQL.ToString();
                        //npgDB.SetParams(":p_staffcode", staff.staffCode);
                        npgDB.SetParams(":p_kananame", staff.kanaName);
                        npgDB.SetParams(":p_kanjiname", staff.kanjiName);
                        npgDB.SetParams(":p_generationno", staff.generationno);
                        npgDB.SetParams(":p_password", staff.password);


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
                catch (Exception ex) { }
            }
            return result;
        }
        public StaffJSON Delete(string staffCode)
        {
            StaffJSON result = new StaffJSON();
            //StringBuilder sbSQL = new StringBuilder();
            try
            {
                StringBuilder sbSQL = new StringBuilder();
                using (NpgDB npgDB = Connection.DBConnect())
                {
                    sbSQL.AppendLine("DELETE FROM mstaff");
                    sbSQL.AppendLine("WHERE staffcode = :p_staffcode");

                    npgDB.Command = sbSQL.ToString();
                    npgDB.SetParams("p_staffcode", staffCode);
                    Debug.Write(staffCode);
                    npgDB.ExecuteNonQuery();
                    result.success = true;
                    //using (NpgsqlDataReader rec = npgDB.Query())
                    //{
                    //    if (rec.Read())
                    //    {
                    //        string deletedStaff = NpgDB.getString(rec, "staffCode");
                    //        result.staff = new Staff
                    //        {
                    //            staffCode = deletedStaff
                    //        };
                    //        result.success = true;
                    //    }
                    //}
                }

            }
            catch (Exception ex) { }
            return result;
        }
        public long PageCount()
        {
            long RowCount = 0;
            try
            {
                StringBuilder sbSQL = new StringBuilder();
                using (NpgDB npgDB = Connection.DBConnect())
                {
                    sbSQL.AppendLine("SELECT count(staffcode)::varchar AS count FROM mstaff");
                    // sbSQL.AppendLine("ORDER by mstaff.staffcode");


                    npgDB.Command = sbSQL.ToString();
                    Debug.Write(sbSQL.ToString());
                    using (NpgsqlDataReader rec = npgDB.Query())
                    {
                        if (rec.Read())
                        {
                            string strPageCount = NpgDB.getString(rec, "count");
                            RowCount = long.Parse(strPageCount);
                        }
                    }

                }

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            long count = (long)Math.Ceiling((float)RowCount / 10);


            return count;


        }
        public long PageCountSearch(string staffCode)
        {
            long RowCount = 0;
            try
            {
                StringBuilder sbSQL = new StringBuilder();
                using (NpgDB npgDB = Connection.DBConnect())
                {
                    sbSQL.AppendLine("SELECT count(staffcode)::varchar AS count FROM mstaff");
                    sbSQL.AppendLine("WHERE staffcode like :p_staffcode OR kananame like :p_staffcode OR kanjiname like :p_staffcode");

                    // sbSQL.AppendLine("ORDER by mstaff.staffcode");


                    npgDB.Command = sbSQL.ToString();
                    npgDB.SetParams("p_staffcode", "%" + staffCode + "%");
                    Debug.Write(sbSQL.ToString());
                    using (NpgsqlDataReader rec = npgDB.Query())
                    {
                        if (rec.Read())
                        {
                            string strPageCount = NpgDB.getString(rec, "count");
                            RowCount = long.Parse(strPageCount);
                        }
                    }

                }

            }
            catch (Exception ex)
            {
                throw (ex);
            }
            long count = (long)Math.Ceiling((float)RowCount / 5);


            return count;


        }




    }

}