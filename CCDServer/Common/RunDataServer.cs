using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Configuration;
using CCDServer.Common;
using System.Reflection;

namespace CCDServer.Common
{
    
    public class RunDataServer
    {
        public static readonly string constr = ConfigurationManager.ConnectionStrings["connstr"].ConnectionString;

        #region 001、统一调用的服务接口
        /// <summary>
        /// 统一调用的服务接口
        /// </summary>
        /// <param name="spc">命名空间+类名</param>
        /// <param name="APIName">方法名</param>
        /// <param name="Parameters">参数，多个参数用特殊字符拼接</param>
        /// <returns></returns>
        public static string RunServerAPI(string spc, string APIName, string Parameters)
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
            using (SqlConnection connection = new SqlConnection(constr))
            {
                DataTable dt = new DataTable();
                try
                {
                    if (connection.State != ConnectionState.Open)
                        connection.Open();
                    dt = SqlHelper.ExecuteDataset(connection, CommandType.Text, strsql).Tables[0];
                    dt.TableName = "MyDT";
                    return dt;
                }
                catch (Exception)
                {
                    return null;
                }
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
            using (SqlConnection connection = new SqlConnection(constr))
            {
                try
                {
                    if (connection.State != ConnectionState.Open)
                        connection.Open();
                    return Newtonsoft.Json.JsonConvert.SerializeObject(SqlHelper.ExecuteDataset(connection, CommandType.Text, strsql).Tables[0]);
                }
                catch (Exception)
                {
                    return "";
                }
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
            using (SqlConnection connection = new SqlConnection(constr))
            {
                string result = "0";
                try
                {
                    if (connection.State != ConnectionState.Open)
                        connection.Open();
                    if (SqlHelper.ExecuteNonQuery(connection, CommandType.Text, strsql) > 0)
                        result = "1";
                }
                catch (Exception)
                {
                    result = "0";
                }
                return result;
            }
        }
        #endregion
    }
}
