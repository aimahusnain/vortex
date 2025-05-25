"use client"

import { useState, useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react"
import {
  Building2,
  Calculator,
  Users,
  DollarSign,
  Save,
  AlertCircle,
  Percent,
  Clock,
  Briefcase,
  Target,
  RotateCcw,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Info,
  X,
} from "lucide-react"
import { SiteHeader } from "@/components/sidebar/site-header"

// Types
interface CompanyInfo {
  name: string
  streetAddress: string
  city: string
  state: string
  zip: string
}

interface LaborRates {
  laborers: string
  supervision: string
}

interface Margin {
  id: number
  category: string
  default: string
  minimum: string
}

interface Personnel {
  id: number
  salesPerson: string
  opsManager: string
  estimator: string
}

interface SubcontractorMarkupItem {
  markup: string
  grossMargin: string
}

interface SubcontractorMarkup {
  default: SubcontractorMarkupItem
  minimum: SubcontractorMarkupItem
}

interface PersonnelForm {
  salesPerson: string
  opsManager: string
  estimator: string
}

interface MarginForm {
  category: string
  default: string
  minimum: string
}

interface Toast {
  id: string
  type: "success" | "error" | "info"
  title: string
  message: string
}

// Custom Toast Component
const ToastContainer = ({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-[calc(100vw-2rem)] sm:max-w-[400px]">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

const ToastItem = ({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onRemove(toast.id), 300)
    }, 4000)

    return () => clearTimeout(timer)
  }, [toast.id, onRemove])

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />,
  }

  const colors = {
    success: "bg-emerald-50 border-emerald-200 shadow-emerald-100",
    error: "bg-rose-50 border-rose-200 shadow-rose-100",
    info: "bg-sky-50 border-sky-200 shadow-sky-100",
  }

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm shadow-lg
        transform transition-all duration-300 ease-out min-w-[280px] w-full
        ${colors[toast.type]}
        ${isVisible ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"}
      `}
    >
      {icons[toast.type]}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-slate-800 text-sm truncate">{toast.title}</h4>
        <p className="text-slate-600 text-sm mt-1 break-words">{toast.message}</p>
      </div>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        className="text-slate-400 hover:text-slate-600 min-w-6 h-6 flex-shrink-0"
        onPress={() => {
          setIsVisible(false)
          setTimeout(() => onRemove(toast.id), 300)
        }}
      >
        <X size={14} />
      </Button>
    </div>
  )
}

export default function BusinessConfiguration() {
  // State management
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
  })

  const [salesTaxRate, setSalesTaxRate] = useState<string>("6")
  const [laborBurdenRate, setLaborBurdenRate] = useState<string>("15")

  const [laborRates, setLaborRates] = useState<LaborRates>({
    laborers: "25",
    supervision: "35",
  })

  const [margins, setMargins] = useState<Margin[]>([
    { id: 1, category: "Equipment", default: "55", minimum: "30" },
    { id: 2, category: "Labor", default: "55", minimum: "30" },
    { id: 3, category: "Hard Material", default: "55", minimum: "30" },
    { id: 4, category: "Plant Material", default: "55", minimum: "30" },
    { id: 5, category: "Other Job Costs", default: "55", minimum: "30" },
    { id: 6, category: "Overall", default: "55", minimum: "45" },
  ])

  const [subcontractorMarkup, setSubcontractorMarkup] = useState<SubcontractorMarkup>({
    default: { markup: "30", grossMargin: "" },
    minimum: { markup: "20", grossMargin: "" },
  })

  const [personnel, setPersonnel] = useState<Personnel[]>([
    {
      id: 1,
      salesPerson: "Test 1",
      opsManager: "Ops Manager 1",
      estimator: "Estimator 1",
    },
    {
      id: 2,
      salesPerson: "Test 2",
      opsManager: "Ops Manager 2",
      estimator: "Estimator 2",
    },
    {
      id: 3,
      salesPerson: "Test 3",
      opsManager: "Ops Manager 3",
      estimator: "Estimator 3",
    },
    {
      id: 4,
      salesPerson: "Test 4",
      opsManager: "Ops Manager 4",
      estimator: "Estimator 4",
    },
    {
      id: 5,
      salesPerson: "Test 5",
      opsManager: "Ops Manager 5",
      estimator: "Estimator 5",
    },
    {
      id: 6,
      salesPerson: "Test 6",
      opsManager: "Ops Manager 6",
      estimator: "Estimator 6",
    },
    {
      id: 7,
      salesPerson: "Test 7",
      opsManager: "Ops Manager 7",
      estimator: "Estimator 7",
    },
  ])

  const [reviewThreshold, setReviewThreshold] = useState<string>("10000")

  // Original values for change detection
  const [originalCompanyInfo] = useState<CompanyInfo>({
    name: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
  })

  const [originalSalesTaxRate] = useState<string>("6")
  const [originalLaborBurdenRate] = useState<string>("15")
  const [originalLaborRates] = useState<LaborRates>({
    laborers: "25",
    supervision: "35",
  })
  const [originalReviewThreshold] = useState<string>("10000")

  const [originalSubcontractorMarkup] = useState<SubcontractorMarkup>({
    default: { markup: "30", grossMargin: "" },
    minimum: { markup: "20", grossMargin: "" },
  })

  // Change detection functions
  const hasCompanyInfoChanges = () => {
    const hasChanges =
      companyInfo.name !== originalCompanyInfo.name ||
      companyInfo.streetAddress !== originalCompanyInfo.streetAddress ||
      companyInfo.city !== originalCompanyInfo.city ||
      companyInfo.state !== originalCompanyInfo.state ||
      companyInfo.zip !== originalCompanyInfo.zip

    const hasContent =
      companyInfo.name.trim() !== "" ||
      companyInfo.streetAddress.trim() !== "" ||
      companyInfo.city.trim() !== "" ||
      companyInfo.state.trim() !== "" ||
      companyInfo.zip.trim() !== ""

    return { hasChanges, hasContent }
  }

  const hasFinancialChanges = () => {
    const hasChanges =
      salesTaxRate !== originalSalesTaxRate ||
      laborBurdenRate !== originalLaborBurdenRate ||
      laborRates.laborers !== originalLaborRates.laborers ||
      laborRates.supervision !== originalLaborRates.supervision ||
      reviewThreshold !== originalReviewThreshold

    const hasContent =
      salesTaxRate.trim() !== "" &&
      laborBurdenRate.trim() !== "" &&
      laborRates.laborers.trim() !== "" &&
      laborRates.supervision.trim() !== "" &&
      reviewThreshold.trim() !== ""

    return { hasChanges, hasContent }
  }

  const hasSubcontractorChanges = () => {
    const hasChanges =
      subcontractorMarkup.default.markup !== originalSubcontractorMarkup.default.markup ||
      subcontractorMarkup.default.grossMargin !== originalSubcontractorMarkup.default.grossMargin ||
      subcontractorMarkup.minimum.markup !== originalSubcontractorMarkup.minimum.markup ||
      subcontractorMarkup.minimum.grossMargin !== originalSubcontractorMarkup.minimum.grossMargin

    const hasContent =
      subcontractorMarkup.default.markup.trim() !== "" && subcontractorMarkup.minimum.markup.trim() !== ""

    return { hasChanges, hasContent }
  }

  // Toast state
  const [toasts, setToasts] = useState<Toast[]>([])

  // Modal states
  const { isOpen: isPersonnelModalOpen, onOpen: onPersonnelModalOpen, onClose: onPersonnelModalClose } = useDisclosure()

  const { isOpen: isMarginModalOpen, onOpen: onMarginModalOpen, onClose: onMarginModalClose } = useDisclosure()

  // Delete confirmation modal states
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure()
  const [deleteItem, setDeleteItem] = useState<{ type: string; id: number; name: string } | null>(null)

  const [editingPersonnel, setEditingPersonnel] = useState<Personnel | null>(null)
  const [editingMargin, setEditingMargin] = useState<Margin | null>(null)

  const [personnelForm, setPersonnelForm] = useState<PersonnelForm>({
    salesPerson: "",
    opsManager: "",
    estimator: "",
  })

  const [marginForm, setMarginForm] = useState<MarginForm>({
    category: "",
    default: "",
    minimum: "",
  })

  // Toast functions
  const addToast = (type: "success" | "error" | "info", title: string, message: string) => {
    const newToast: Toast = {
      id: Date.now().toString(),
      type,
      title,
      message,
    }
    setToasts((prev) => [...prev, newToast])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  // Delete confirmation handler
  const handleDeleteConfirmation = (type: string, id: number, name: string) => {
    setDeleteItem({ type, id, name })
    onDeleteModalOpen()
  }

  const handleConfirmDelete = () => {
    if (!deleteItem) return

    switch (deleteItem.type) {
      case "personnel":
        setPersonnel(personnel.filter((p) => p.id !== deleteItem.id))
        addToast("success", "Personnel Deleted", `"${deleteItem.name}" has been successfully removed.`)
        break
      case "margin":
        setMargins(margins.filter((m) => m.id !== deleteItem.id))
        addToast("success", "Margin Deleted", `"${deleteItem.name}" has been successfully removed.`)
        break
    }

    setDeleteItem(null)
    onDeleteModalClose()
  }

  // Personnel CRUD functions
  const openPersonnelModal = (person: Personnel | null = null): void => {
    if (person) {
      setEditingPersonnel(person)
      setPersonnelForm({
        salesPerson: person.salesPerson,
        opsManager: person.opsManager,
        estimator: person.estimator,
      })
    } else {
      setEditingPersonnel(null)
      setPersonnelForm({
        salesPerson: "",
        opsManager: "",
        estimator: "",
      })
    }
    onPersonnelModalOpen()
  }

  const savePersonnel = (): void => {
    if (editingPersonnel) {
      // Update existing personnel
      setPersonnel(personnel.map((p) => (p.id === editingPersonnel.id ? { ...p, ...personnelForm } : p)))
      addToast("success", "Personnel Updated", `"${personnelForm.salesPerson}" has been successfully updated.`)
    } else {
      // Add new personnel
      const newId = Math.max(...personnel.map((p) => p.id), 0) + 1
      setPersonnel([...personnel, { id: newId, ...personnelForm }])
      addToast("success", "Personnel Added", `"${personnelForm.salesPerson}" has been successfully added.`)
    }
    onPersonnelModalClose()
  }

  // Margin CRUD functions
  const openMarginModal = (margin: Margin | null = null): void => {
    if (margin) {
      setEditingMargin(margin)
      setMarginForm({
        category: margin.category,
        default: margin.default,
        minimum: margin.minimum,
      })
    } else {
      setEditingMargin(null)
      setMarginForm({
        category: "",
        default: "",
        minimum: "",
      })
    }
    onMarginModalOpen()
  }

  const saveMargin = (): void => {
    if (editingMargin) {
      // Update existing margin
      setMargins(margins.map((m) => (m.id === editingMargin.id ? { ...m, ...marginForm } : m)))
      addToast("success", "Margin Updated", `"${marginForm.category}" has been successfully updated.`)
    } else {
      // Add new margin
      const newId = Math.max(...margins.map((m) => m.id), 0) + 1
      setMargins([...margins, { id: newId, ...marginForm }])
      addToast("success", "Margin Added", `"${marginForm.category}" has been successfully added.`)
    }
    onMarginModalClose()
  }

  // Reset functions for each section
  const resetCompanyInfo = (): void => {
    setCompanyInfo({
      name: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
    })
    addToast("info", "Company Info Reset", "Company information has been reset to default values.")
  }

  const resetFinancialSettings = (): void => {
    setSalesTaxRate("6")
    setLaborBurdenRate("15")
    setLaborRates({
      laborers: "25",
      supervision: "35",
    })
    setReviewThreshold("10000")
    addToast("info", "Financial Settings Reset", "Financial settings have been reset to default values.")
  }

  const resetMargins = (): void => {
    setMargins([
      { id: 1, category: "Equipment", default: "55", minimum: "30" },
      { id: 2, category: "Labor", default: "55", minimum: "30" },
      { id: 3, category: "Hard Material", default: "55", minimum: "30" },
      { id: 4, category: "Plant Material", default: "55", minimum: "30" },
      { id: 5, category: "Other Job Costs", default: "55", minimum: "30" },
      { id: 6, category: "Overall", default: "55", minimum: "45" },
    ])
    addToast("info", "Margins Reset", "Margin percentages have been reset to default values.")
  }

  const resetPersonnel = (): void => {
    setPersonnel([
      {
        id: 1,
        salesPerson: "Test 1",
        opsManager: "Ops Manager 1",
        estimator: "Estimator 1",
      },
      {
        id: 2,
        salesPerson: "Test 2",
        opsManager: "Ops Manager 2",
        estimator: "Estimator 2",
      },
      {
        id: 3,
        salesPerson: "Test 3",
        opsManager: "Ops Manager 3",
        estimator: "Estimator 3",
      },
      {
        id: 4,
        salesPerson: "Test 4",
        opsManager: "Ops Manager 4",
        estimator: "Estimator 4",
      },
      {
        id: 5,
        salesPerson: "Test 5",
        opsManager: "Ops Manager 5",
        estimator: "Estimator 5",
      },
      {
        id: 6,
        salesPerson: "Test 6",
        opsManager: "Ops Manager 6",
        estimator: "Estimator 6",
      },
      {
        id: 7,
        salesPerson: "Test 7",
        opsManager: "Ops Manager 7",
        estimator: "Estimator 7",
      },
    ])
    addToast("info", "Personnel Reset", "Personnel directory has been reset to default values.")
  }

  const resetSubcontractorMarkup = (): void => {
    setSubcontractorMarkup({
      default: { markup: "30", grossMargin: "" },
      minimum: { markup: "20", grossMargin: "" },
    })
    addToast("info", "Subcontractor Markup Reset", "Subcontractor markup has been reset to default values.")
  }

  // Save functions
  const saveCompanyInfo = (): void => {
    addToast("success", "Company Info Saved", "Company information has been successfully saved.")
  }

  const saveFinancialSettings = (): void => {
    addToast("success", "Financial Settings Saved", "Financial settings have been successfully saved.")
  }

  const saveMarginsData = (): void => {
    addToast("success", "Margins Saved", "Margin percentages have been successfully saved.")
  }

  const savePersonnelData = (): void => {
    addToast("success", "Personnel Saved", "Personnel directory has been successfully saved.")
  }

  const saveSubcontractorMarkupData = (): void => {
    addToast("success", "Subcontractor Markup Saved", "Subcontractor markup has been successfully saved.")
  }

  // Check for changes functions
  const hasPersonnelChanges = editingPersonnel
    ? personnelForm.salesPerson !== editingPersonnel.salesPerson ||
      personnelForm.opsManager !== editingPersonnel.opsManager ||
      personnelForm.estimator !== editingPersonnel.estimator
    : personnelForm.salesPerson.trim() !== "" &&
      personnelForm.opsManager.trim() !== "" &&
      personnelForm.estimator.trim() !== ""

  const hasMarginChanges = editingMargin
    ? marginForm.category !== editingMargin.category ||
      marginForm.default !== editingMargin.default ||
      marginForm.minimum !== editingMargin.minimum
    : marginForm.category.trim() !== "" && marginForm.default.trim() !== "" && marginForm.minimum.trim() !== ""

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <SiteHeader name="Company Setup" />

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Business Configuration
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">Configure your business settings and preferences</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 space-y-12 sm:space-y-16 lg:space-y-20">
        {/* Company Information Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Company Information</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant="light"
                onPress={resetCompanyInfo}
                startContent={<RotateCcw className="w-4 h-4" />}
                className="text-slate-700 hover:bg-slate-100 w-full sm:w-auto"
              >
                Reset
              </Button>
              <Button
                color="primary"
                onPress={saveCompanyInfo}
                startContent={<Save className="w-4 h-4" />}
                isDisabled={!hasCompanyInfoChanges().hasChanges || !hasCompanyInfoChanges().hasContent}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-300 disabled:text-slate-500 w-full sm:w-auto"
              >
                {!hasCompanyInfoChanges().hasContent ? "Fill fields" : "Save"}
              </Button>
            </div>
          </div>

          <Card className="bg-white shadow-lg border border-slate-200">
            <CardBody className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-4 sm:space-y-6">
                  <Input
                    label="Company Name"
                    value={companyInfo.name}
                    onValueChange={(value) => setCompanyInfo({ ...companyInfo, name: value })}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-base bg-white",
                      inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                    }}
                  />
                  <Input
                    label="Street Address"
                    value={companyInfo.streetAddress}
                    onValueChange={(value) => setCompanyInfo({ ...companyInfo, streetAddress: value })}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-base bg-white",
                      inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                    }}
                  />
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      value={companyInfo.city}
                      onValueChange={(value) => setCompanyInfo({ ...companyInfo, city: value })}
                      variant="bordered"
                      size="lg"
                      classNames={{
                        input: "text-base bg-white",
                        inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                      }}
                    />
                    <Input
                      label="State"
                      value={companyInfo.state}
                      onValueChange={(value) => setCompanyInfo({ ...companyInfo, state: value })}
                      variant="bordered"
                      size="lg"
                      classNames={{
                        input: "text-base bg-white",
                        inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                      }}
                    />
                  </div>
                  <Input
                    label="ZIP Code"
                    value={companyInfo.zip}
                    onValueChange={(value) => setCompanyInfo({ ...companyInfo, zip: value })}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-base bg-white",
                      inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                    }}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Financial Settings Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center">
              <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Financial Settings</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant="light"
                onPress={resetFinancialSettings}
                startContent={<RotateCcw className="w-4 h-4" />}
                className="text-slate-700 hover:bg-slate-100 w-full sm:w-auto"
              >
                Reset
              </Button>
              <Button
                color="primary"
                onPress={saveFinancialSettings}
                startContent={<Save className="w-4 h-4" />}
                isDisabled={!hasFinancialChanges().hasChanges || !hasFinancialChanges().hasContent}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-300 disabled:text-slate-500 w-full sm:w-auto"
              >
                {!hasFinancialChanges().hasContent ? "Fill fields" : "Save"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Sales Tax Rate */}
            <Card className="bg-white shadow-lg border border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Percent className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">Sales Tax</h3>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Input
                  label="Rate (%)"
                  type="number"
                  step="0.1"
                  value={salesTaxRate}
                  onValueChange={setSalesTaxRate}
                  variant="bordered"
                  size="lg"
                  classNames={{
                    input: "text-base bg-white",
                    inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                  }}
                />
              </CardBody>
            </Card>

            {/* Labor Burden */}
            <Card className="bg-white shadow-lg border border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">Labor Burden</h3>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Input
                  label="Rate (%)"
                  type="number"
                  step="0.1"
                  value={laborBurdenRate}
                  onValueChange={setLaborBurdenRate}
                  variant="bordered"
                  size="lg"
                  classNames={{
                    input: "text-base bg-white",
                    inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                  }}
                />
              </CardBody>
            </Card>

            {/* Laborers Rate */}
            <Card className="bg-white shadow-lg border border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">Laborers</h3>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Input
                  label="Rate ($/hour)"
                  type="number"
                  value={laborRates.laborers}
                  onValueChange={(value) => setLaborRates({ ...laborRates, laborers: value })}
                  variant="bordered"
                  size="lg"
                  classNames={{
                    input: "text-base bg-white",
                    inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                  }}
                />
              </CardBody>
            </Card>

            {/* Supervision Rate */}
            <Card className="bg-white shadow-lg border border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">Supervision</h3>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Input
                  label="Rate ($/hour)"
                  type="number"
                  value={laborRates.supervision}
                  onValueChange={(value) => setLaborRates({ ...laborRates, supervision: value })}
                  variant="bordered"
                  size="lg"
                  classNames={{
                    input: "text-base bg-white",
                    inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                  }}
                />
              </CardBody>
            </Card>
          </div>

          {/* Review Threshold */}
          <Card className="bg-white shadow-lg border border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">Manager Review Threshold</h3>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="max-w-md">
                <Input
                  label="Estimates requiring manager approval"
                  type="number"
                  value={reviewThreshold}
                  onValueChange={setReviewThreshold}
                  variant="bordered"
                  size="lg"
                  startContent={<span className="text-slate-500">$</span>}
                  classNames={{
                    input: "text-base bg-white",
                    inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Margin Percentages Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Margin Percentages</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant="light"
                onPress={resetMargins}
                startContent={<RotateCcw className="w-4 h-4" />}
                className="text-slate-700 hover:bg-slate-100 w-full sm:w-auto"
              >
                Reset
              </Button>
              <Button
                color="success"
                onPress={() => openMarginModal()}
                startContent={<Plus className="w-4 h-4" />}
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
              >
                Add Margin
              </Button>
              <Button
                color="primary"
                onPress={saveMarginsData}
                startContent={<Save className="w-4 h-4" />}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
              >
                Save
              </Button>
            </div>
          </div>

          <Card className="bg-white shadow-lg border border-slate-200">
            <CardBody className="p-4 sm:p-6 lg:p-8">
              <div className="overflow-x-auto">
                <Table
                  aria-label="Margin percentages table"
                  classNames={{
                    wrapper: "bg-white rounded-xl border border-slate-200",
                    th: "bg-slate-50 text-slate-700 font-semibold",
                    td: "text-slate-700",
                  }}
                >
                  <TableHeader>
                    <TableColumn>CATEGORY</TableColumn>
                    <TableColumn className="text-center">DEFAULT (%)</TableColumn>
                    <TableColumn className="text-center">MINIMUM (%)</TableColumn>
                    <TableColumn className="text-center">ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {margins.map((margin) => (
                      <TableRow key={margin.id}>
                        <TableCell className="font-medium">{margin.category}</TableCell>
                        <TableCell className="text-center">{margin.default}%</TableCell>
                        <TableCell className="text-center">{margin.minimum}%</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={() => openMarginModal(margin)}
                              className="text-blue-600 hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={() => handleDeleteConfirmation("margin", margin.id, margin.category)}
                              className="text-rose-600 hover:bg-rose-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Subcontractor Markup Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Subcontractor Markup</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant="light"
                onPress={resetSubcontractorMarkup}
                startContent={<RotateCcw className="w-4 h-4" />}
                className="text-slate-700 hover:bg-slate-100 w-full sm:w-auto"
              >
                Reset
              </Button>
              <Button
                color="primary"
                onPress={saveSubcontractorMarkupData}
                startContent={<Save className="w-4 h-4" />}
                isDisabled={!hasSubcontractorChanges().hasChanges || !hasSubcontractorChanges().hasContent}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-300 disabled:text-slate-500 w-full sm:w-auto"
              >
                {!hasSubcontractorChanges().hasContent ? "Fill fields" : "Save"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <Card className="bg-white shadow-lg border border-slate-200">
              <CardHeader className="pb-4">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">Default Settings</h3>
              </CardHeader>
              <CardBody className="pt-0 space-y-4 sm:space-y-6">
                <Input
                  label="Markup (%)"
                  type="number"
                  value={subcontractorMarkup.default.markup}
                  onValueChange={(value) =>
                    setSubcontractorMarkup({
                      ...subcontractorMarkup,
                      default: {
                        ...subcontractorMarkup.default,
                        markup: value,
                      },
                    })
                  }
                  variant="bordered"
                  size="lg"
                  classNames={{
                    input: "text-base bg-white",
                    inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                  }}
                />
                <Input
                  label="Gross Margin"
                  value={subcontractorMarkup.default.grossMargin}
                  onValueChange={(value) =>
                    setSubcontractorMarkup({
                      ...subcontractorMarkup,
                      default: {
                        ...subcontractorMarkup.default,
                        grossMargin: value,
                      },
                    })
                  }
                  variant="bordered"
                  size="lg"
                  classNames={{
                    input: "text-base bg-white",
                    inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                  }}
                />
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg border border-slate-200">
              <CardHeader className="pb-4">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">Minimum Settings</h3>
              </CardHeader>
              <CardBody className="pt-0 space-y-4 sm:space-y-6">
                <Input
                  label="Markup (%)"
                  type="number"
                  value={subcontractorMarkup.minimum.markup}
                  onValueChange={(value) =>
                    setSubcontractorMarkup({
                      ...subcontractorMarkup,
                      minimum: {
                        ...subcontractorMarkup.minimum,
                        markup: value,
                      },
                    })
                  }
                  variant="bordered"
                  size="lg"
                  classNames={{
                    input: "text-base bg-white",
                    inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                  }}
                />
                <Input
                  label="Gross Margin"
                  value={subcontractorMarkup.minimum.grossMargin}
                  onValueChange={(value) =>
                    setSubcontractorMarkup({
                      ...subcontractorMarkup,
                      minimum: {
                        ...subcontractorMarkup.minimum,
                        grossMargin: value,
                      },
                    })
                  }
                  variant="bordered"
                  size="lg"
                  classNames={{
                    input: "text-base bg-white",
                    inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                  }}
                />
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Personal Directory Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Personal Directory</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant="light"
                onPress={resetPersonnel}
                startContent={<RotateCcw className="w-4 h-4" />}
                className="text-slate-700 hover:bg-slate-100 w-full sm:w-auto"
              >
                Reset
              </Button>
              <Button
                color="success"
                onPress={() => openPersonnelModal()}
                startContent={<Plus className="w-4 h-4" />}
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
              >
                Add Person
              </Button>
              <Button
                color="primary"
                onPress={savePersonnelData}
                startContent={<Save className="w-4 h-4" />}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
              >
                Save
              </Button>
            </div>
          </div>

          <Card className="bg-white shadow-lg border border-slate-200">
            <CardBody className="p-4 sm:p-6 lg:p-8">
              {/* Mobile Card Layout */}
              <div className="block sm:hidden space-y-4">
                {personnel.map((person) => (
                  <Card key={person.id} className="bg-white border border-slate-200">
                    <CardBody className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-slate-800 text-lg">{person.salesPerson}</h3>
                        <div className="flex gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-blue-600 hover:bg-blue-50"
                            onPress={() => openPersonnelModal(person)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-rose-600 hover:bg-rose-50"
                            onPress={() => handleDeleteConfirmation("personnel", person.id, person.salesPerson)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-slate-500 font-medium">Ops Manager:</span>
                          <p className="text-slate-700 mt-1">{person.opsManager}</p>
                        </div>
                        <div>
                          <span className="text-slate-500 font-medium">Estimator:</span>
                          <p className="text-slate-700 mt-1">{person.estimator}</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
                {personnel.length === 0 && <div className="text-center py-8 text-slate-500">No personnel found.</div>}
              </div>

              {/* Desktop Table Layout */}
              <div className="hidden sm:block overflow-x-auto">
                <Table
                  aria-label="Personnel directory table"
                  classNames={{
                    wrapper: "bg-white rounded-xl border border-slate-200",
                    th: "bg-slate-50 text-slate-700 font-semibold",
                    td: "text-slate-700",
                  }}
                >
                  <TableHeader>
                    <TableColumn>SALES PERSON</TableColumn>
                    <TableColumn>OPS MANAGER</TableColumn>
                    <TableColumn>ESTIMATOR NAME</TableColumn>
                    <TableColumn className="text-center">ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {personnel.map((person) => (
                      <TableRow key={person.id}>
                        <TableCell className="font-medium">{person.salesPerson}</TableCell>
                        <TableCell>{person.opsManager}</TableCell>
                        <TableCell>{person.estimator}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={() => openPersonnelModal(person)}
                              className="text-blue-600 hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onPress={() => handleDeleteConfirmation("personnel", person.id, person.salesPerson)}
                              className="text-rose-600 hover:bg-rose-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        size="md"
        classNames={{
          backdrop: "bg-slate-900/50 backdrop-blur-sm",
          base: "bg-white border border-slate-200 mx-4",
          header: "border-b border-slate-200",
          footer: "border-t border-slate-200",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 rounded-full">
              <AlertCircle className="w-5 h-5 text-rose-600" />
            </div>
            <span className="text-slate-800">Confirm Deletion</span>
          </ModalHeader>
          <ModalBody className="py-6">
            <p className="text-slate-600">
              Are you sure you want to delete <span className="font-semibold text-slate-800">"{deleteItem?.name}"</span>
              ? This action cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="light"
              onPress={onDeleteModalClose}
              className="text-slate-600 hover:bg-slate-100 w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleConfirmDelete}
              className="bg-rose-600 hover:bg-rose-700 text-white w-full sm:w-auto"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Personnel Modal */}
      <Modal
        isOpen={isPersonnelModalOpen}
        onClose={onPersonnelModalClose}
        size="lg"
        classNames={{
          backdrop: "bg-slate-900/50 backdrop-blur-sm",
          base: "bg-white border border-slate-200 mx-4",
          header: "border-b border-slate-200",
          footer: "border-t border-slate-200",
        }}
      >
        <ModalContent>
          <ModalHeader className="text-slate-800">
            {editingPersonnel ? "Edit Personnel" : "Add New Personnel"}
          </ModalHeader>
          <ModalBody className="py-6">
            <div className="space-y-4">
              <Input
                label="Sales Person"
                value={personnelForm.salesPerson}
                onValueChange={(value) => setPersonnelForm({ ...personnelForm, salesPerson: value })}
                variant="bordered"
                size="lg"
                classNames={{
                  input: "text-base bg-white",
                  inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                }}
              />
              <Input
                label="Operations Manager"
                value={personnelForm.opsManager}
                onValueChange={(value) => setPersonnelForm({ ...personnelForm, opsManager: value })}
                variant="bordered"
                size="lg"
                classNames={{
                  input: "text-base bg-white",
                  inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                }}
              />
              <Input
                label="Estimator"
                value={personnelForm.estimator}
                onValueChange={(value) => setPersonnelForm({ ...personnelForm, estimator: value })}
                variant="bordered"
                size="lg"
                classNames={{
                  input: "text-base bg-white",
                  inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="light"
              onPress={onPersonnelModalClose}
              className="text-slate-600 hover:bg-slate-100 w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={savePersonnel}
              isDisabled={!hasPersonnelChanges}
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-300 disabled:text-slate-500 w-full sm:w-auto"
            >
              {editingPersonnel ? "Update" : "Add"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Margin Modal */}
      <Modal
        isOpen={isMarginModalOpen}
        onClose={onMarginModalClose}
        size="lg"
        classNames={{
          backdrop: "bg-slate-900/50 backdrop-blur-sm",
          base: "bg-white border border-slate-200 mx-4",
          header: "border-b border-slate-200",
          footer: "border-t border-slate-200",
        }}
      >
        <ModalContent>
          <ModalHeader className="text-slate-800">{editingMargin ? "Edit Margin" : "Add New Margin"}</ModalHeader>
          <ModalBody className="py-6">
            <div className="space-y-4">
              <Input
                label="Category Name"
                value={marginForm.category}
                onValueChange={(value) => setMarginForm({ ...marginForm, category: value })}
                variant="bordered"
                size="lg"
                classNames={{
                  input: "text-base bg-white",
                  inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                }}
              />
              <Input
                label="Default Percentage"
                type="number"
                value={marginForm.default}
                onValueChange={(value) => setMarginForm({ ...marginForm, default: value })}
                variant="bordered"
                size="lg"
                endContent={<span className="text-slate-500">%</span>}
                classNames={{
                  input: "text-base bg-white",
                  inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                }}
              />
              <Input
                label="Minimum Percentage"
                type="number"
                value={marginForm.minimum}
                onValueChange={(value) => setMarginForm({ ...marginForm, minimum: value })}
                variant="bordered"
                size="lg"
                endContent={<span className="text-slate-500">%</span>}
                classNames={{
                  input: "text-base bg-white",
                  inputWrapper: "bg-white border-slate-200 hover:border-blue-300 focus-within:border-blue-500",
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="light"
              onPress={onMarginModalClose}
              className="text-slate-600 hover:bg-slate-100 w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={saveMargin}
              isDisabled={!hasMarginChanges}
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-300 disabled:text-slate-500 w-full sm:w-auto"
            >
              {editingMargin ? "Update" : "Add"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
