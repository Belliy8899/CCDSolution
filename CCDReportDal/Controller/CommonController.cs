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
        public static IEnumerable<ProjectModel> GetProjectList()
        {
            IEnumerable<ProjectModel> Ret = DBHelper.GetList<ProjectModel>("SELECT DISTINCT projectname FROM kpi", null);
            return Ret;
        }
        public static IEnumerable<EquAddressModel> GetEquAddressList()
        {
            IEnumerable<EquAddressModel> Ret = DBHelper.GetList<EquAddressModel>("SELECT DISTINCT equipmentadress FROM dbo.kpi ", null);
            return Ret;
        }
        public static IEnumerable<EquTypeModel> GetEquTypeList()
        {
            IEnumerable<EquTypeModel> Ret = DBHelper.GetList<EquTypeModel>("SELECT DISTINCT equipmenttype FROM dbo.kpi ", null);
            return Ret;
        }
    }
}
