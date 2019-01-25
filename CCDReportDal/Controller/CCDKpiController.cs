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
        public static KpiModel GetCCDKpi(string projectname, string equipmentadress, string equipmenttype)
        {
            KpiModel kpi = new KpiModel();
            try
            {
                string strsql = "";
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
                strsql = string.Format("SELECT * FROM kpi where  1=1 {0} {1} {2} ORDER BY CONVERT(VARCHAR(100),collecttime,23)  DESC", projectname == "all" ? "" : " and projectname='" + projectname + "'", equipmentadress == "all" ? "" : "and  equipmentadress='" + equipmentadress + "'", equipmenttype == "all" ? "" : " and equipmenttype='" + equipmenttype + "'");
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
        public static KpiModel GetAlramKpi(string IsAlram)
        {
            KpiModel kpi = new KpiModel();
            try
            {
                //string strsql = "select * from kpi where okrate<okrateline and  CONVERT(VARCHAR(100), collecttime,23)=CONVERT (VARCHAR(10),GETDATE(),23)";
                string strsql = "select * from kpi where okrate<okrateline";
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
