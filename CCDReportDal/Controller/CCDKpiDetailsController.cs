using CCDReportDal.Utils;
using CCDReportModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCDReportDal.Controller
{
    public static class CCDKpiDetailsController
    {
        public static KpiDetailsModel GetCCDKpi(string equipmentadress, string project, string station, string starttime, string endtime)
        {
            KpiDetailsModel kpi = new KpiDetailsModel();
            try
            {
                //string strsql= "SELECT count(alraminfo) as num,alraminfo FROM alram WHERE projectname='" + project + "' AND equipmentadress='" + equipmentadress + "'AND station='" + station + "' and collecttime BETWEEN '" + starttime + "' AND '" + endtime + "' group by alraminfo";
                //List<alramNum> kpiList = DBHelper.GetList<alramNum>(strsql, null).ToList();
                //kpi.listAlramNum = kpiList;
                string strsql1 = "SELECT * FROM alram WHERE projectname='" + project + "' AND equipmentadress='" + equipmentadress + "'AND station='" + station + "' and collecttime BETWEEN '" + starttime + "' AND '" + endtime + "'";
                List<alramInfo> alramList = DBHelper.GetList<alramInfo>(strsql1, null).ToList();
                kpi.listAlram = alramList;

                string strsql2 = "SELECT  alraminfo as alramname ,COUNT(alraminfo) AS num FROM alram WHERE projectname='" + project + "' AND equipmentadress='" + equipmentadress + "'AND station='" + station + "' and collecttime BETWEEN '" + starttime + "' AND '" + endtime + "' GROUP BY alraminfo ORDER BY num DESC";
                List<alramNum> alramnumList = DBHelper.GetList<alramNum>(strsql2, null).ToList();
                kpi.listAlramNum = alramnumList;

                string strsql3 = @"SELECT T.t,COUNT(1) as num,CONVERT(VARCHAR(10),T.collecttime,23) as collectdate FROM (SELECT *, DATEPART(hh, collecttime) t FROM alram WHERE projectname='" + project + "' AND equipmentadress='" + equipmentadress + "'AND station='" + station + "' and collecttime BETWEEN '" + starttime + "' AND '" + endtime + "') T GROUP BY T.t,CONVERT(VARCHAR(10),T.collecttime,23)";
                List<yiledTrend> alramTreadList = DBHelper.GetList<yiledTrend>(strsql3, null).ToList();
                kpi.listAlramTread = alramTreadList;

                string strsql4 = @"SELECT T.t,MAX(yield) as num,CONVERT(VARCHAR(10),T.collecttime,23) as collectdate FROM(SELECT *, DATEPART(hh, collecttime) t FROM kpihistory WHERE projectname='" + project + "' AND equipmentadress='" + equipmentadress + "'AND station='" + station + "' and collecttime BETWEEN '" + starttime + "' AND '" + endtime + "' UNION select *, DATEPART(hh,collecttime) t from kpi where projectname='" + project + "' and equipmentadress='" + equipmentadress + "' and station='" + station + "'and collecttime BETWEEN '" + starttime + "' AND '" + endtime + "') T GROUP BY T.t,CONVERT(VARCHAR(10),T.collecttime,23) ORDER BY collectdate";
                List<yiledTrend> yiledList = DBHelper.GetList<yiledTrend>(strsql4, null).ToList();
                kpi.listYiled = yiledList;

                string strsql5 = @"select a.t,a.okrate as num,CONVERT(VARCHAR(10),a.collecttime,23) as collectdate from (SELECT row_number() over (partition by t,CONVERT(VARCHAR(10),T.collecttime,23) ORDER BY collecttime desc) rowid,* from ( SELECT *, DATEPART(hh, collecttime) t FROM kpihistory WHERE projectname='" + project + "' AND equipmentadress='" + equipmentadress + "'AND station='" + station + "' and collecttime BETWEEN '" + starttime + "' AND '" + endtime + "' UNION select *, DATEPART(hh,collecttime) t from kpi where projectname='" + project + "' and equipmentadress='" + equipmentadress + "' and station='" + station + "'and collecttime BETWEEN '" + starttime + "' AND '" + endtime + "') as T) as a where a.rowid=1";
                List<yiledTrend> okrateList = DBHelper.GetList<yiledTrend>(strsql5, null).ToList();
                kpi.listOkrate = okrateList;
            }
            catch (Exception)
            {
                throw;
            }
            return kpi;
        }
    }
}
