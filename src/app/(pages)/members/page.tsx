"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const members = [
  { name: "PRADEEP KUMAR SAHU", gender: "MALE", department: "Business Administration", designation: "General Manager (Materials)", organization: "Coal India Limited", whatsapp: "9438586336", email: "pksahu2014mcl@gmail.com", batch: "1987-1989" },
  { name: "RAVI POTHAPRAGADA", gender: "MALE", department: "Business Administration", designation: "Program Director", organization: "HCL TECH", whatsapp: "3174500967", email: "ravpot@live.com", batch: "1987-1989" },
  { name: "MANORANJAN HOTA", gender: "MALE", department: "Business Administration", designation: "Sr. Programme Manager (Finance)", organization: "Zilla Parishad, Nayagarh (Panchayati Raj & Drinking Water Department, Govt. Of Odisha)", whatsapp: "9437106878", email: "hota.manu@gmail.com", batch: "1988-1990" },
  { name: "SASANK SEKHAR NAYAK", gender: "MALE", department: "Business Administration", designation: "Head - Open Source, Apple & Mobility Competencies, Business Leader", organization: "Infosys Limited", whatsapp: "9966232051", email: "sasank.oracle@gmail.com", batch: "1988-1990" },
  { name: "ARUN KUMAR PRADHAN", gender: "MALE", department: "Business Administration", designation: "General Manager (F)", organization: "Indian oil Corporation Limited", whatsapp: "9437118105", email: "akpradhan1968@gmail.com", batch: "1989-1991" },
  { name: "CHANDRA SEKHAR PATNAIK", gender: "MALE", department: "Business Administration", designation: "Principal", organization: "Omega PG College, Hyderabad", whatsapp: "7675855573", email: "cpattnaik8@gmail.com", batch: "1990-1992" },
  { name: "JAGDISH PATTANAYAK", gender: "MALE", department: "Business Administration", designation: "Senior Vice President", organization: "AXIS BANK", whatsapp: "9937112007", email: "jagdish.pattanayak@yahoo.co.in", batch: "1991-1993" },
  { name: "SARADA PRASANNA TRIPATHY", gender: "MALE", department: "Business Administration", designation: "Regional Sales Director", organization: "TOPPAN SECURITY LIMITED", whatsapp: "9437022090", email: "spt2in@gmail.com", batch: "1991-1993" },
  { name: "SUBRAT SAHU", gender: "MALE", department: "Business Administration", designation: "Sr. Director (Accreditation, Assessment, & Rankings), and Professor (FMS)", organization: "GANPAT UNIVERSITY", whatsapp: "9727552010", email: "prof.subratsahu@gmail.com", batch: "1991-1993" },
  { name: "SHUDHAJIT HOTTA", gender: "MALE", department: "Business Administration", designation: "Group General Manager Marketing", organization: "System Anatech group", whatsapp: "7977625868", email: "shudhajithotta@gmail.com", batch: "1991-1993" },
  { name: "BIJAY PATTNAIK", gender: "MALE", department: "Business Administration", designation: "Director", organization: "Mitra PTS Pty Ltd", whatsapp: "+6143853034", email: "bmpattnaik@gmail.com", batch: "1991-1993" },
  { name: "BIJAYA KUMAR DAS", gender: "MALE", department: "Business Administration", designation: "Proprietor", organization: "M/S Bijaya Kumar Das, A class Civil Contractor", whatsapp: "9338495335", email: "1bijay.das@gmail.com", batch: "1991-1993" },
  { name: "ARUNA KUMAR SAHU", gender: "MALE", department: "Business Administration", designation: "-", organization: "Shakun Polymers Private Limited", whatsapp: "9825865491", email: "asahu272829@gmail.com", batch: "1992-1994" },
  { name: "SASMITA PATRO", gender: "FEMALE", department: "Business Administration", designation: "Social worker", organization: "-", whatsapp: "9031816528", email: "spsasmitapatro2@gmail.com", batch: "1992-1994" },
  { name: "PROF U T RAO", gender: "MALE", department: "Business Administration", designation: "Co-founder", organization: "Shrey Multispeciality Hospital, Clion Care & Open Fuel", whatsapp: "9979777284", email: "-", batch: "1996-1998" },
  { name: "DR. SUNIL KUMAR PRADHAN", gender: "MALE", department: "Business Administration", designation: "Asst. Professor Stage III", organization: "MBA Department, Berhampur University", whatsapp: "9583737059", email: "skp.mba@buodisha.edu in", batch: "1997 (PhD)" },
  { name: "SURJIT KUMAR KAR", gender: "MALE", department: "Business Administration", designation: "Visiting Faculty", organization: "Soc, XIM University, Bhubaneswar", whatsapp: "8465806014", email: "ssurjitkkar@gmail.com", batch: "1998-2000" },
  { name: "DAVID M OKOMA", gender: "MALE", department: "Business Administration", designation: "Assistant Professor", organization: "National Government Constituency Development Fund", whatsapp: "+254 722 402480", email: "mateokoma@yahoo.com", batch: "1998-2000" },
  { name: "SUBHASREE KAR", gender: "FEMALE", department: "Business Administration", designation: "Assistant Professor", organization: "TAPMI, Bengaluru, India", whatsapp: "9902433944", email: "karsubhasree@gmail.com", batch: "Ph.D. (2000)" },
  { name: "SANTOSH KUMAR ADI", gender: "MALE", department: "Business Administration", designation: "AGM", organization: "Food Corporation of India", whatsapp: "7674893979", email: "sankum459@gmail.com", batch: "1999-2001" },
  { name: "PANASA CHANDRASHEKAR", gender: "MALE", department: "Business Administration", designation: "Project Lead", organization: "Sterling Oil Exploration &Energy Petroleum Company", whatsapp: "8342056383", email: "cpanasa@gmail.com", batch: "1999-2001" },
  { name: "ASHUTOSH CHAUDHURY", gender: "MALE", department: "Business Administration", designation: "Field Director", organization: "Kantar", whatsapp: "9437160654", email: "ashutosh.chaudhury@gmail.com", batch: "2000-2002" },
  { name: "SUNIL KUMAR PANDA", gender: "MALE", department: "Business Administration", designation: "Deputy General Manager (Marketing)", organization: "National Aluminium Company Limited", whatsapp: "9940097762", email: "sunilkitu@gmail.com", batch: "2001-2003" },
  { name: "SUBHASIS MISRA", gender: "MALE", department: "Business Administration", designation: "Senior Fund Manager", organization: "Elevar Digitel Infrastructure Private Limited", whatsapp: "7303926168 & 8709478380", email: "misrasubhasis@gmail.com", batch: "2002-2004" },
  { name: "BUDHIRAM PANIGRAHY", gender: "MALE", department: "Business Administration", designation: "Chief Manager", organization: "State Bank of India", whatsapp: "9438363576", email: "budhiram@gmail.com", batch: "2002-2004" },
  { name: "MONOJ PADHI", gender: "MALE", department: "Business Administration", designation: "Income Tax Practitioner (ADVOCATE)", organization: "-", whatsapp: "9861045905", email: "monojpadhi2020@gmail.com", batch: "2002-2004" },
  { name: "SAROJ KUMAR DASH", gender: "MALE", department: "Business Administration", designation: "Assistant Registrar", organization: "Berhampur University", whatsapp: "9911728533", email: "sarojdashbu@gmail.com", batch: "2002-2004" },
  { name: "ALOK PATRO", gender: "MALE", department: "Business Administration", designation: "Assistant Consultant", organization: "TATA", whatsapp: "9874797422", email: "alokpatro4u@gmail.com", batch: "2003-2005" },
  { name: "SUNIL KUMAR MADDILA", gender: "MALE", department: "Business Administration", designation: "Chief manager", organization: "SCI", whatsapp: "9833159933", email: "sunil7707@gmail.com", batch: "2003-2005" },
  { name: "SUDHAKAR SAHU", gender: "MALE", department: "Business Administration", designation: "Regional Sales Manager", organization: "Dr Reddy’s Lab", whatsapp: "9438774145", email: "sahu.sudhakar@gmail.com", batch: "2004-2006" },
  { name: "SAMIR KUMAR DASH", gender: "MALE", department: "Business Administration", designation: "Manager", organization: "-", whatsapp: "8105260678", email: "binayak.sameer@gmail.com", batch: "2004-2006" },
  { name: "SASANKA SEKHAR BEHERA", gender: "MALE", department: "Business Administration", designation: "Team Lead", organization: "Accenture India Pvt Ltd.", whatsapp: "8469682630", email: "ssb0709@gmail.com", batch: "2004-2006" },
  { name: "DR. BADAL BIHARI RATH", gender: "MALE", department: "Business Administration", designation: "Associate Professor", organization: "Sony India Software Pvt. Ltd", whatsapp: "7042629717", email: "badalrath@gmail.com", batch: "PhD(2006)" },
  { name: "DR NIHAR RANJAN MISHRA", gender: "MALE", department: "Business Administration", designation: "Former Associate Professor", organization: "Institute of management and information science, Bhubaneswar", whatsapp: "9437187266", email: "nrmisramba@gmail.com", batch: "PhD(2008)" },
  { name: "DR SITANATH RAIGURU", gender: "MALE", department: "Business Administration", designation: "Assistant Professor", organization: "Central University of Odisha", whatsapp: "7327973178", email: "sitanathraiguru@gmail.com", batch: "PhD(2009)" },
  { name: "DR SRINIVAS MOHAPATRA", gender: "MALE", department: "Business Administration", designation: "Chairman", organization: "Presidency Group of Institutions, Berhampur", whatsapp: "8260860621", email: "-", batch: "PhD(2009)" },
  { name: "DR JITENDRA KUMAR SAHU", gender: "MALE", department: "Business Administration", designation: "Professor & HOD", organization: "SMIT Degree Engineering College, Berhampur", whatsapp: "9437424044", email: "sahujitu70@gmail.com", batch: "PhD(2010)" },
  { name: "MOHAMMED KHALIQUE", gender: "MALE", department: "Business Administration", designation: "Manager", organization: "IOB", whatsapp: "9491297785", email: "mail.mdk226@gmail.com", batch: "2009-2011" },
  { name: "RAMESWAR SWAIN", gender: "MALE", department: "Business Administration", designation: "ABM", organization: "Sun pharma", whatsapp: "9658371547", email: "rameswar.swain@gmail.com", batch: "2009-2011" },
  { name: "G MADHURI", gender: "FEMALE", department: "Business Administration", designation: "Asst Manager", organization: "-", whatsapp: "7008222507", email: "madhuri.gonthe@gmail.com", batch: "2009-2011" },
  { name: "SIBANANDA PANIGRAHY", gender: "MALE", department: "Business Administration", designation: "Team Lead", organization: "Atmosphere Hospitality Private Limited", whatsapp: "9937710441", email: "sibanandapanigrahy0@gmail.com", batch: "2009-2011" },
  { name: "BASANTA MAHAPATRO", gender: "MALE", department: "Business Administration", designation: "Assistant Vice President", organization: "HSBC", whatsapp: "8697007544", email: "bkm06121987@gmail.com", batch: "2009-2011" },
  { name: "DR SAROJ KUMAR DASH", gender: "MALE", department: "Business Administration", designation: "ASSISTANT REGISTRAR", organization: "BERHAMPUR UNIVERSITY", whatsapp: "9911728533", email: "sarojdashbu@gmail.com", batch: "PhD(2011)" },
  { name: "DR SARAT KUMAR PADHY", gender: "MALE", department: "Business Administration", designation: "Director", organization: "Presidency College, Berhampur", whatsapp: "9160126213", email: "jsahoo.foryou@gmail.com", batch: "PhD(2011)" },
  { name: "JITENDRA SAHOO", gender: "MALE", department: "Business Administration", designation: "Area Credit Manager", organization: "Bristol Myers Squibb", whatsapp: "9911728533", email: "sarojdashbu@gmail.com", batch: "2011-2013" },
  { name: "KRISHNA KUMAR SINGH", gender: "MALE", department: "Business Administration", designation: "UCO BANK", organization: "UCO BANK", whatsapp: "7892356791", email: "krishnaontheweb@outlook.com", batch: "2011-2013" },
  { name: "ASWINI MAHAPATRA", gender: "MALE", department: "Business Administration", designation: "Sun Pharma Laboratories Ltd", organization: "Sun Pharma Laboratories Ltd", whatsapp: "8093973530", email: "mahapatraaswini6@gmail.com", batch: "2011-2013" },
  { name: "MRINAL JANA", gender: "MALE", department: "Business Administration", designation: "Edelweiss Housing Finance", organization: "Edelweiss Housing Finance", whatsapp: "9067255566", email: "mjana0260@gmail.com", batch: "2011-2013" },
  { name: "ANIL RATH", gender: "MALE", department: "Business Administration", designation: "TO", organization: "T.O. SBI", whatsapp: "7008876974", email: "anilkumarrath777@gmail.com", batch: "2011-2013" },
  { name: "DR K MILAN KUMAR PATRO", gender: "MALE", department: "Business Administration", designation: "Retired from SBI", organization: "Retired from SBI", whatsapp: "9437118177", email: "milanpatrog@gmail.com", batch: "Phd (2013)" },
  { name: "SANGAM PRASAD PATRA", gender: "MALE", department: "Business Administration", designation: "Retired Chief Manager", organization: "Page Industries", whatsapp: "9040121574", email: "sangam1018@gmail.com", batch: "2012-2014" },
  { name: "ANIL KUMAR CHOUDHURY", gender: "MALE", department: "Business Administration", designation: "Deputy Manager", organization: "JB Pharma", whatsapp: "7978842216", email: "anilkumarchoudhury.14@gmail.com", batch: "2012-2014" },
  { name: "S DEVASHISH SENAPATI", gender: "MALE", department: "Business Administration", designation: "Sr Data Analyst", organization: "Lloyds Technology Centre", whatsapp: "9439519843", email: "devashish03@outlook.com", batch: "2013-2015" },
  { name: "SIDHARTH KADARI", gender: "MALE", department: "Business Administration", designation: "Senior Executive Audit", organization: "Torry Harris Business Solutions", whatsapp: "8095644035", email: "sidharthk606@gmail.com", batch: "2013-2015" },
  { name: "JAGANNATH PADHY", gender: "MALE", department: "Business Administration", designation: "Manager", organization: "-", whatsapp: "9823643673", email: "jpadhy717@gmail.com", batch: "2013-2015" },
  { name: "ABHISHEK DAS", gender: "MALE", department: "Business Administration", designation: "Chief Manager Human Resource", organization: "-", whatsapp: "7978719619", email: "abhishekdas.das169@gmail.com", batch: "2013-2015" },
  { name: "MITALI MADHUMITA PATTNAYAK", gender: "FEMALE", department: "Business Administration", designation: "Not working", organization: "L M Financial Services", whatsapp: "9556244416", email: "mitalipattnayak@gmail.com", batch: "2013-2015" },
  { name: "BIJAY KUMAR SAHU", gender: "MALE", department: "Business Administration", designation: "Deputy Manager", organization: "Cholamandalam Investment and Finance Company Limited", whatsapp: "-", email: "kumar.bijaybj@gmail.com", batch: "2013-2015" },
  { name: "PRADYUMNA KUMAR BEHERA", gender: "MALE", department: "Business Administration", designation: "Deputy Branch Manager", organization: "Deloitte Support Services India Pvt Ltd", whatsapp: "9861153121", email: "pradyumna20121993@gmail.com", batch: "2014-2016" },
  { name: "SWADHIN KUMAR PANDA", gender: "MALE", department: "Business Administration", designation: "Manager (Marketing)", organization: "Union Bank of India", whatsapp: "-", email: "buntypanda78@gmail.com", batch: "2015-2017" },
  { name: "MANOJ SETHY", gender: "MALE", department: "Business Administration", designation: "Regional Specialist", organization: "S&P Global", whatsapp: "6371106685", email: "msethy164@gmail.com", batch: "2015-2017" },
  { name: "KAMAL KUMAR ACHARYA", gender: "MALE", department: "Business Administration", designation: "Senior Executive", organization: "Jone Lang La Salle Property Consultant India Pvt. Ltd.", whatsapp: "9692596672", email: "kamalacharyactp@gmail.com", batch: "2015-2017" },
  { name: "ASHYASHREE PRAHARAJ", gender: "MALE", department: "Business Administration", designation: "Research Scholar", organization: "Berhampur University", whatsapp: "8895076616", email: "ashyashree@gmail.com", batch: "2016-2018" },
  { name: "TULSI PATNAIK", gender: "FEMALE", department: "Business Administration", designation: "Senior Executive", organization: "Angel One", whatsapp: "8763353758", email: "tulsipatnaik1996@gmail.com", batch: "2016-2018" }
];

export default function MembersPage() {
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 py-28">
      <div className="flex items-center gap-4 mb-8">
        <span className="inline-block w-2 h-10 bg-[#800000] rounded-full"></span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#800000] tracking-tight drop-shadow">
          Alumni Members List
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Table Section */}
        <div className="flex-1 overflow-x-auto rounded-lg shadow mb-2">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-[#800000]/10">
                <th className="py-3 px-4 text-left font-semibold text-[#800000]">Sl No.</th>
                <th className="py-3 px-4 text-left font-semibold text-[#800000]">Name of Alumni</th>
                <th className="py-3 px-4 text-left font-semibold text-[#800000]">Gender</th>
                <th className="py-3 px-4 text-left font-semibold text-[#800000]">Department</th>
                <th className="py-3 px-4 text-left font-semibold text-[#800000]">Designation</th>
                <th className="py-3 px-4 text-left font-semibold text-[#800000]">Organization</th>
                <th className="py-3 px-4 text-left font-semibold text-[#800000]">WhatsApp No.</th>
                <th className="py-3 px-2 text-left font-semibold text-[#800000]">Email</th>
                <th className="py-3 px-4 text-left font-semibold text-[#800000]">Batch</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, idx) => (
                <tr key={idx} className="border-t border-gray-100 hover:bg-[#800000]/5">
                  <td className="py-2 px-4">{idx + 1}</td>
                  <td className="py-2 px-4">{member.name}</td>
                  <td className="py-2 px-4">{member.gender}</td>
                  <td className="py-2 px-4">{member.department}</td>
                  <td className="py-2 px-4">{member.designation}</td>
                  <td className="py-2 px-4">{member.organization}</td>
                  <td className="py-2 px-4">{member.whatsapp}</td>
                  <td className="py-2 px-2">{member.email}</td>
                  <td className="py-2 px-4">{member.batch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
      </div>
    </div>
  );
}