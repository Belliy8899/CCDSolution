using CCDReportDal.Controller;
using CCDReportDal.Utils;
using CCDReportModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.SessionState;

namespace CCDReportUI.DataAPI
{
    /// <summary>
    /// login 的摘要说明
    /// </summary>
    public class login : IHttpHandler
    {
        string xmlpath = string.Empty;
        public void ProcessRequest(HttpContext context)
        {
            string LoginName = context.Request["loginname"];
            string Pass = context.Request["password"];

            string count = checkingUserPas(LoginName, Pass);
            if (count != "0")
            {
                context.Response.Write(LoginName);
            }
        }
        public string checkingUserPas(string UserName, string PassWord)
        {
            string count = "0";
            List<User> listUser = CommonController.GetUserList().ToList();
            if (listUser != null)
            {
                if (listUser.Where(c => c.department == UserName && c.password == PassWord).Count() > 0)
                {
                    count = listUser.Where(c => c.department == UserName && c.password == PassWord).Count().ToString();
                }
            }
            return count;
        }
        public List<User> GetXml()
        {
            //xmlpath = context.Server.MapPath("") + "\\login.xml";
            //string xmlpath = AppDomain.CurrentDomain.BaseDirectory + "\\login.xml";
            //string xmlpath = System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath + "login.xml";
            //string xmlpath = System.Web.Hosting.HostingEnvironment.ApplicationVirtualPath + "\\login.xml";

            using (FileStream fsRead = File.Open(xmlpath, FileMode.Open))
            {
                int fsLen = (int)fsRead.Length;
                byte[] heByte = new byte[fsLen];
                int r = fsRead.Read(heByte, 0, heByte.Length);
                string xml = System.Text.Encoding.UTF8.GetString(heByte);
                LoginInfo list = XmlUtil.Deserialize(typeof(LoginInfo), xml) as LoginInfo;
                List<User> ListUser = list.UserList;
                return ListUser;
            }
        }
        public string MD5PassWord(string Pass)
        {
            byte[] result = Encoding.Default.GetBytes(Pass);
            MD5 md = new MD5CryptoServiceProvider();
            byte[] output = md.ComputeHash(result);
            string password = BitConverter.ToString(output).Replace("-", "");
            return password;
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