using System;
using MyLiblay;

namespace GripsStore.Common
{
    internal static class Connection
    {
        /////////////////////////////////////////////////////////////////////////
        /// <summary> DBｵｰﾌﾟﾝ </summary>
        /// <remarks>
        ///     環境情報を元にDBをｵｰﾌﾟﾝ
        /// </remarks>
        /// <param name="evmt">環境情報</param>
        internal static NpgDB DBConnect()
        {
            NpgDB npgDB = new NpgDB(System.Configuration.ConfigurationManager.ConnectionStrings, "DbPgSql");
            npgDB.Open();
            //
            // Exit
            return npgDB;
        }
    }
}