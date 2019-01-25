using CCDReportDal.Controller;
using CCDReportDal.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CCDReportUI.DataAPI
{
    /// <summary>
    /// CCDKpiDetails 的摘要说明
    /// </summary>
    public class CCDKpiDetails : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var Action = context.Request["Action"];
            string equipmentadress = context.Request["equipmentadress"];
            string project = context.Request["project"];
            string station = context.Request["station"];
            string starttime = context.Request["starttime"];
            string endtime = context.Request["endtime"];
            if (string.IsNullOrEmpty(Action))
            {
                Action = "GetCCDKpiDetails";
            }
            else
            {
                Action = Convert.ToString(Action);
            }
            switch (Action)
            {
                case "GetCCDKpiDetails":
                    context.Response.Write(JSONhelper.ToJson(CCDKpiDetailsController.GetCCDKpi(equipmentadress, project,station, starttime, endtime)));
                    break;
                default:
                    break;
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}