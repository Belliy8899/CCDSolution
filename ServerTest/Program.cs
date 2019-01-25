using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ServerTest
{
    class Program
    {
        static void Main(string[] args)
        {

            //System.Net.IPAddress[] addressList = Dns.GetHostByName(Dns.GetHostName()).AddressList;

            ServiceReference1.ServiceClient client = new ServiceReference1.ServiceClient();
            //string arr = "00104, Test, 下石家3楼, 极耳测量";
            //bool r=client.ClaerKpiData(arr);
            string arr1 = "00104, APH38, 3栋2楼, 极耳剪切1, 127.0.0.104, 毛刺大 ";
          bool re=  client.UploadCCDAlramInfo(arr1);

            //string type = "ZXTH";
            //string num = "01";
            //string ip = "10.197.12.94";
            //string ok = "0.97";
            //string okn = "0.87";
            //string ng = "0.03";
            //string data = type + "," + num + "," + ip + "," + ok + "," + okn + "," + ng;
            //bool result = client.UploadCCDKPI(data);
            //bool result=  client.UploadCCDKPI(data);
            //Action ac = new Action(() =>
            //{
            //    for (int i = 0; i < 100; i++)
            //    {
            //        string okr = (0.90 + Convert.ToDouble("0.00" + i)).ToString();
            //        string ngr = (1 - Convert.ToDouble(okr)).ToString();
            //        string p = "CCDTest,001,171.30.1.22," + okr + ",0.98," + ngr;
            //        client.UploadCCDKPI(p);
            //        Console.WriteLine("--------test001--------" + DateTime.Now);
            //    }
            //});
            //Action ac1 = new Action(() =>
            //{
            //    for (int i = 0; i < 100; i++)
            //    {
            //        string okr = (0.90 + Convert.ToDouble("0.00" + i)).ToString();
            //        string ngr = (1 - Convert.ToDouble(okr)).ToString();
            //        string p = "CCDTest,002,171.30.1.23," + okr + ",0.98," + ngr;
            //        client.UploadCCDKPI(p);
            //        Console.WriteLine("-------test002---------" + DateTime.Now);
            //    }
            //});
            //Action ac2 = new Action(() =>
            //{
            //    for (int i = 0; i < 100; i++)
            //    {
            //        string okr = (0.90 + Convert.ToDouble("0.00" + i)).ToString();
            //        string ngr = (1 - Convert.ToDouble(okr)).ToString();
            //        string p = "CCDTest,003,171.30.1.24," + okr + ",0.98," + ngr;
            //        client.UploadCCDKPI(p);
            //        Console.WriteLine("-------test003---------" + DateTime.Now);
            //    }
            //});
            //IAsyncResult result = ac.BeginInvoke(null, null);
            //IAsyncResult result1 = ac1.BeginInvoke(null, null);
            //IAsyncResult result2 = ac2.BeginInvoke(null, null);
            //ac.EndInvoke(result);
            //ac1.EndInvoke(result1);
            //ac2.EndInvoke(result2);
            //Console.ReadKey();
        }
    }
}
