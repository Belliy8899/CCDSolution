using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CCDReportModel;
using CCDReportDal.Utils;

namespace CCDReportDal.Controller
{
    public static class CCDKpiController
    {
        private static object objlock = new object();
        public static KpiModel GetCCDKpi(string projectname, string equipmentadress, string equipmenttype, string department)
        {
            KpiModel kpi = new KpiModel();
            try
            {
                string strsql = "";
                #region
                //if (projectname == "all")
                //{
                //    if (equipmentadress == "all")
                //        strsql = "SELECT * FROM kpi where CONVERT(VARCHAR(100), collecttime,23)=CONVERT (VARCHAR(10),GETDATE(),23)";
                //    else
                //        strsql = "select * from kpi WHERE CONVERT(VARCHAR(100), collecttime,23)=CONVERT (VARCHAR(10),GETDATE(),23) and equipmentadress='" + equipmentadress + "'";
                //}
                //else
                //    strsql = string.Format("SELECT * FROM kpi where  CONVERT(VARCHAR(100), collecttime,23)=CONVERT (VARCHAR(10),GETDATE(),23) {0} {1} {2}", projectname == "all" ? "" : " and projectname='" + projectname + "'", equipmentadress == "all" ? "" : "and  equipmentadress='" + equipmentadress + "'", equipmenttype == "all" ? "" : " and equipmenttype='" + equipmenttype + "'");
                //strsql = string.Format("SELECT * FROM kpi where  CONVERT(VARCHAR(100), collecttime,23)=CONVERT (VARCHAR(10),GETDATE(),23) {0} {1} {2}", projectname == "all" ? "" : " and projectname='" + projectname + "'", equipmentadress == "all" ? "" : "and  equipmentadress='" + equipmentadress + "'", equipmenttype == "all" ? "" : " and equipmenttype='" + equipmenttype + "'"); 
                #endregion
                strsql = string.Format("SELECT * FROM kpi where CONVERT(VARCHAR(100), collecttime,23)=CONVERT (VARCHAR(10),GETDATE(),23) and  1=1  {0} {1} {2} {3} ORDER BY CONVERT(VARCHAR(100),collecttime,23)  DESC", projectname == "all" ? "" : " and projectname='" + projectname + "'", equipmentadress == "all" ? "" : "and  equipmentadress='" + equipmentadress + "'", equipmenttype == "all" ? "" : " and equipmenttype='" + equipmenttype + "'", department == "all" ? "" : "and equipmentadress like '%" + department + "%'");
                List<itemKpiModel> kpiList = DBHelper.GetList<itemKpiModel>(strsql, null).ToList();
                kpi.ListKpi = kpiList;
            }
            catch (Exception)
            {
                throw;
            }
            return kpi;
        }
        /// <summary>
        /// 获取所有良率小于警戒线的设备
        /// </summary>
        /// <param name="IsAlram"></param>
        /// <returns></returns>
        public static KpiModel GetAlramKpi(string IsAlram, string department)
        {
            KpiModel kpi = new KpiModel();
            try
            {
                string strsql = string.Format("select * from kpi where CONVERT(VARCHAR(100), collecttime,23)=CONVERT (VARCHAR(10),GETDATE(),23) and okrate<okrateline {0}", department == "all" ? "" : "and equipmentadress like '%" + department + "%'");
                List<itemKpiModel> kpiList = DBHelper.GetList<itemKpiModel>(strsql, null).ToList();
                kpi.ListKpi = kpiList;
            }
            catch (Exception)
            {
                throw;
            }
            return kpi;
        }
        public static KpiModel GetOutLine(string IsOnline, string department)
        {
            KpiModel kpi = new KpiModel();
            try
            {
                string strsql = string.Format("select * from kpi where CONVERT(VARCHAR(100), collecttime,23)!=CONVERT (VARCHAR(10),GETDATE(),23) {0}", department == "all" ? "" : "and equipmentadress like '%" + department + "%'");
                List<itemKpiModel> kpiList = DBHelper.GetList<itemKpiModel>(strsql, null).ToList();
                kpi.ListKpi = kpiList;
            }
            catch (Exception)
            {
                throw;
            }
            return kpi;
        }
    }
}
