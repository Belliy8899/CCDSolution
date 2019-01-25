using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCDReportModel
{
    public class KpiDetailsModel
    {
        public List<alramInfo> listAlram { get; set; }
        public List<itemKpiModel> listKpi { get; set; }
        public List<alramNum> listAlramNum { get; set; }
        public List<yiledTrend> listYiled { get; set; }
        public List<yiledTrend> listAlramTread { get; set; }
        public List<yiledTrend> listOkrate { get; set; }
    }
    public class alramInfo
    {
        public string equipmenttype { get; set; }
        public string projectname { get; set; }
        public string equipmentadress { get; set; }
        public string station { get; set; }
        public string equipmentip { get; set; }
        public string alraminfo { get; set; }
        public DateTime collecttime { get; set; }
    }
    public class alramNum
    {
        public string alramname { get; set; }
        public int num { get; set; }
    }

    public class yiledTrend
    {
        public string collectdate { get; set; }

        public int t { get; set; }
        public double num { get; set; }
    }
}
