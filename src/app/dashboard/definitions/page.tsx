"use client";

import { useState } from "react";
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
} from "@heroui/react";
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
  Settings,
  RotateCcw,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { SiteHeader } from "@/components/sidebar/site-header";

// Type definitions
interface CompanyInfo {
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

interface LaborRates {
  laborers: string;
  supervision: string;
}

interface Margin {
  id: number;
  category: string;
  default: string;
  minimum: string;
}

interface Personnel {
  id: number;
  salesPerson: string;
  opsManager: string;
  estimator: string;
}

interface SubcontractorMarkupItem {
  markup: string;
  grossMargin: string;
}

interface SubcontractorMarkup {
  default: SubcontractorMarkupItem;
  minimum: SubcontractorMarkupItem;
}

interface PersonnelForm {
  salesPerson: string;
  opsManager: string;
  estimator: string;
}

interface MarginForm {
  category: string;
  default: string;
  minimum: string;
}

export default function BusinessConfiguration() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
  });

  const [salesTaxRate, setSalesTaxRate] = useState<string>("6");
  const [laborBurdenRate, setLaborBurdenRate] = useState<string>("15");

  const [laborRates, setLaborRates] = useState<LaborRates>({
    laborers: "25",
    supervision: "35",
  });

  const [margins, setMargins] = useState<Margin[]>([
    { id: 1, category: "Equipment", default: "55", minimum: "30" },
    { id: 2, category: "Labor", default: "55", minimum: "30" },
    { id: 3, category: "Hard Material", default: "55", minimum: "30" },
    { id: 4, category: "Plant Material", default: "55", minimum: "30" },
    { id: 5, category: "Other Job Costs", default: "55", minimum: "30" },
    { id: 6, category: "Overall", default: "55", minimum: "45" },
  ]);

  const [subcontractorMarkup, setSubcontractorMarkup] = useState<SubcontractorMarkup>({
    default: { markup: "30", grossMargin: "" },
    minimum: { markup: "20", grossMargin: "" },
  });

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
  ]);

  const [reviewThreshold, setReviewThreshold] = useState<string>("10000");

  // Modal states
  const { 
    isOpen: isPersonnelModalOpen, 
    onOpen: onPersonnelModalOpen, 
    onOpenChange: onPersonnelModalChange 
  } = useDisclosure();
  
  const { 
    isOpen: isMarginModalOpen, 
    onOpen: onMarginModalOpen, 
    onOpenChange: onMarginModalChange 
  } = useDisclosure();
  
  const [editingPersonnel, setEditingPersonnel] = useState<Personnel | null>(null);
  const [editingMargin, setEditingMargin] = useState<Margin | null>(null);
  
  const [personnelForm, setPersonnelForm] = useState<PersonnelForm>({
    salesPerson: "",
    opsManager: "",
    estimator: "",
  });
  
  const [marginForm, setMarginForm] = useState<MarginForm>({
    category: "",
    default: "",
    minimum: "",
  });

  // Personnel CRUD functions
  const openPersonnelModal = (person: Personnel | null = null): void => {
    if (person) {
      setEditingPersonnel(person);
      setPersonnelForm({
        salesPerson: person.salesPerson,
        opsManager: person.opsManager,
        estimator: person.estimator,
      });
    } else {
      setEditingPersonnel(null);
      setPersonnelForm({
        salesPerson: "",
        opsManager: "",
        estimator: "",
      });
    }
    onPersonnelModalOpen();
  };

  const savePersonnel = (): void => {
    if (editingPersonnel) {
      // Update existing personnel
      setPersonnel(personnel.map(p => 
        p.id === editingPersonnel.id 
          ? { ...p, ...personnelForm }
          : p
      ));
    } else {
      // Add new personnel
      const newId = Math.max(...personnel.map(p => p.id), 0) + 1;
      setPersonnel([...personnel, { id: newId, ...personnelForm }]);
    }
    onPersonnelModalChange();
  };

  const deletePersonnel = (id: number): void => {
    setPersonnel(personnel.filter(p => p.id !== id));
  };

  // Margin CRUD functions
  const openMarginModal = (margin: Margin | null = null): void => {
    if (margin) {
      setEditingMargin(margin);
      setMarginForm({
        category: margin.category,
        default: margin.default,
        minimum: margin.minimum,
      });
    } else {
      setEditingMargin(null);
      setMarginForm({
        category: "",
        default: "",
        minimum: "",
      });
    }
    onMarginModalOpen();
  };

  const saveMargin = (): void => {
    if (editingMargin) {
      // Update existing margin
      setMargins(margins.map(m => 
        m.id === editingMargin.id 
          ? { ...m, ...marginForm }
          : m
      ));
    } else {
      // Add new margin
      const newId = Math.max(...margins.map(m => m.id), 0) + 1;
      setMargins([...margins, { id: newId, ...marginForm }]);
    }
    onMarginModalChange();
  };

  const deleteMargin = (id: number): void => {
    setMargins(margins.filter(m => m.id !== id));
  };

  // Reset functions for each section
  const resetCompanyInfo = (): void => {
    setCompanyInfo({
      name: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
    });
  };

  const resetFinancialSettings = (): void => {
    setSalesTaxRate("6");
    setLaborBurdenRate("15");
    setLaborRates({
      laborers: "25",
      supervision: "35",
    });
    setReviewThreshold("10000");
  };

  const resetMargins = (): void => {
    setMargins([
      { id: 1, category: "Equipment", default: "55", minimum: "30" },
      { id: 2, category: "Labor", default: "55", minimum: "30" },
      { id: 3, category: "Hard Material", default: "55", minimum: "30" },
      { id: 4, category: "Plant Material", default: "55", minimum: "30" },
      { id: 5, category: "Other Job Costs", default: "55", minimum: "30" },
      { id: 6, category: "Overall", default: "55", minimum: "45" },
    ]);
  };

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
    ]);
  };

  const resetSubcontractorMarkup = (): void => {
    setSubcontractorMarkup({
      default: { markup: "30", grossMargin: "" },
      minimum: { markup: "20", grossMargin: "" },
    });
  };

  // Save functions
  const saveCompanyInfo = (): void => {
    console.log("Saving company info:", companyInfo);
  };

  const saveFinancialSettings = (): void => {
    console.log("Saving financial settings:", {
      salesTaxRate,
      laborBurdenRate,
      laborRates,
      reviewThreshold,
    });
  };

  const saveMarginsData = (): void => {
    console.log("Saving margins:", margins);
  };

  const savePersonnelData = (): void => {
    console.log("Saving personnel:", personnel);
  };

  const saveSubcontractorMarkupData = (): void => {
    console.log("Saving subcontractor markup:", subcontractorMarkup);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
        <SiteHeader name="Definitions" />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
         {/* Company Information Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Building2 className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-zinc-900">
                Company Information
              </h2>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="bordered"
                onPress={resetCompanyInfo}
                startContent={<RotateCcw className="w-4 h-4" />}
                className="border-zinc-300 text-zinc-700"
              >
                Reset
              </Button>
              <Button
                color="primary"
                onPress={saveCompanyInfo}
                startContent={<Save className="w-4 h-4" />}
                className="bg-blue-600 text-white"
              >
                Save
              </Button>
            </div>
          </div>

          <Card className="shadow-sm">
            <CardBody className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Input
                    label="Company Name"
                    value={companyInfo.name}
                    onValueChange={(value) =>
                      setCompanyInfo({ ...companyInfo, name: value })
                    }
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper:
                        "border-zinc-300 focus-within:border-blue-600",
                    }}
                  />
                  <Input
                    label="Street Address"
                    value={companyInfo.streetAddress}
                    onValueChange={(value) =>
                      setCompanyInfo({ ...companyInfo, streetAddress: value })
                    }
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper:
                        "border-zinc-300 focus-within:border-blue-600",
                    }}
                  />
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      value={companyInfo.city}
                      onValueChange={(value) =>
                        setCompanyInfo({ ...companyInfo, city: value })
                      }
                      variant="bordered"
                      size="lg"
                      classNames={{
                        input: "text-base",
                        inputWrapper:
                          "border-zinc-300 focus-within:border-blue-600",
                      }}
                    />
                    <Input
                      label="State"
                      value={companyInfo.state}
                      onValueChange={(value) =>
                        setCompanyInfo({ ...companyInfo, state: value })
                      }
                      variant="bordered"
                      size="lg"
                      classNames={{
                        input: "text-base",
                        inputWrapper:
                          "border-zinc-300 focus-within:border-blue-600",
                      }}
                    />
                  </div>
                  <Input
                    label="ZIP Code"
                    value={companyInfo.zip}
                    onValueChange={(value) =>
                      setCompanyInfo({ ...companyInfo, zip: value })
                    }
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper:
                        "border-zinc-300 focus-within:border-blue-600",
                    }}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Financial Settings Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Calculator className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-zinc-900">
                Financial Settings
              </h2>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="bordered"
                onPress={resetFinancialSettings}
                startContent={<RotateCcw className="w-4 h-4" />}
                className="border-zinc-300 text-zinc-700"
              >
                Reset
              </Button>
              <Button
                color="primary"
                onPress={saveFinancialSettings}
                startContent={<Save className="w-4 h-4" />}
                className="bg-blue-600 text-white"
              >
                Save
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Sales Tax Rate */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Percent className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Sales Tax
                  </h3>
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
                    input: "text-base",
                    inputWrapper:
                      "border-zinc-300 focus-within:border-blue-600",
                  }}
                />
              </CardBody>
            </Card>

            {/* Labor Burden */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Labor Burden
                  </h3>
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
                    input: "text-base",
                    inputWrapper:
                      "border-zinc-300 focus-within:border-blue-600",
                  }}
                />
              </CardBody>
            </Card>

            {/* Laborers Rate */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Laborers
                  </h3>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Input
                  label="Rate ($/hour)"
                  type="number"
                  value={laborRates.laborers}
                  onValueChange={(value) =>
                    setLaborRates({ ...laborRates, laborers: value })
                  }
                  variant="bordered"
                  size="lg"
                  classNames={{
                    input: "text-base",
                    inputWrapper:
                      "border-zinc-300 focus-within:border-blue-600",
                  }}
                />
              </CardBody>
            </Card>

            {/* Supervision Rate */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Supervision
                  </h3>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Input
                  label="Rate ($/hour)"
                  type="number"
                  value={laborRates.supervision}
                  onValueChange={(value) =>
                    setLaborRates({ ...laborRates, supervision: value })
                  }
                  variant="bordered"
                  size="lg"
                  classNames={{
                    input: "text-base",
                    inputWrapper:
                      "border-zinc-300 focus-within:border-blue-600",
                  }}
                />
              </CardBody>
            </Card>
          </div>

          {/* Review Threshold */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-zinc-900">
                  Manager Review Threshold
                </h3>
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
                  startContent={<span className="text-zinc-500">$</span>}
                  classNames={{
                    input: "text-base",
                    inputWrapper:
                      "border-zinc-300 focus-within:border-blue-600",
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Margin Percentages Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Target className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-zinc-900">
                Margin Percentages
              </h2>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="bordered"
                onPress={resetMargins}
                startContent={<RotateCcw className="w-4 h-4" />}
                className="border-zinc-300 text-zinc-700"
              >
                Reset
              </Button>
              <Button
                color="success"
                onPress={() => openMarginModal()}
                startContent={<Plus className="w-4 h-4" />}
                className="bg-green-600 text-white"
              >
                Add Margin
              </Button>
              <Button
                color="primary"
                onPress={saveMarginsData}
                startContent={<Save className="w-4 h-4" />}
                className="bg-blue-600 text-white"
              >
                Save
              </Button>
            </div>
          </div>

          <Card className="shadow-sm">
            <CardBody className="p-8">
              <Table
                aria-label="Margin percentages table"
                className="min-w-full"
              >
                <TableHeader>
                  <TableColumn className="text-zinc-900 font-semibold text-base py-4">
                    CATEGORY
                  </TableColumn>
                  <TableColumn className="text-zinc-900 font-semibold text-base py-4 text-center">
                    DEFAULT (%)
                  </TableColumn>
                  <TableColumn className="text-zinc-900 font-semibold text-base py-4 text-center">
                    MINIMUM (%)
                  </TableColumn>
                  <TableColumn className="text-zinc-900 font-semibold text-base py-4 text-center">
                    ACTIONS
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {margins.map((margin) => (
                    <TableRow key={margin.id}>
                      <TableCell className="font-medium text-zinc-900 py-6 text-base">
                        {margin.category}
                      </TableCell>
                      <TableCell className="text-center py-6 text-base">
                        {margin.default}%
                      </TableCell>
                      <TableCell className="text-center py-6 text-base">
                        {margin.minimum}%
                      </TableCell>
                      <TableCell className="text-center py-6">
                        <div className="flex justify-center space-x-2">
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
                            onPress={() => deleteMargin(margin.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </section>

        {/* Subcontractor Markup Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Briefcase className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-zinc-900">
                Subcontractor Markup
              </h2>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="bordered"
                onPress={resetSubcontractorMarkup}
                startContent={<RotateCcw className="w-4 h-4" />}
                className="border-zinc-300 text-zinc-700"
              >
                Reset
              </Button>
              <Button
                color="primary"
                onPress={saveSubcontractorMarkupData}
                startContent={<Save className="w-4 h-4" />}
                className="bg-blue-600 text-white"
              >
                Save
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Default Settings
                </h3>
              </CardHeader>
              <CardBody className="pt-0 space-y-6">
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
                    input: "text-base",
                    inputWrapper:
                      "border-zinc-300 focus-within:border-blue-600",
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
                    input: "text-base",
                    inputWrapper:
                      "border-zinc-300 focus-within:border-blue-600",
                  }}
                />
              </CardBody>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Minimum Settings
                </h3>
              </CardHeader>
              <CardBody className="pt-0 space-y-6">
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
                    input: "text-base",
                    inputWrapper:
                      "border-zinc-300 focus-within:border-blue-600",
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
                    input: "text-base",
                    inputWrapper:
                      "border-zinc-300 focus-within:border-blue-600",
                  }}
                />
              </CardBody>
            </Card>
          </div>
        </section>
        
        {/* Personal Directory Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-zinc-900">
                Personal Directory
              </h2>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="bordered"
                onPress={resetPersonnel}
                startContent={<RotateCcw className="w-4 h-4" />}
                className="border-zinc-300 text-zinc-700"
              >
                Reset
              </Button>
              <Button
                color="success"
                onPress={() => openPersonnelModal()}
                startContent={<Plus className="w-4 h-4" />}
                className="bg-green-600 text-white"
              >
                Add Person
              </Button>
              <Button
                color="primary"
                onPress={savePersonnelData}
                startContent={<Save className="w-4 h-4" />}
                className="bg-blue-600 text-white"
              >
                Save
              </Button>
            </div>
          </div>

          <Card className="shadow-sm">
            <CardBody className="p-8">
              <Table
                aria-label="Personnel directory table"
                className="min-w-full"
              >
                <TableHeader>
                  <TableColumn className="text-zinc-900 font-semibold text-base py-4">
                    SALES PERSON
                  </TableColumn>
                  <TableColumn className="text-zinc-900 font-semibold text-base py-4">
                    OPS MANAGER
                  </TableColumn>
                  <TableColumn className="text-zinc-900 font-semibold text-base py-4">
                    ESTIMATOR NAME
                  </TableColumn>
                  <TableColumn className="text-zinc-900 font-semibold text-base py-4 text-center">
                    ACTIONS
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {personnel.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-medium text-zinc-900 py-4 text-base">
                        {person.salesPerson}
                      </TableCell>
                      <TableCell className="text-zinc-700 py-4 text-base">
                        {person.opsManager}
                      </TableCell>
                      <TableCell className="text-zinc-700 py-4 text-base">
                        {person.estimator}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <div className="flex justify-center space-x-2">
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
                            onPress={() => deletePersonnel(person.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </section>
      </main>

      {/* Personnel Modal */}
      <Modal 
        isOpen={isPersonnelModalOpen} 
        onOpenChange={onPersonnelModalChange}
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editingPersonnel ? "Edit Personnel" : "Add New Personnel"}
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Sales Person"
                    value={personnelForm.salesPerson}
                    onValueChange={(value) =>
                      setPersonnelForm({ ...personnelForm, salesPerson: value })
                    }
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper: "border-zinc-300 focus-within:border-blue-600",
                    }}
                  />
                  <Input
                    label="Operations Manager"
                    value={personnelForm.opsManager}
                    onValueChange={(value) =>
                      setPersonnelForm({ ...personnelForm, opsManager: value })
                    }
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper: "border-zinc-300 focus-within:border-blue-600",
                    }}
                  />
                  <Input
                    label="Estimator"
                    value={personnelForm.estimator}
                    onValueChange={(value) =>
                      setPersonnelForm({ ...personnelForm, estimator: value })
                    }
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper: "border-zinc-300 focus-within:border-blue-600",
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={savePersonnel}
                  className="bg-blue-600 text-white"
                >
                  {editingPersonnel ? "Update" : "Add"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Margin Modal */}
      <Modal 
        isOpen={isMarginModalOpen} 
        onOpenChange={onMarginModalChange}
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {editingMargin ? "Edit Margin" : "Add New Margin"}
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Category Name"
                    value={marginForm.category}
                    onValueChange={(value) =>
                      setMarginForm({ ...marginForm, category: value })
                    }
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper: "border-zinc-300 focus-within:border-blue-600",
                    }}
                  />
                  <Input
                    label="Default Percentage"
                    type="number"
                    value={marginForm.default}
                    onValueChange={(value) =>
                      setMarginForm({ ...marginForm, default: value })
                    }
                    variant="bordered"
                    size="lg"
                    endContent={<span className="text-zinc-500">%</span>}
                    classNames={{
                      input: "text-base",
                      inputWrapper: "border-zinc-300 focus-within:border-blue-600",
                    }}
                  />
                  <Input
                    label="Minimum Percentage"
                    type="number"
                    value={marginForm.minimum}
                    onValueChange={(value) =>
                      setMarginForm({ ...marginForm, minimum: value })
                    }
                    variant="bordered"
                    size="lg"
                    endContent={<span className="text-zinc-500">%</span>}
                    classNames={{
                      input: "text-base",
                      inputWrapper: "border-zinc-300 focus-within:border-blue-600",
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={saveMargin}
                  className="bg-blue-600 text-white"
                >
                  {editingMargin ? "Update" : "Add"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}