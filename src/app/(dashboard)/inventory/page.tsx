'use client'

import { useState } from 'react'
import { Loader2, Plus, Search } from 'lucide-react'
import useSWR from 'swr'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import InventoryForm from '@/components/forms/inventory-form'
import InventoryTable from '@/components/inventory-table'
import { useLanguage } from '@/hooks/use-language'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function InventoryPage() {
  const { language } = useLanguage()
  const [showDialog, setShowDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { data: inventory = [], isLoading, mutate } = useSWR('/api/inventory', fetcher)
  const { data: validations = [] } = useSWR('/api/validations', fetcher)

  const labels = {
    en: {
      title: 'Inventory',
      subtitle: 'Manage vehicles and inventory',
      addBtn: 'Add Vehicle',
      search: 'Search by Stock No., VIN, or Brand...',
      recordsTitle: 'Inventory Records'
    },
    fr: {
      title: 'Inventaire',
      subtitle: 'Gérer les véhicules et l\'inventaire',
      addBtn: 'Ajouter un véhicule',
      search: 'Rechercher par N° de stock, VIN ou marque...',
      recordsTitle: 'Enregistrements d\'inventaire'
    }
  }

  const t = labels[language as keyof typeof labels]

  const handleAddInventory = async (newInventory: any) => {
    try {
      await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInventory),
      })
      mutate()
      setShowDialog(false)
    } catch (error) {
      console.error('Error adding inventory:', error)
    }
  }

  const filteredInventory = inventory.filter((item: any) =>
    item.stockNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.vinNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.model?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="px-8 py-8 flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t.title}</h2>
            <p className="text-muted-foreground mt-2">{t.subtitle}</p>
          </div>
          <Button
            onClick={() => setShowDialog(true)}
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg"
          >
            <Plus size={20} />
            {t.addBtn}
          </Button>
        </div>
      </header>

      <div className="p-8 space-y-6">
        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <Input
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>{t.recordsTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin text-primary" />
              </div>
            ) : (
              <InventoryTable inventory={filteredInventory} onRefresh={mutate} />
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
          </DialogHeader>
          <InventoryForm onSubmit={handleAddInventory} onCancel={() => setShowDialog(false)} validations={validations} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
