using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace CCDReportModel
{
    public class LoginInfo
    {
        //List<User> loginList = new List<User>();
        //[XmlElement(ElementName = "User")]
        public List<User> UserList { get; set; }
    }
    public class User
    {
        public string department { get; set; }
        public string password { get; set; }
    }
}
