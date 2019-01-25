using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace CCDReportDal.Utils
{
    /// <summary>
    /// Common 的摘要说明
    /// </summary>
    public static class Common
    {
        public static string GetDateStart(string DateStart)
        {
            if (!string.IsNullOrEmpty(DateStart))
            {
                return DateTime.Parse(DateStart).ToString("yyyy-MM-dd") + " 00:00:00";
            }
            else
            {
                return DateTime.Now.ToString("yyyy-MM-dd") + " 00:00:00";
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="DateEnd"></param>
        /// <returns></returns>
        public static string GetDateEnd(string DateEnd)
        {
            if (!string.IsNullOrEmpty(DateEnd))
            {
                return DateTime.Parse(DateEnd).ToString("yyyy-MM-dd") + " 23:59:59";
            }
            else
            {
                return DateTime.Now.ToString("yyyy-MM-dd") + " 23:59:59";
            }
        }

        /// <summary>
        /// Copy查询DTRows到指定DT
        /// </summary>
        /// <param name="fromDTRows"></param>
        /// <returns></returns>
        public static DataTable CopyDTRows(DataTable DTParent, DataRow[] fromDTRows)
        {
            try
            {
                DataTable ret = DTParent.Clone();
                for (int i = 0; i < fromDTRows.Length; i++)
                {
                    ret.ImportRow(fromDTRows[i]);
                }
                return ret;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}