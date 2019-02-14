using CCDReportDal.Controller;
using CCDReportDal.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CCDReportUI.DataAPI
{
    /// <summary>
    /// Common 的摘要说明
    /// </summary>
    public class Common : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var ActType = context.Request["Action"];
            var department = context.Request["Department"];
            if (string.IsNullOrEmpty(ActType))
            {
                ActType = "GetProject";
            }
            switch (ActType)
            {
                case "GetProject":
                    context.Response.Write(JSONhelper.ToJson(CommonController.GetProjectList(department)));
                    break;
                case "GetEquipmentAdress":
                    context.Response.Write(JSONhelper.ToJson(CommonController.GetEquAddressList(department)));
                    break;
                case "GetEquipmentType":
                    context.Response.Write(JSONhelper.ToJson(CommonController.GetEquTypeList(department)));
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