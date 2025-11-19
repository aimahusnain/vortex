'use client'

import { Loader2 } from 'lucide-react'
import useSWR from 'swr'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, ShoppingCart, Zap, Package, DollarSign, Percent } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

export default function DashboardPage() {
  const { language } = useLanguage()
  const { data: inventory = [], isLoading: inventoryLoading } = useSWR('/api/inventory', fetcher)
  const { data: sales = [], isLoading: salesLoading } = useSWR('/api/sales', fetcher)
  const { data: validations = [] } = useSWR('/api/validations', fetcher)
  const { data: salesmen = [] } = useSWR('/api/salesmen', fetcher)

  const labels = {
    en: {
      dashboard: 'Dashboard',
      overview: 'Overview of your business metrics',
      totalVehicles: 'Total Cars in Stock',
      totalSales: 'Total Cars Sold',
      totalInventoryValue: 'Total Inventory Value',
      totalRevenue: 'Total Revenue',
      profitPerCar: 'Profit Per Car',
      totalProfit: 'Total Profit',
      profitPercent: 'Profit %',
      totalEarned: 'Total Earned',
      inventoryByBrand: 'Inventory Value by Brand',
      budgetByCategory: 'Budget Usage by Category',
      salesBySalesman: 'Sales by Salesman',
      month: 'Month',
      monthlySales: 'Monthly Sales',
    },
    fr: {
      dashboard: 'Tableau de bord',
      overview: 'Aperçu de vos métriques commerciales',
      totalVehicles: 'Total voitures en stock',
      totalSales: 'Total voitures vendues',
      totalInventoryValue: 'Valeur totale du stock',
      totalRevenue: 'Revenu total',
      profitPerCar: 'Profit par voiture',
      totalProfit: 'Profit total',
      profitPercent: 'Profit %',
      totalEarned: 'Total gagné',
      inventoryByBrand: 'Valeur du stock par marque',
      budgetByCategory: 'Utilisation du budget par catégorie',
      salesBySalesman: 'Ventes par vendeur',
      month: 'Mois',
      monthlySales: 'Ventes mensuelles',
    }
  }

  const t = labels[language as keyof typeof labels]

  const totalRevenue = sales.reduce((sum: number, sale: any) => sum + parseFloat(sale.salePrice || 0), 0)
  const totalCost = sales.reduce((sum: number, sale: any) => sum + parseFloat(sale.carCost || 0), 0)
  const totalProfit = sales.reduce((sum: number, sale: any) => sum + parseFloat(sale.totalProfit || 0), 0)
  const profitPercent = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0
  const avgProfitPerCar = sales.length > 0 ? (totalProfit / sales.length).toFixed(2) : 0

  const brandData = inventory.reduce((acc: any, item: any) => {
    const existing = acc.find((b: any) => b.name === item.brand)
    if (existing) {
      existing.value += parseFloat(item.advertisedPrice || 0)
    } else {
      acc.push({ name: item.brand, value: parseFloat(item.advertisedPrice || 0) })
    }
    return acc
  }, []).slice(0, 8)

  const categoryData = inventory.reduce((acc: any, item: any) => {
    const existing = acc.find((c: any) => c.name === item.category)
    if (existing) {
      existing.count += 1
    } else {
      acc.push({ name: `Category ${item.category}`, count: 1 })
    }
    return acc
  }, [])

  const salesmanData = salesmen.map((salesman: any) => {
    const salesmanSales = sales.filter((s: any) => s.salesman === salesman.name)
    return {
      name: salesman.name,
      sales: salesmanSales.length,
      revenue: salesmanSales.reduce((sum: number, s: any) => sum + parseFloat(s.salePrice || 0), 0),
    }
  })

  const isLoading = inventoryLoading || salesLoading

  const stats = [
    { label: t.totalVehicles, value: inventory.length, icon: Package, color: 'from-blue-500 to-blue-600' },
    { label: t.totalSales, value: sales.length, icon: ShoppingCart, color: 'from-green-500 to-green-600' },
    { label: t.totalInventoryValue, value: `$${inventory.reduce((sum: number, i: any) => sum + parseFloat(i.advertisedPrice || 0), 0).toFixed(0)}`, icon: DollarSign, color: 'from-purple-500 to-purple-600' },
    { label: t.profitPerCar, value: `$${avgProfitPerCar}`, icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
    { label: t.totalRevenue, value: `$${totalRevenue.toFixed(0)}`, icon: DollarSign, color: 'from-red-500 to-red-600' },
    { label: t.profitPercent, value: `${profitPercent}%`, icon: Percent, color: 'from-indigo-500 to-indigo-600' },
    { label: t.totalProfit, value: `$${totalProfit.toFixed(0)}`, icon: Zap, color: 'from-cyan-500 to-cyan-600' },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="px-8 py-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t.dashboard}</h2>
          <p className="text-muted-foreground mt-2">{t.overview}</p>
        </div>
      </header>

      <div className="p-8 space-y-8">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="bg-card/80 backdrop-blur border-border/50 hover:border-border transition-all hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">
                    {stat.label}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">{t.inventoryByBrand}</CardTitle>
            </CardHeader>
            <CardContent>
              {brandData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={brandData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-sm">No data available</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">{t.budgetByCategory}</CardTitle>
            </CardHeader>
            <CardContent>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, count }) => `${name}: ${count}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {categoryData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-sm">No data available</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">{t.salesBySalesman}</CardTitle>
          </CardHeader>
          <CardContent>
            {salesmanData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesmanData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="sales" fill="#10b981" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm">No data available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
