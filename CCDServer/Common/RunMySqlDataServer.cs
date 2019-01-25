using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCDServer.Common
{
    public class RunMySqlDataServer
    {
        //数据库连接字符串
        public static readonly string connectionString = ConfigurationManager.ConnectionStrings["connstr"].ConnectionString;

        //"Database='mpms';Data Source='172.30.7.60';User Id='rootswd';Password='sunwoda.mysql.2018';charset='utf8';pooling=true";
        #region 001、统一调用的服务接口
        /// <summary>
        /// 统一调用的服务接口
        /// </summary>
        /// <param name="spc">命名空间+类名</param>
        /// <param name="APIName">方法名</param>
        /// <param name="Parameters">参数，多个参数用特殊字符拼接</param>
        /// <returns></returns>
        public string RunServerAPI(string spc, string APIName, string Parameters)
        {
            try
            {
                string strClass = spc;//命名空间+类名
                string strMethod = APIName;//方法名
                Type type;
                object obj;
                type = Type.GetType(strClass);//通过string类型的strClass获得同名类“t”
                System.Reflection.MethodInfo method = type.GetMethod(strMethod);//通过string类型的strMethod获得同名的方法“method”
                obj = System.Activator.CreateInstance(type);//创建“t”类的实例“obj”
                object[] objs = new object[] { Parameters };
                object rec = method.Invoke(null, objs);//t类实例obj,调用方法"method(testcase)"
                if (rec == null)
                    return "";
                return rec.ToString();
            }
            catch (Exception)
            {
                return "";
            }
        }
        #endregion

        #region 002、根据sql查询数据，并返回DataTable
        /// <summary>
        /// 根据sql查询数据，并返回DataTable
        /// </summary>
        /// <param name="strsql"></param>
        /// <returns></returns>
        public DataTable GetQueryDataTable(string strsql)
        {
            DataTable dt = new DataTable();
            try
            {
                dt = MySqlHelper.GetDataTable(connectionString, CommandType.Text, strsql);
                dt.TableName = "MyDT";
                return dt;
            }
            catch (Exception)
            {
                return null;
            }

        }
        #endregion
        #region 003、根据sql查询，返回Json字符串
        /// <summary>
        /// 根据sql查询，返回Json字符串
        /// </summary>
        /// <param name="strsql"></param>
        /// <returns></returns>
        public string GetQueryData(string strsql)
        {
            try
            {
                return Newtonsoft.Json.JsonConvert.SerializeObject(MySqlHelper.GetDataTable(connectionString, CommandType.Text, strsql));
            }
            catch (Exception)
            {
                return "";
            }
        }
        #endregion
        #region 004、根据sql执行增删改，成功返回"1",失败返回"0"
        /// <summary>
        /// 根据sql执行增删改，成功返回"1",失败返回"0"
        /// </summary>
        /// <param name="strsql"></param>
        /// <returns></returns>
        public string CUDData(string strsql)
        {
            string result = "0";
            try
            {
                if (MySqlHelper.ExecuteNonQuery(connectionString, CommandType.Text, strsql) > 0)
                    result = "1";
            }
            catch (Exception)
            {
                result = "0";
            }
            return result;
        }
        #endregion
    }
}
