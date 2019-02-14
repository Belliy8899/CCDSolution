using CCDReportDal.Utils;
using CCDReportModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCDReportDal.Controller
{
    public static class CommonController
    {
        public static IEnumerable<ProjectModel> GetProjectList(string department)
        {
            string sql = string.Format("SELECT DISTINCT projectname FROM kpi where 1=1 {0}", department == "all" ? "" : "and equipmentadress like '%" + department + "%'");
            IEnumerable<ProjectModel> Ret = DBHelper.GetList<ProjectModel>(sql, null);
            return Ret;
        }
        public static IEnumerable<EquAddressModel> GetEquAddressList(string department)
        {
            string sql = string.Format("SELECT DISTINCT equipmentadress FROM kpi where 1=1 {0}", department == "all" ? "" : "and equipmentadress like '%" + department + "%'");
            IEnumerable<EquAddressModel> Ret = DBHelper.GetList<EquAddressModel>(sql, null);
            return Ret;
        }
        public static IEnumerable<EquTypeModel> GetEquTypeList(string department)
        {
            string sql = string.Format("SELECT DISTINCT equipmenttype FROM kpi where 1=1 {0}", department == "all" ? "" : "and equipmentadress like '%" + department + "%'");
            IEnumerable<EquTypeModel> Ret = DBHelper.GetList<EquTypeModel>(sql, null);
            return Ret;
        }
        public static IEnumerable<User> GetUserList()
        {
            string sql = string.Format("SELECT * FROM  users ");
            IEnumerable<User> Ret = DBHelper.GetList<User>(sql, null);
            return Ret;
        }
    }
}
