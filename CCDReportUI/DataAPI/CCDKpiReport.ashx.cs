using CCDReportDal.Controller;
using CCDReportDal.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CCDReportUI.DataAPI
{
    /// <summary>
    /// CCDKpiReport 的摘要说明
    /// </summary>
    public class CCDKpiReport : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var Action = context.Request["Action"];
            string projectname = context.Request["projectname"];
            string equipmentadress = context.Request["equipmentadress"];
            string equipmenttype = context.Request["equipmenttype"];
            string IsAlram = context.Request["Isalram"];
            string department = context.Request["Department"];
            string IsOnline = context.Request["Isonline"];
            if (string.IsNullOrEmpty(Action))
            {
                Action = "GetCCDKpiData";
            }
            else
            {
                Action = Convert.ToString(Action);
            }
            switch (Action)
            {
                case "GetCCDKpiData":
                    if (IsAlram == "true")
                        context.Response.Write(JSONhelper.ToJson(CCDKpiController.GetAlramKpi(IsAlram, department)));
                    else if (IsOnline == "true")
                        context.Response.Write(JSONhelper.ToJson(CCDKpiController.GetOutLine(IsOnline, department)));
                    else
                        context.Response.Write(JSONhelper.ToJson(CCDKpiController.GetCCDKpi(projectname, equipmentadress, equipmenttype, department)));
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