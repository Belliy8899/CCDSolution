using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCDReportModel
{
    public class KpiModel
    {
        public List<itemKpiModel> ListKpi { get; set; }
    }
    public class itemKpiModel
    {
        public string equipmenttype { get; set; }
        public string projectname { get; set; }
        public string equipmentadress { get; set; }
        public string station { get; set; }
        public string equipmentip { get; set; }
        public double okrate { get; set; }
        public double okrateline { get; set; }
        public double ngrate { get; set; }
        public int yield { get; set; }
        public DateTime collecttime { get; set; }
    }
}
