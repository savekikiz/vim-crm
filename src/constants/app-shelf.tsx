import {
  IconChargingPile,
  IconDatabase,
  IconPlug,
  IconReport,
  IconShieldBolt,
  IconSolarPanel2,
} from '@tabler/icons-react'
export const CATEGORIES = ['app', 'document', 'external'].filter(
  (_, index) => index === 0 || index === 2
)

export const APP_SHELFS = [
  {
    category: 'app',
    description:
      'เว็บไซต์คำนวณการติดตั้งระบบโซลาร์เซลล์ที่เหมาะสมกับบ้านของคุณ',
    icon: <IconSolarPanel2 className="text-white" />,
    link: '/msolarfit',
    title: 'mSolarFit',
  },
  {
    category: 'app',
    description:
      'แอพพลิเคชันที่ช่วยให้คุณสามารถคำนวณค่าใช้ไฟฟ้าจากอัตราการใช้ไฟฟ้า',
    icon: <IconPlug className="text-white" />,
    link: '/bill-buddy',
    title: 'Bill Buddy',
  },
  {
    category: 'app',
    description:
      'แอพพลิเคชันที่ช่วยให้คุณสามารถคำนวณการใช้พลังงานไฟฟ้าจากการชาร์จรถยนต์ไฟฟ้า',
    icon: <IconChargingPile className="text-white" />,
    link: '/m-ev',
    title: 'mEV',
  },
  {
    category: 'app',
    description:
      'แอพพลิเคชันที่ช่วยให้คุณสามารถคำนวณการใช้พลังงานไฟฟ้าและแจ้งเตือนเมื่อมีการใช้ไฟฟ้าสูงเกินไป',
    icon: <IconShieldBolt className="text-white" />,
    link: '/overload-alert',
    title: 'Overload Alert',
  },
  {
    category: 'document',
    description: 'เอกสารองค์ความรู้ของกองโครงข่ายไฟฟ้าอัจฉริยะ',
    icon: <IconDatabase className="text-white" />,
    link: '',
    title: 'Smart Grid Knowledge Base',
  },
  {
    category: 'document',
    description:
      'เอกสารรายงานการวิจัยและพัฒนาโครงการต่างๆ ของกองโครงข่ายไฟฟ้าอัจฉริยะ',
    icon: <IconReport className="text-white" />,
    link: '',
    title: 'Research and Development Reports',
  },

  {
    category: 'external',
    description: 'ข้อมูลการใช้ไฟฟ้าของกองโครงข่ายไฟฟ้าอัจฉริยะ',
    icon: <IconReport className="text-white" />,
    link: 'https://loadresearch.mea.or.th/',
    title: 'Load Research',
  },
  {
    category: 'external',
    description: 'แดชบอร์ดข้อมูลการใช้ไฟฟ้าของกองโครงข่ายไฟฟ้าอัจฉริยะ',
    icon: <IconReport className="text-white" />,
    link: 'https://app.powerbi.com/view?r=eyJrIjoiNWY3MmU0NTYtOGRhMy00NWQyLThlZjctMDQzNzFkMzdhZmE3IiwidCI6ImZlYmM0NDkwLTY2MjEtNGJkNy1iZmI1LTZmMDkyZjhiN2ZhYyIsImMiOjEwfQ%3D%3D',
    title: 'Smart Grid Dashboard',
  },
]
