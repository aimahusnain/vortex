"use client"

import type React from "react"

import { useState } from "react"
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react"
import { SiteHeader } from "@/components/sidebar/site-header"

// Types
interface EstimateRow {
  id: string
  description: string
  quantity: number
  uom: string
  unitCost: number
  totalCost: number
  grossMargin: number
  totalPrice: number
  unitPrice: number
}

interface EstimateForm {
  salespersonName: string
  jobName: string
  customerName: string
  estimatorName: string
  poNumber: string
  city: string
  state: string
  zip: string
  address: string
  workType: string
}

const salespersonOptions = ["Test 1", "Test 2", "Test 3", "Test 4", "Test 5", "Test 6", "Test 7"]

const estimatorOptions = [
  "Estimator 1",
  "Estimator 2",
  "Estimator 3",
  "Estimator 4",
  "Estimator 5",
  "Estimator 6",
  "Estimator 7",
]

const workTypeOptions = [
  "Aeration work",
  "Bushhogging",
  "Debris Removal",
  "Demolition",
  "Design and installation",
  "Dormant Pruning work",
  "Drainage work",
  "Emergency repairs",
]

export default function LandscapingEstimator() {
  const [formData, setFormData] = useState<EstimateForm>({
    salespersonName: "",
    jobName: "",
    customerName: "",
    estimatorName: "",
    poNumber: "",
    city: "",
    state: "",
    zip: "",
    address: "",
    workType: "",
  })

  // Initialize empty rows for each tab
  const createEmptyRows = (): EstimateRow[] => {
    return Array.from({ length: 12 }, (_, index) => ({
      id: `row-${index + 1}`,
      description: "",
      quantity: 0,
      uom: "-",
      unitCost: 0,
      totalCost: 0,
      grossMargin: 0,
      totalPrice: 0,
      unitPrice: 0,
    }))
  }

  const [equipmentRows, setEquipmentRows] = useState<EstimateRow[]>(createEmptyRows())
  const [laborRows, setLaborRows] = useState<EstimateRow[]>(createEmptyRows())
  const [hardMaterialRows, setHardMaterialRows] = useState<EstimateRow[]>(createEmptyRows())
  const [plantMaterialRows, setPlantMaterialRows] = useState<EstimateRow[]>(createEmptyRows())
  const [otherJobCostsRows, setOtherJobCostsRows] = useState<EstimateRow[]>(createEmptyRows())
  const [subContractorRows, setSubContractorRows] = useState<EstimateRow[]>(createEmptyRows())

  const handleFormChange = (field: keyof EstimateForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const renderEstimateTable = (rows: EstimateRow[], setRows: React.Dispatch<React.SetStateAction<EstimateRow[]>>) => (
    <div className="overflow-x-auto">
      <Table
        aria-label="Estimate table"
        className="min-h-[400px]"
        classNames={{
          wrapper: "bg-white rounded-xl border border-zinc-200",
          th: "bg-zinc-50 text-zinc-700 font-semibold text-xs",
          td: "text-zinc-700 text-sm",
        }}
      >
        <TableHeader>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>QUANTITY</TableColumn>
          <TableColumn>UOM</TableColumn>
          <TableColumn>UNIT COST</TableColumn>
          <TableColumn>TOTAL COST</TableColumn>
          <TableColumn>GROSS MARGIN</TableColumn>
          <TableColumn>TOTAL PRICE</TableColumn>
          <TableColumn>UNIT PRICE</TableColumn>
        </TableHeader>
        <TableBody>
          {[
            ...rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.description || ""}</TableCell>
                <TableCell>{row.quantity || "-"}</TableCell>
                <TableCell>{row.uom}</TableCell>
                <TableCell>${row.unitCost.toFixed(2)}</TableCell>
                <TableCell>${row.totalCost.toFixed(2)}</TableCell>
                <TableCell>${row.grossMargin.toFixed(2)}</TableCell>
                <TableCell>${row.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{row.unitPrice > 0 ? `$${row.unitPrice.toFixed(2)}` : "-"}</TableCell>
              </TableRow>
            )),
            <TableRow key="total" className="border-t-2 border-zinc-300 bg-zinc-50">
              <TableCell className="font-semibold">Total</TableCell>
              <TableCell>.</TableCell>
              <TableCell>.</TableCell>
              <TableCell className="font-semibold">$0.00</TableCell>
              <TableCell>.</TableCell>
              <TableCell className="font-semibold">$0.00</TableCell>
              <TableCell className="font-semibold">$0.00</TableCell>
              <TableCell>.</TableCell>
            </TableRow>,
          ]}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader name="Estimator" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-transparent mb-2">
            Landscaping Management System
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-2">Estimator</h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            Create detailed cost estimates for landscaping projects with comprehensive pricing breakdowns and margin
            analysis
          </p>
        </div>

        {/* Estimate Form */}
        <Card className="mb-6 bg-white shadow-lg border border-zinc-200">
          <CardBody className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-zinc-800 mb-4">Project Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select
                label="Select Salesperson Name"
                placeholder="Choose salesperson"
                selectedKeys={formData.salespersonName ? [formData.salespersonName] : []}
                onSelectionChange={(keys) => handleFormChange("salespersonName", Array.from(keys)[0] as string)}
                classNames={{
                  trigger: "bg-white border-zinc-200 hover:border-blue-300 focus:border-blue-500",
                }}
              >
                {salespersonOptions.map((option) => (
                  <SelectItem key={option}>{option}</SelectItem>
                ))}
              </Select>

              <Input
                label="Enter Job Name"
                placeholder="Job name"
                value={formData.jobName}
                onChange={(e) => handleFormChange("jobName", e.target.value)}
                classNames={{
                  input: "bg-white",
                  inputWrapper: "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
                }}
              />

              <Input
                label="Enter Customer Name"
                placeholder="Customer name"
                value={formData.customerName}
                onChange={(e) => handleFormChange("customerName", e.target.value)}
                classNames={{
                  input: "bg-white",
                  inputWrapper: "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
                }}
              />

              <Select
                label="Estimator Name"
                placeholder="Choose estimator"
                selectedKeys={formData.estimatorName ? [formData.estimatorName] : []}
                onSelectionChange={(keys) => handleFormChange("estimatorName", Array.from(keys)[0] as string)}
                classNames={{
                  trigger: "bg-white border-zinc-200 hover:border-blue-300 focus:border-blue-500",
                }}
              >
                {estimatorOptions.map((option) => (
                  <SelectItem key={option}>{option}</SelectItem>
                ))}
              </Select>

              <Input
                label="PO Number"
                placeholder="Purchase order number"
                value={formData.poNumber}
                onChange={(e) => handleFormChange("poNumber", e.target.value)}
                classNames={{
                  input: "bg-white",
                  inputWrapper: "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
                }}
              />

              <Input
                label="City"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleFormChange("city", e.target.value)}
                classNames={{
                  input: "bg-white",
                  inputWrapper: "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
                }}
              />

              <Input
                label="State"
                placeholder="State"
                value={formData.state}
                onChange={(e) => handleFormChange("state", e.target.value)}
                classNames={{
                  input: "bg-white",
                  inputWrapper: "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
                }}
              />

              <Input
                label="Zip"
                placeholder="Zip code"
                value={formData.zip}
                onChange={(e) => handleFormChange("zip", e.target.value)}
                classNames={{
                  input: "bg-white",
                  inputWrapper: "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
                }}
              />

              <Input
                label="Address"
                placeholder="Street address"
                value={formData.address}
                onChange={(e) => handleFormChange("address", e.target.value)}
                classNames={{
                  input: "bg-white",
                  inputWrapper: "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
                }}
              />

              <Select
                label="Work Type"
                placeholder="Select work type"
                selectedKeys={formData.workType ? [formData.workType] : []}
                onSelectionChange={(keys) => handleFormChange("workType", Array.from(keys)[0] as string)}
                classNames={{
                  trigger: "bg-white border-zinc-200 hover:border-blue-300 focus:border-blue-500",
                }}
              >
                {workTypeOptions.map((option) => (
                  <SelectItem key={option}>{option}</SelectItem>
                ))}
              </Select>
            </div>
          </CardBody>
        </Card>

        {/* Estimate Tabs */}
        <Tabs
          aria-label="Estimate tabs"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-2 sm:gap-6 w-full relative rounded-none p-0 border-b border-zinc-200 overflow-x-auto",
            cursor: "w-full bg-blue-600",
            tab: "max-w-fit px-2 sm:px-0 h-12 whitespace-nowrap",
            tabContent: "group-data-[selected=true]:text-blue-600 font-medium text-sm sm:text-base",
          }}
        >
          <Tab key="equipment" title="Equipment">
            <Card className="mt-4 sm:mt-6 bg-white shadow-lg border border-zinc-200">
              <CardBody className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold text-zinc-800 mb-4">Equipment Costs</h3>
                {renderEstimateTable(equipmentRows, setEquipmentRows)}
              </CardBody>
            </Card>
          </Tab>

          <Tab key="labor" title="Labor">
            <Card className="mt-4 sm:mt-6 bg-white shadow-lg border border-zinc-200">
              <CardBody className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold text-zinc-800 mb-4">Labor Costs</h3>
                {renderEstimateTable(laborRows, setLaborRows)}
              </CardBody>
            </Card>
          </Tab>

          <Tab key="hard-material" title="Hard Material">
            <Card className="mt-4 sm:mt-6 bg-white shadow-lg border border-zinc-200">
              <CardBody className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold text-zinc-800 mb-4">Hard Material Costs</h3>
                {renderEstimateTable(hardMaterialRows, setHardMaterialRows)}
              </CardBody>
            </Card>
          </Tab>

          <Tab key="plant-material" title="Plant Material">
            <Card className="mt-4 sm:mt-6 bg-white shadow-lg border border-zinc-200">
              <CardBody className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold text-zinc-800 mb-4">Plant Material Costs</h3>
                {renderEstimateTable(plantMaterialRows, setPlantMaterialRows)}
              </CardBody>
            </Card>
          </Tab>

          <Tab key="other-job-costs" title="Other Job Costs">
            <Card className="mt-4 sm:mt-6 bg-white shadow-lg border border-zinc-200">
              <CardBody className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold text-zinc-800 mb-4">Other Job Costs</h3>
                {renderEstimateTable(otherJobCostsRows, setOtherJobCostsRows)}
              </CardBody>
            </Card>
          </Tab>

          <Tab key="sub-contractor" title="Sub-contractor">
            <Card className="mt-4 sm:mt-6 bg-white shadow-lg border border-zinc-200">
              <CardBody className="p-4 sm:p-6">
                <h3 className="text-xl font-semibold text-zinc-800 mb-4">Sub-contractor Costs</h3>
                {renderEstimateTable(subContractorRows, setSubContractorRows)}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>

        {/* Final Pricing Section */}
        <Card className="mt-6 bg-white shadow-lg border border-zinc-200">
          <CardBody className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold text-zinc-800 mb-4">Final Pricing</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Standard Margin"
                  placeholder="Enter standard margin"
                  classNames={{
                    input: "bg-white",
                    inputWrapper: "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
                  }}
                />
                <Input
                  label="Confirmed Price"
                  placeholder="Enter confirmed price"
                  classNames={{
                    input: "bg-white",
                    inputWrapper: "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
                  }}
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-zinc-200">
                  <span className="font-semibold text-zinc-800">Final Selling Price</span>
                  <span className="font-semibold text-zinc-800">$0.00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-zinc-200">
                  <span className="font-semibold text-zinc-800">Confirmed Net GP %</span>
                  <span className="font-semibold text-zinc-800">0%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-zinc-200">
                  <span className="font-semibold text-zinc-800">Confirmed GP $</span>
                  <span className="font-semibold text-zinc-800">$0.00</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Summary Section */}
        <Card className="mt-6 bg-white shadow-lg border border-zinc-200">
          <CardBody className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold text-zinc-800 mb-4">Summary</h3>
            <div className="overflow-x-auto">
              <Table
                aria-label="Summary table"
                classNames={{
                  wrapper: "bg-white rounded-xl border border-zinc-200",
                  th: "bg-zinc-50 text-zinc-700 font-semibold text-xs",
                  td: "text-zinc-700 text-sm",
                }}
              >
                <TableHeader>
                  <TableColumn></TableColumn>
                  <TableColumn>EQUIPMENT COST</TableColumn>
                  <TableColumn>LABOR COST</TableColumn>
                  <TableColumn>GENERAL LABOR HOURS</TableColumn>
                  <TableColumn>SUPERVISOR HOURS</TableColumn>
                  <TableColumn>MATERIAL COSTS (HARD + PLANT)</TableColumn>
                  <TableColumn>OTHER JOB COSTS</TableColumn>
                  <TableColumn>SUB COSTS</TableColumn>
                  <TableColumn>SALES TAX</TableColumn>
                  <TableColumn>TOTAL</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Cost</TableCell>
                    <TableCell>$0.00</TableCell>
                    <TableCell>$0.00</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>$0.00</TableCell>
                    <TableCell>$0.00</TableCell>
                    <TableCell>$0.00</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell className="font-semibold">$0.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
