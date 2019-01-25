using CCDServer.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace CCDServer
{
    // 注意: 使用“重构”菜单上的“重命名”命令，可以同时更改代码和配置文件中的类名“Service1”。
    public class Service : IService
    {
        /// <summary>
        /// 上传CCDKPI数据
        /// </summary>
        /// <param name="parameters">参数,字符数组</param>
        /// parameters：设备型号，项目名称，设备位置，工位，CCD上位机IP，合格率，合格率分界值，不良率，产量]
        /// <returns></returns>
        public bool UploadCCDKPI(string parameters)
        {
            RunDataServer server = new RunDataServer();
            //RunMySqlDataServer server = new RunMySqlDataServer();
            string[] parametersArry = parameters.Split(',');
            string equipmenttype = parametersArry[0].ToString().Trim();
            string projectname = parametersArry[1].ToString().Trim();
            string equipmentadress = parametersArry[2].ToString().Trim();
            string station = parametersArry[3].ToString().Trim();
            string equipmentip = parametersArry[4].ToString().Trim();
            double okrate = Convert.ToDouble(parametersArry[5].ToString().Trim());
            double okrateline = Convert.ToDouble(parametersArry[6].ToString().Trim().Trim());
            double ngrate = Convert.ToDouble(parametersArry[7].ToString().Trim());
            int yield = Convert.ToInt32(parametersArry[8].ToString().Trim());
            string sqlstr = string.Format("SELECT * FROM kpi WHERE projectname='{0}' AND equipmentadress='{1}' AND station='{2}'", projectname, equipmentadress, station);
            DataTable dt = server.GetQueryDataTable(sqlstr);
            bool result = false;
            if (dt.Rows.Count > 0 && dt != null)
            {
                try
                {
                    string sql1 = string.Format("INSERT INTO kpihistory (equipmenttype,projectname,equipmentadress,station,equipmentip,okrate,okrateline,ngrate,yield,collecttime) SELECT equipmenttype,projectname,equipmentadress,station,equipmentip,okrate,okrateline,ngrate,yield,collecttime FROM kpi WHERE projectname='{0}' AND equipmentadress='{1}' AND station='{2}'", projectname, equipmentadress, station);
                    string resultinsert = server.CUDData(sql1);
                    if (resultinsert == "1")
                        result = true;
                    string sql2 = string.Format("UPDATE kpi SET equipmentip='{3}',okrate='{4}',okrateline='{5}',ngrate='{6}',collecttime='{7}',yield='{8}' WHERE projectname='{0}' AND equipmentadress='{1}' AND station='{2}'", projectname, equipmentadress, station, equipmentip, okrate, okrateline, ngrate, DateTime.Now, yield);
                    string resultupdate = server.CUDData(sql2);
                    if (resultupdate == "1")
                        result = true;
                    else
                        result = false;
                }
                catch (Exception)
                {
                    result = false;
                }
            }
            else
            {
                try
                {
                    string sql = string.Format("INSERT INTO kpi(equipmenttype, projectname, equipmentadress, station, equipmentip, okrate, okrateline, ngrate, yield, collecttime) VALUES ('{0}','{1}','{2}','{3}','{4}',{5},{6},{7},{8},'{9}')", equipmenttype, projectname, equipmentadress, station, equipmentip, okrate, okrateline, ngrate, yield, DateTime.Now);
                    string resultinsert = server.CUDData(sql);
                    if (resultinsert == "1")
                        result = true;
                }
                catch (Exception)
                {
                    result = false;
                }
            }
            return result;
        }

        /// <summary>
        /// UploadCCDAlramInfo  上传CCD报警信息
        /// </summary>
        /// <param name="parameters">参数,字符数组</param>
        /// parameters：[设备型号，项目名称，设备位置，工位，CCD上位机IP,报警信息]
        /// <returns></returns>
        public bool UploadCCDAlramInfo(string parameters)
        {
            RunDataServer server = new RunDataServer();
            //RunMySqlDataServer server = new RunMySqlDataServer();
            string[] parametersArry = parameters.Split(',');
            string equipmenttype = parametersArry[0].ToString().Trim();
            string projectname = parametersArry[1].ToString().Trim();
            string equipmentadress = parametersArry[2].ToString().Trim();
            string station = parametersArry[3].ToString().Trim();
            string equipmentip = parametersArry[4].ToString().Trim();
            string alraminfo = parametersArry[5].ToString().Trim();
            bool result = false;
            try
            {
                string sql = string.Format("INSERT INTO alram(equipmenttype, projectname, equipmentadress, station, equipmentip, alraminfo, collecttime) VALUES ('{0}','{1}','{2}','{3}','{4}','{5}','{6}')", equipmenttype, projectname, equipmentadress, station, equipmentip, alraminfo, DateTime.Now);
                string resultinsert = server.CUDData(sql);
                if (resultinsert == "1")
                    result = true;
            }
            catch (Exception)
            {
                result = false;
            }

            return result;
        }
        /// <summary>
        /// 根据项目，设备位置，工位对当前kpi数据进行清空
        /// </summary>
        /// <param name="parameters">设备型号，项目，设备位置，工位进行数据清理</param>
        /// <returns>true:清理成功；false：清理失败</returns>
        public bool ClaerKpiData(string parameters)
        {
            bool result = false;
            RunDataServer server = new RunDataServer();
            string[] parametersArry = parameters.Split(',');
            string equipmenttype = parametersArry[0].ToString().Trim();
            string projectname = parametersArry[1].ToString().Trim();
            string equipmentadress = parametersArry[2].ToString().Trim();
            string station = parametersArry[3].ToString().Trim();
            string sqlstr = string.Format("UPDATE kpi SET okrate=0,ngrate=0,yield=0 WHERE projectname='{0}' AND equipmentadress='{1}' AND station='{2}'", projectname, equipmentadress, station);
            string resultupdate = server.CUDData(sqlstr);
            if (resultupdate == "1")
                result = true;
            return result;
        }
    }
}
