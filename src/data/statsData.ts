import { School, Users, GraduationCap, UsersIcon } from 'lucide-react';

export const statsCards = [
  {
    icon: School,
    title: 'Partner Schools',
    value: '156',
    change: '+8.2%',
    period: 'from last month',
    subtitle: '13 branches',
    color: 'blue' as const
  },
  {
    icon: Users,
    title: 'Total Students', 
    value: '45,231',
    change: '+10.5%',
    period: 'active today',
    subtitle: 'active',
    color: 'green' as const
  },
  {
    icon: GraduationCap,
    title: 'Total Teachers',
    value: '5,426',
    change: '+6.1%',
    period: 'active teaching',
    subtitle: 'staff',
    color: 'purple' as const
  },
  {
    icon: UsersIcon,
    title: 'Total Parents',
    value: '38,920', 
    change: '+10.5%',
    period: 'active parent',
    subtitle: 'accounts',
    color: 'orange' as const
  }
];