'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Title, 
  Text, 
  Tab, 
  TabList, 
  TabGroup, 
  TabPanel, 
  TabPanels,
  Grid,
  Metric,
  AreaChart,
  BarChart,
  DonutChart,
  Legend,
  Flex,
  ProgressBar,
  Badge,
  Color,
  Divider,
  Bold,
  List,
  ListItem,
  Icon
} from '@tremor/react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  DocumentTextIcon, 
  ClipboardDocumentCheckIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  ChartPieIcon
} from '@heroicons/react/24/solid';

// Vibrant color palette
const colors = {
  primary: 'indigo' as Color,
  secondary: 'violet' as Color,
  success: 'emerald' as Color,
  warning: 'amber' as Color,
  danger: 'rose' as Color,
  info: 'cyan' as Color,
  neutral: 'slate' as Color
};

// Chart color schemes - adding more vibrant color combinations
const chartColors = {
  // Vibrant color schemes for different chart types
  bidStatus: ['emerald', 'violet', 'amber'],
  projectStatus: ['indigo', 'cyan', 'emerald', 'rose'],
  inventory: ['fuchsia', 'violet', 'indigo', 'cyan'],
  clients: ['violet', 'indigo', 'cyan', 'emerald'],
  revenue: ['emerald', 'cyan', 'indigo', 'violet'],
  performance: ['indigo', 'violet', 'fuchsia', 'rose'],
  timeline: ['cyan', 'indigo', 'violet', 'fuchsia']
};

// Mock data - will be replaced with real API calls
const mockBidData = [
  { month: 'Jan', total: 45000, accepted: 30000, rejected: 5000, pending: 10000 },
  { month: 'Feb', total: 52000, accepted: 35000, rejected: 7000, pending: 10000 },
  { month: 'Mar', total: 48000, accepted: 28000, rejected: 10000, pending: 10000 },
  { month: 'Apr', total: 61000, accepted: 40000, rejected: 8000, pending: 13000 },
  { month: 'May', total: 55000, accepted: 37000, rejected: 8000, pending: 10000 },
  { month: 'Jun', total: 67000, accepted: 45000, rejected: 12000, pending: 10000 },
];

const mockProjectStatusData = [
  { name: 'Pending', value: 15 },
  { name: 'In Progress', value: 45 },
  { name: 'Completed', value: 30 },
  { name: 'Cancelled', value: 10 },
];

const mockInventoryData = [
  { category: 'Windows', count: 120, value: 35000 },
  { category: 'Doors', count: 85, value: 42000 },
  { category: 'Hardware', count: 200, value: 15000 },
  { category: 'Materials', count: 150, value: 8000 },
];

const mockClientData = [
  { name: 'Acme Construction', bids: 12, projects: 8, value: 120000 },
  { name: 'Luxury Homes Inc', bids: 8, projects: 5, value: 95000 },
  { name: 'Modern Renovations', bids: 15, projects: 10, value: 85000 },
  { name: 'Commercial Builders LLC', bids: 20, projects: 12, value: 250000 },
  { name: 'Sustainable Living Spaces', bids: 10, projects: 6, value: 75000 },
];

// Helper component for metric cards
const MetricCard = ({ 
  title, 
  value, 
  icon, 
  color, 
  subValue, 
  subLabel, 
  trend 
}: { 
  title: string, 
  value: string | number, 
  icon: React.ReactNode, 
  color: Color, 
  subValue: string, 
  subLabel: string, 
  trend: 'up' | 'down' | 'neutral' 
}) => {
  const trendColor = trend === 'up' ? 'emerald' : trend === 'down' ? 'rose' : 'slate';
  const TrendIcon = trend === 'up' ? ArrowUpIcon : trend === 'down' ? ArrowDownIcon : null;
  
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 h-24 w-24 -mr-8 -mt-8 rounded-full bg-gradient-to-br from-transparent to-current opacity-10" style={{ color: `var(--${color}-500)` }}></div>
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-${color}-100 text-${color}-700`}>
          {icon}
        </div>
        <Text>{title}</Text>
      </div>
      <Metric className="mt-2">{value}</Metric>
      <Flex className="mt-3">
        <div className="flex items-center space-x-1">
          {TrendIcon && <TrendIcon className={`h-4 w-4 text-${trendColor}-500`} />}
          <Text className={`text-${trendColor}-500`}>{subValue}</Text>
        </div>
        <Text>{subLabel}</Text>
      </Flex>
      <ProgressBar value={parseInt(subValue)} color={color} className="mt-2" />
    </Card>
  );
};

export default function ReportsPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    totalBids: 0,
    totalProjects: 0,
    totalClients: 0,
    totalRevenue: 0,
    bidData: mockBidData,
    projectStatusData: mockProjectStatusData,
    inventoryData: mockInventoryData,
    clientData: mockClientData,
  });

  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      try {
        // In a real implementation, these would be API calls to your backend
        // const response = await fetch('/api/reports/dashboard');
        // const data = await response.json();
        
        // For now, we'll use mock data
        setDashboardData({
          totalBids: 65,
          totalProjects: 41,
          totalClients: 5,
          totalRevenue: 625000,
          bidData: mockBidData,
          projectStatusData: mockProjectStatusData,
          inventoryData: mockInventoryData,
          clientData: mockClientData,
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-6 rounded-lg shadow-lg mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-indigo-100 mt-1">View insights and performance metrics for your business</p>
          </div>
          <div className="flex space-x-2">
            <select className="bg-white/20 backdrop-blur-sm text-white border-0 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-white/50 focus:outline-none">
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
              <option>Year to Date</option>
              <option>Custom Range</option>
            </select>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm transition-colors">
              Export
            </button>
            <button className="bg-white text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
        <MetricCard 
          title="Total Bids" 
          value={dashboardData.totalBids} 
          icon={<DocumentTextIcon className="h-5 w-5" />} 
          color={colors.primary} 
          subValue="68%" 
          subLabel="Acceptance Rate" 
          trend="up" 
        />
        
        <MetricCard 
          title="Active Projects" 
          value={dashboardData.totalProjects} 
          icon={<ClipboardDocumentCheckIcon className="h-5 w-5" />} 
          color={colors.success} 
          subValue="42%" 
          subLabel="Completion Rate" 
          trend="up" 
        />
        
        <MetricCard 
          title="Total Clients" 
          value={dashboardData.totalClients} 
          icon={<UserGroupIcon className="h-5 w-5" />} 
          color={colors.warning} 
          subValue="80%" 
          subLabel="Repeat Business" 
          trend="up" 
        />
        
        <MetricCard 
          title="Total Revenue" 
          value={`$${dashboardData.totalRevenue.toLocaleString()}`} 
          icon={<CurrencyDollarIcon className="h-5 w-5" />} 
          color={colors.info} 
          subValue="24%" 
          subLabel="YoY Growth" 
          trend="up" 
        />
      </Grid>

      <TabGroup index={selectedTab} onIndexChange={setSelectedTab}>
        <TabList className="mb-8 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
          <Tab className="px-6 py-3 text-sm font-medium data-[selected]:bg-indigo-50 data-[selected]:text-indigo-700 rounded-md transition-colors">
            <div className="flex items-center space-x-2">
              <ChartBarIcon className="h-5 w-5" />
              <span>Overview</span>
            </div>
          </Tab>
          <Tab className="px-6 py-3 text-sm font-medium data-[selected]:bg-indigo-50 data-[selected]:text-indigo-700 rounded-md transition-colors">
            <div className="flex items-center space-x-2">
              <DocumentTextIcon className="h-5 w-5" />
              <span>Bids</span>
            </div>
          </Tab>
          <Tab className="px-6 py-3 text-sm font-medium data-[selected]:bg-indigo-50 data-[selected]:text-indigo-700 rounded-md transition-colors">
            <div className="flex items-center space-x-2">
              <ClipboardDocumentCheckIcon className="h-5 w-5" />
              <span>Projects</span>
            </div>
          </Tab>
          <Tab className="px-6 py-3 text-sm font-medium data-[selected]:bg-indigo-50 data-[selected]:text-indigo-700 rounded-md transition-colors">
            <div className="flex items-center space-x-2">
              <ChartPieIcon className="h-5 w-5" />
              <span>Inventory</span>
            </div>
          </Tab>
          <Tab className="px-6 py-3 text-sm font-medium data-[selected]:bg-indigo-50 data-[selected]:text-indigo-700 rounded-md transition-colors">
            <div className="flex items-center space-x-2">
              <UserGroupIcon className="h-5 w-5" />
              <span>Clients</span>
            </div>
          </Tab>
        </TabList>
        
        <TabPanels>
          {/* Overview Panel */}
          <TabPanel>
            <Grid numItems={1} numItemsLg={2} className="gap-6">
              <Card className="overflow-hidden">
                <div className="p-6">
                  <Title>Bid Performance</Title>
                  <Text className="text-gray-500">Monthly breakdown of bid values by status</Text>
                </div>
                <Divider />
                <div className="p-6 pt-2">
                  <AreaChart
                    className="h-72"
                    data={dashboardData.bidData}
                    index="month"
                    categories={["accepted", "rejected", "pending"]}
                    colors={chartColors.bidStatus}
                    valueFormatter={(number) => `$${number.toLocaleString()}`}
                    showLegend={true}
                    showAnimation={true}
                    showGridLines={false}
                  />
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="p-6">
                  <Title>Project Status Distribution</Title>
                  <Text className="text-gray-500">Current status of all projects</Text>
                </div>
                <Divider />
                <div className="p-6 pt-2">
                  <DonutChart
                    className="h-72"
                    data={dashboardData.projectStatusData}
                    category="value"
                    index="name"
                    colors={chartColors.projectStatus}
                    valueFormatter={(number) => `${number}%`}
                    showAnimation={true}
                    showTooltip={true}
                  />
                </div>
              </Card>
              
              <Card className="col-span-1 lg:col-span-2 overflow-hidden">
                <div className="p-6">
                  <Title>Top Clients by Revenue</Title>
                  <Text className="text-gray-500">Clients generating the most revenue</Text>
                </div>
                <Divider />
                <div className="p-6 pt-2">
                  <BarChart
                    className="h-72"
                    data={dashboardData.clientData}
                    index="name"
                    categories={["value"]}
                    colors={chartColors.clients}
                    valueFormatter={(number) => `$${number.toLocaleString()}`}
                    showLegend={false}
                    showAnimation={true}
                    showGridLines={false}
                  />
                </div>
              </Card>
            </Grid>
          </TabPanel>
          
          {/* Bids Panel */}
          <TabPanel>
            <Grid numItems={1} numItemsLg={2} className="gap-6">
              <Card className="overflow-hidden">
                <div className="p-6">
                  <Title>Bid Trends</Title>
                  <Text className="text-gray-500">Total bid value over time</Text>
                </div>
                <Divider />
                <div className="p-6 pt-2">
                  <AreaChart
                    className="h-72"
                    data={dashboardData.bidData}
                    index="month"
                    categories={["total"]}
                    colors={[chartColors.performance[0]]}
                    valueFormatter={(number) => `$${number.toLocaleString()}`}
                    showAnimation={true}
                    showGridLines={false}
                  />
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="p-6">
                  <Title>Bid Status Distribution</Title>
                  <Text className="text-gray-500">Percentage breakdown by status</Text>
                </div>
                <Divider />
                <div className="p-6 pt-2">
                  <DonutChart
                    className="h-72"
                    data={[
                      { name: 'Accepted', value: 65 },
                      { name: 'Rejected', value: 15 },
                      { name: 'Pending', value: 20 },
                    ]}
                    category="value"
                    index="name"
                    colors={chartColors.bidStatus}
                    valueFormatter={(number) => `${number}%`}
                    showAnimation={true}
                  />
                </div>
              </Card>
              
              <Card className="col-span-1 lg:col-span-2 overflow-hidden">
                <div className="p-6">
                  <Title>Bid Value by Month</Title>
                  <Text className="text-gray-500">Monthly breakdown by status</Text>
                </div>
                <Divider />
                <div className="p-6 pt-2">
                  <BarChart
                    className="h-72"
                    data={dashboardData.bidData}
                    index="month"
                    categories={["accepted", "rejected", "pending"]}
                    colors={chartColors.bidStatus}
                    stack={true}
                    valueFormatter={(number) => `$${number.toLocaleString()}`}
                    showAnimation={true}
                    showGridLines={false}
                  />
                </div>
              </Card>
            </Grid>
          </TabPanel>
          
          {/* Projects Panel */}
          <TabPanel>
            <Grid numItems={1} numItemsLg={2} className="gap-6">
              <Card className="overflow-hidden">
                <div className="p-6">
                  <Title>Project Status</Title>
                  <Text className="text-gray-500">Current status of all projects</Text>
                </div>
                <Divider />
                <div className="p-6 pt-2">
                  <DonutChart
                    className="h-72"
                    data={dashboardData.projectStatusData}
                    category="value"
                    index="name"
                    colors={chartColors.projectStatus}
                    valueFormatter={(number) => `${number}%`}
                    showAnimation={true}
                  />
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="p-6">
                  <Title>Projects by Client</Title>
                  <Text className="text-gray-500">Number of projects per client</Text>
                </div>
                <Divider />
                <div className="p-6 pt-2">
                  <BarChart
                    className="h-72"
                    data={dashboardData.clientData}
                    index="name"
                    categories={["projects"]}
                    colors={[chartColors.timeline[0]]}
                    valueFormatter={(number) => number.toString()}
                    showAnimation={true}
                    showGridLines={false}
                  />
                </div>
              </Card>
            </Grid>
          </TabPanel>
          
          {/* Inventory Panel */}
          <TabPanel>
            <Grid numItems={1} numItemsLg={2} className="gap-6">
              <Card className="overflow-hidden">
                <div className="p-6">
                  <Title>Inventory Value by Category</Title>
                  <Text className="text-gray-500">Total value of inventory items</Text>
                </div>
                <Divider />
                <div className="p-6 pt-2">
                  <BarChart
                    className="h-72"
                    data={dashboardData.inventoryData}
                    index="category"
                    categories={["value"]}
                    colors={[chartColors.inventory[0]]}
                    valueFormatter={(number) => `$${number.toLocaleString()}`}
                    showAnimation={true}
                    showGridLines={false}
                  />
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="p-6">
                  <Title>Inventory Count by Category</Title>
                  <Text className="text-gray-500">Number of items per category</Text>
                </div>
                <Divider />
                <div className="p-6 pt-2">
                  <DonutChart
                    className="h-72"
                    data={dashboardData.inventoryData}
                    category="count"
                    index="category"
                    colors={chartColors.inventory}
                    valueFormatter={(number) => number.toString()}
                    showAnimation={true}
                  />
                </div>
              </Card>
            </Grid>
          </TabPanel>
          
          {/* Clients Panel */}
          <TabPanel>
            <Grid numItems={1} numItemsLg={2} className="gap-6">
              <Card className="overflow-hidden">
                <div className="p-6">
                  <Title>Top Clients by Revenue</Title>
                  <Text className="text-gray-500">Clients generating the most revenue</Text>
                </div>
                <Divider />
                <div className="p-6 pt-2">
                  <BarChart
                    className="h-72"
                    data={dashboardData.clientData}
                    index="name"
                    categories={["value"]}
                    colors={[chartColors.clients[0]]}
                    valueFormatter={(number) => `$${number.toLocaleString()}`}
                    showAnimation={true}
                    showGridLines={false}
                  />
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="p-6">
                  <Title>Client Activity</Title>
                  <Text className="text-gray-500">Bids and projects by client</Text>
                </div>
                <Divider />
                <div className="p-6 pt-2">
                  <BarChart
                    className="h-72"
                    data={dashboardData.clientData}
                    index="name"
                    categories={["bids", "projects"]}
                    colors={[chartColors.clients[1], chartColors.clients[2]]}
                    valueFormatter={(number) => number.toString()}
                    showAnimation={true}
                    showGridLines={false}
                  />
                </div>
              </Card>
            </Grid>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
} 