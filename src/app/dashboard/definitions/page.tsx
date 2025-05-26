"use client";

import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Button,
  Input,
  Select,
  SelectItem,
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
  Chip,
} from "@heroui/react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  CheckCircle,
  AlertCircle,
  Info,
  X,
} from "lucide-react";
import { SiteHeader } from "@/components/sidebar/site-header";

// Types
interface WorkType {
  id: string;
  workType: string;
  serviceLine: string;
}

interface ServiceLine {
  id: string;
  name: string;
}

interface PlantType {
  id: string;
  name: string;
}

interface PlantSize {
  id: string;
  description: string;
  unitType: string;
  size: number;
  installLaborHours: number;
  wateringLaborHours: number;
  treeStakeKits: number;
}

interface Toast {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

// Initial data
const initialWorkTypes: WorkType[] = [
  { id: "1", workType: "Aeration & Overseeding", serviceLine: "Turf Care" },
  { id: "2", workType: "Aeration work", serviceLine: "Turf Care" },
  { id: "3", workType: "Bushhogging", serviceLine: "Installation" },
  { id: "4", workType: "Debris Removal", serviceLine: "Installation" },
  { id: "5", workType: "Demolition", serviceLine: "Installation" },
  { id: "6", workType: "Design and installation", serviceLine: "Installation" },
  { id: "7", workType: "Dormant Pruning work", serviceLine: "Installation" },
  { id: "8", workType: "Drainage work", serviceLine: "Drainage" },
  { id: "9", workType: "Emergency repairs", serviceLine: "Installation" },
  { id: "10", workType: "Fall Flowers", serviceLine: "Color" },
  { id: "11", workType: "Holiday Decorations", serviceLine: "Installation" },
  { id: "12", workType: "Ice Patrol/Watch", serviceLine: "Snow" },
  { id: "13", workType: "Ice Storm", serviceLine: "Snow" },
  { id: "14", workType: "In House Turf Application", serviceLine: "Turf Care" },
  { id: "15", workType: "Install sod", serviceLine: "Installation" },
  { id: "16", workType: "Installation of Pots", serviceLine: "Color" },
  { id: "17", workType: "Irrig start up repairs", serviceLine: "Irrigation" },
  { id: "18", workType: "Irrigation", serviceLine: "Irrigation" },
  { id: "19", workType: "Irrigation check", serviceLine: "Irrigation" },
  { id: "20", workType: "Irrigation check repairs", serviceLine: "Irrigation" },
  { id: "21", workType: "Irrigation installation", serviceLine: "Irrigation" },
  { id: "22", workType: "Irrigation start up", serviceLine: "Irrigation" },
  { id: "23", workType: "Irrigation Winterization", serviceLine: "Irrigation" },
  { id: "24", workType: "Lawn or T/S Chemical Apps", serviceLine: "Turf Care" },
  { id: "25", workType: "Lighting Inspections", serviceLine: "Lighting" },
  { id: "26", workType: "Mulching", serviceLine: "Installation" },
  { id: "27", workType: "Other misc WO", serviceLine: "Installation" },
  { id: "28", workType: "Overseeding work", serviceLine: "Turf Care" },
  { id: "29", workType: "Partial Salt", serviceLine: "Snow" },
  { id: "30", workType: "Plant Watering", serviceLine: "Watering" },
  { id: "31", workType: "Planting/Installation", serviceLine: "Installation" },
  { id: "32", workType: "Portering", serviceLine: "Installation" },
  { id: "33", workType: "Seeding", serviceLine: "Turf Care" },
  { id: "34", workType: "Stump Grinding", serviceLine: "Tree Work" },
  { id: "35", workType: "Summer Flowers", serviceLine: "Color" },
  { id: "36", workType: "Tree Work", serviceLine: "Tree Work" },
];

const initialServiceLines: ServiceLine[] = [
  { id: "1", name: "Installation" },
  { id: "2", name: "Color" },
  { id: "3", name: "Irrigation" },
  { id: "4", name: "Chemical Spray" },
  { id: "5", name: "Tree Work" },
  { id: "6", name: "Hardscape" },
  { id: "7", name: "Turf Care" },
  { id: "8", name: "Watering" },
  { id: "9", name: "Drainage" },
  { id: "10", name: "Snow" },
  { id: "11", name: "Lighting" },
];

const initialPlantTypes: PlantType[] = [
  { id: "1", name: "Annual" },
  { id: "2", name: "Deciduous Tree" },
  { id: "3", name: "Evergreen Tree" },
  { id: "4", name: "Ivy" },
  { id: "5", name: "Perennial" },
  { id: "6", name: "Shrub" },
  { id: "7", name: "zzzz" },
];

const initialPlantSizes: PlantSize[] = [
  {
    id: "1",
    description: "1 GAL",
    unitType: "Container Capacity",
    size: 1,
    installLaborHours: 0.1,
    wateringLaborHours: 0.01,
    treeStakeKits: 0,
  },
  {
    id: "2",
    description: "Quart",
    unitType: "Container Capacity",
    size: 1,
    installLaborHours: 0.02,
    wateringLaborHours: 0.005,
    treeStakeKits: 0,
  },
  {
    id: "3",
    description: "2 GAL",
    unitType: "Container Capacity",
    size: 2,
    installLaborHours: 0.16,
    wateringLaborHours: 0.025,
    treeStakeKits: 0,
  },
  {
    id: "4",
    description: "3 GAL",
    unitType: "Container Capacity",
    size: 3,
    installLaborHours: 0.25,
    wateringLaborHours: 0.03,
    treeStakeKits: 0,
  },
  {
    id: "5",
    description: "5 Gal",
    unitType: "Container Capacity",
    size: 6,
    installLaborHours: 0.5,
    wateringLaborHours: 0.045,
    treeStakeKits: 0,
  },
  {
    id: "6",
    description: "6 GAL",
    unitType: "Container Capacity",
    size: 6,
    installLaborHours: 0.65,
    wateringLaborHours: 0.045,
    treeStakeKits: 0,
  },
  {
    id: "7",
    description: "7 GAL",
    unitType: "Container Capacity",
    size: 7,
    installLaborHours: 0.65,
    wateringLaborHours: 0.05,
    treeStakeKits: 0,
  },
  {
    id: "8",
    description: "10 GAL",
    unitType: "Container Capacity",
    size: 10,
    installLaborHours: 1.0,
    wateringLaborHours: 0.06,
    treeStakeKits: 0,
  },
  {
    id: "9",
    description: "15 GAL",
    unitType: "Container Capacity",
    size: 15,
    installLaborHours: 2.0,
    wateringLaborHours: 0.075,
    treeStakeKits: 1,
  },
  {
    id: "10",
    description: "25 GAL",
    unitType: "Container Capacity",
    size: 25,
    installLaborHours: 3.0,
    wateringLaborHours: 0.075,
    treeStakeKits: 1,
  },
];

// Custom Toast Component
const ToastContainer = ({
  toasts,
  onRemove,
}: {
  toasts: Toast[];
  onRemove: (id: string) => void;
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-[calc(100vw-2rem)] sm:max-w-[400px]">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

const ToastItem = ({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />,
  };

  const colors = {
    success: "bg-emerald-50 border-emerald-200 shadow-emerald-100",
    error: "bg-rose-50 border-rose-200 shadow-rose-100",
    info: "bg-sky-50 border-sky-200 shadow-sky-100",
  };

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm shadow-lg
        transform transition-all duration-300 ease-out min-w-[280px] w-full
        ${colors[toast.type]}
        ${
          isVisible
            ? "tranzinc-x-0 opacity-100 scale-100"
            : "tranzinc-x-full opacity-0 scale-95"
        }
      `}
    >
      {icons[toast.type]}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-zinc-800 text-sm truncate">
          {toast.title}
        </h4>
        <p className="text-zinc-600 text-sm mt-1 break-words">
          {toast.message}
        </p>
      </div>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        className="text-zinc-400 hover:text-zinc-600 min-w-6 h-6 flex-shrink-0"
        onPress={() => {
          setIsVisible(false);
          setTimeout(() => onRemove(toast.id), 300);
        }}
      >
        <X size={14} />
      </Button>
    </div>
  );
};

export default function LandscapingManagement() {
  // State management
  const [workTypes, setWorkTypes] = useState<WorkType[]>(initialWorkTypes);
  const [serviceLines, setServiceLines] =
    useState<ServiceLine[]>(initialServiceLines);
  const [plantTypes, setPlantTypes] = useState<PlantType[]>(initialPlantTypes);
  const [plantSizes, setPlantSizes] = useState<PlantSize[]>(initialPlantSizes);

  // Toast state
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Modal states
  const {
    isOpen: isWorkTypeModalOpen,
    onOpen: onWorkTypeModalOpen,
    onClose: onWorkTypeModalClose,
  } = useDisclosure();
  const {
    isOpen: isServiceLineModalOpen,
    onOpen: onServiceLineModalOpen,
    onClose: onServiceLineModalClose,
  } = useDisclosure();
  const {
    isOpen: isPlantTypeModalOpen,
    onOpen: onPlantTypeModalOpen,
    onClose: onPlantTypeModalClose,
  } = useDisclosure();
  const {
    isOpen: isPlantSizeModalOpen,
    onOpen: onPlantSizeModalOpen,
    onClose: onPlantSizeModalClose,
  } = useDisclosure();

  // Delete confirmation modal states
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const [deleteItem, setDeleteItem] = useState<{
    type: string;
    id: string;
    name: string;
  } | null>(null);

  // Form states
  const [editingWorkType, setEditingWorkType] = useState<WorkType | null>(null);
  const [editingServiceLine, setEditingServiceLine] =
    useState<ServiceLine | null>(null);
  const [editingPlantType, setEditingPlantType] = useState<PlantType | null>(
    null
  );
  const [editingPlantSize, setEditingPlantSize] = useState<PlantSize | null>(
    null
  );

  // Search states
  const [workTypeSearch, setWorkTypeSearch] = useState("");
  const [serviceLineSearch, setServiceLineSearch] = useState("");
  const [plantTypeSearch, setPlantTypeSearch] = useState("");
  const [plantSizeSearch, setPlantSizeSearch] = useState("");

  // Toast functions
  const addToast = (
    type: "success" | "error" | "info",
    title: string,
    message: string
  ) => {
    const newToast: Toast = {
      id: Date.now().toString(),
      type,
      title,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Delete confirmation handler
  const handleDeleteConfirmation = (type: string, id: string, name: string) => {
    setDeleteItem({ type, id, name });
    onDeleteModalOpen();
  };

  const handleConfirmDelete = () => {
    if (!deleteItem) return;

    switch (deleteItem.type) {
      case "workType":
        setWorkTypes(workTypes.filter((wt) => wt.id !== deleteItem.id));
        addToast(
          "success",
          "Work Type Deleted",
          `"${deleteItem.name}" has been successfully removed.`
        );
        break;
      case "serviceLine":
        setServiceLines(serviceLines.filter((sl) => sl.id !== deleteItem.id));
        addToast(
          "success",
          "Service Line Deleted",
          `"${deleteItem.name}" has been successfully removed.`
        );
        break;
      case "plantType":
        setPlantTypes(plantTypes.filter((pt) => pt.id !== deleteItem.id));
        addToast(
          "success",
          "Plant Type Deleted",
          `"${deleteItem.name}" has been successfully removed.`
        );
        break;
      case "plantSize":
        setPlantSizes(plantSizes.filter((ps) => ps.id !== deleteItem.id));
        addToast(
          "success",
          "Plant Size Deleted",
          `"${deleteItem.name}" has been successfully removed.`
        );
        break;
    }

    setDeleteItem(null);
    onDeleteModalClose();
  };

  // CRUD functions for Work Types
  const handleAddWorkType = (data: Omit<WorkType, "id">) => {
    const newWorkType = { ...data, id: Date.now().toString() };
    setWorkTypes([...workTypes, newWorkType]);
    onWorkTypeModalClose();
    addToast(
      "success",
      "Work Type Added",
      `"${data.workType}" has been successfully created.`
    );
  };

  const handleEditWorkType = (data: Omit<WorkType, "id">) => {
    if (editingWorkType) {
      setWorkTypes(
        workTypes.map((wt) =>
          wt.id === editingWorkType.id
            ? { ...data, id: editingWorkType.id }
            : wt
        )
      );
      setEditingWorkType(null);
      onWorkTypeModalClose();
      addToast(
        "success",
        "Work Type Updated",
        `"${data.workType}" has been successfully updated.`
      );
    }
  };

  // CRUD functions for Service Lines
  const handleAddServiceLine = (data: Omit<ServiceLine, "id">) => {
    const newServiceLine = { ...data, id: Date.now().toString() };
    setServiceLines([...serviceLines, newServiceLine]);
    onServiceLineModalClose();
    addToast(
      "success",
      "Service Line Added",
      `"${data.name}" has been successfully created.`
    );
  };

  const handleEditServiceLine = (data: Omit<ServiceLine, "id">) => {
    if (editingServiceLine) {
      setServiceLines(
        serviceLines.map((sl) =>
          sl.id === editingServiceLine.id
            ? { ...data, id: editingServiceLine.id }
            : sl
        )
      );
      setEditingServiceLine(null);
      onServiceLineModalClose();
      addToast(
        "success",
        "Service Line Updated",
        `"${data.name}" has been successfully updated.`
      );
    }
  };

  // CRUD functions for Plant Types
  const handleAddPlantType = (data: Omit<PlantType, "id">) => {
    const newPlantType = { ...data, id: Date.now().toString() };
    setPlantTypes([...plantTypes, newPlantType]);
    onPlantTypeModalClose();
    addToast(
      "success",
      "Plant Type Added",
      `"${data.name}" has been successfully created.`
    );
  };

  const handleEditPlantType = (data: Omit<PlantType, "id">) => {
    if (editingPlantType) {
      setPlantTypes(
        plantTypes.map((pt) =>
          pt.id === editingPlantType.id
            ? { ...data, id: editingPlantType.id }
            : pt
        )
      );
      setEditingPlantType(null);
      onPlantTypeModalClose();
      addToast(
        "success",
        "Plant Type Updated",
        `"${data.name}" has been successfully updated.`
      );
    }
  };

  // CRUD functions for Plant Sizes
  const handleAddPlantSize = (data: Omit<PlantSize, "id">) => {
    const newPlantSize = { ...data, id: Date.now().toString() };
    setPlantSizes([...plantSizes, newPlantSize]);
    onPlantSizeModalClose();
    addToast(
      "success",
      "Plant Size Added",
      `"${data.description}" has been successfully created.`
    );
  };

  const handleEditPlantSize = (data: Omit<PlantSize, "id">) => {
    if (editingPlantSize) {
      setPlantSizes(
        plantSizes.map((ps) =>
          ps.id === editingPlantSize.id
            ? { ...data, id: editingPlantSize.id }
            : ps
        )
      );
      setEditingPlantSize(null);
      onPlantSizeModalClose();
      addToast(
        "success",
        "Plant Size Updated",
        `"${data.description}" has been successfully updated.`
      );
    }
  };

  // Filter functions
  const filteredWorkTypes = workTypes.filter(
    (wt) =>
      wt.workType.toLowerCase().includes(workTypeSearch.toLowerCase()) ||
      wt.serviceLine.toLowerCase().includes(workTypeSearch.toLowerCase())
  );

  const filteredServiceLines = serviceLines.filter((sl) =>
    sl.name.toLowerCase().includes(serviceLineSearch.toLowerCase())
  );

  const filteredPlantTypes = plantTypes.filter((pt) =>
    pt.name.toLowerCase().includes(plantTypeSearch.toLowerCase())
  );

  const filteredPlantSizes = plantSizes.filter(
    (ps) =>
      ps.description.toLowerCase().includes(plantSizeSearch.toLowerCase()) ||
      ps.unitType.toLowerCase().includes(plantSizeSearch.toLowerCase())
  );

  const getServiceLineColor = (serviceLine: string) => {
    const colors: Record<string, string> = {
      Installation: "primary",
      Color: "secondary",
      Irrigation: "success",
      "Chemical Spray": "warning",
      "Tree Work": "danger",
      Hardscape: "default",
      "Turf Care": "primary",
      Watering: "success",
      Drainage: "secondary",
      Snow: "default",
      Lighting: "warning",
    };
    return colors[serviceLine] || "default";
  };

  // Show a beautiful thing if everything is blank.

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <SiteHeader name="Definitions" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 bg-clip-text text-transparent mb-2">
            Landscaping Management System
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base">
            Manage your landscaping services, plant types, and specifications
          </p>
        </div>

        <Tabs
          aria-label="Management tabs"
          color="primary"
          variant="underlined"
          classNames={{
            tabList:
              "gap-2 sm:gap-6 w-full relative rounded-none p-0 border-b border-zinc-200 overflow-x-auto",
            cursor: "w-full bg-blue-600",
            tab: "max-w-fit px-2 sm:px-0 h-12 whitespace-nowrap",
            tabContent:
              "group-data-[selected=true]:text-blue-600 font-medium text-sm sm:text-base",
          }}
        >
          <Tab key="work-types" title="Work Types">
            <Card className="mt-4 sm:mt-6 bg-white shadow-lg border border-zinc-200">
              <CardBody className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-zinc-800">
                    Work Types
                  </h2>
                  <Button
                    color="primary"
                    startContent={<Plus size={16} />}
                    onPress={() => {
                      setEditingWorkType(null);
                      onWorkTypeModalOpen();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                  >
                    Add Work Type
                  </Button>
                </div>

                <div className="mb-4">
                  <Input
                    placeholder="Search work types..."
                    value={workTypeSearch}
                    onChange={(e) => setWorkTypeSearch(e.target.value)}
                    startContent={<Search size={16} />}
                    className="w-full sm:max-w-sm"
                    classNames={{
                      input: "bg-white",
                      inputWrapper:
                        "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
                    }}
                  />
                </div>

                <div className="overflow-x-auto">
                  <Table
                    aria-label="Work types table"
                    className="min-h-[400px]"
                    classNames={{
                      wrapper: "bg-white rounded-xl border border-zinc-200",
                      th: "bg-zinc-50 text-zinc-700 font-semibold",
                      td: "text-zinc-700",
                    }}
                  >
                    <TableHeader>
                      <TableColumn>WORK TYPE</TableColumn>
                      <TableColumn>SERVICE LINE</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {filteredWorkTypes.map((workType) => (
                        <TableRow key={workType.id}>
                          <TableCell className="font-medium">
                            {workType.workType}
                          </TableCell>
                          <TableCell>
                            <Chip
                              color={
                                getServiceLineColor(workType.serviceLine) as any
                              }
                              variant="flat"
                              size="sm"
                            >
                              {workType.serviceLine}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="text-blue-600 hover:bg-blue-50"
                                onPress={() => {
                                  setEditingWorkType(workType);
                                  onWorkTypeModalOpen();
                                }}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="text-rose-600 hover:bg-rose-50"
                                onPress={() =>
                                  handleDeleteConfirmation(
                                    "workType",
                                    workType.id,
                                    workType.workType
                                  )
                                }
                              >
                                <Trash2 size={16} />
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
          </Tab>

          <Tab key="service-lines" title="Service Lines">
            <Card className="mt-4 sm:mt-6 bg-white shadow-lg border border-zinc-200">
              <CardBody className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-zinc-800">
                    Service Lines
                  </h2>
                  <Button
                    color="primary"
                    startContent={<Plus size={16} />}
                    onPress={() => {
                      setEditingServiceLine(null);
                      onServiceLineModalOpen();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                  >
                    Add Service Line
                  </Button>
                </div>

                <div className="mb-4">
                  <Input
                    placeholder="Search service lines..."
                    value={serviceLineSearch}
                    onChange={(e) => setServiceLineSearch(e.target.value)}
                    startContent={<Search size={16} />}
                    className="w-full sm:max-w-sm"
                    classNames={{
                      input: "bg-white",
                      inputWrapper:
                        "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
                    }}
                  />
                </div>

                <div className="overflow-x-auto">
                  <Table
                    aria-label="Service lines table"
                    className="min-h-[400px]"
                    classNames={{
                      wrapper: "bg-white rounded-xl border border-zinc-200",
                      th: "bg-zinc-50 text-zinc-700 font-semibold",
                      td: "text-zinc-700",
                    }}
                  >
                    <TableHeader>
                      <TableColumn>SERVICE LINE</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {filteredServiceLines.map((serviceLine) => (
                        <TableRow key={serviceLine.id}>
                          <TableCell>
                            <Chip
                              color={
                                getServiceLineColor(serviceLine.name) as any
                              }
                              variant="flat"
                              size="md"
                            >
                              {serviceLine.name}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="text-blue-600 hover:bg-blue-50"
                                onPress={() => {
                                  setEditingServiceLine(serviceLine);
                                  onServiceLineModalOpen();
                                }}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="text-rose-600 hover:bg-rose-50"
                                onPress={() =>
                                  handleDeleteConfirmation(
                                    "serviceLine",
                                    serviceLine.id,
                                    serviceLine.name
                                  )
                                }
                              >
                                <Trash2 size={16} />
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
          </Tab>

          <Tab key="plant-types" title="Plant Types">
            <Card className="mt-4 sm:mt-6 bg-white shadow-lg border border-zinc-200">
              <CardBody className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-zinc-800">
                    Plant Types
                  </h2>
                  <Button
                    color="primary"
                    startContent={<Plus size={16} />}
                    onPress={() => {
                      setEditingPlantType(null);
                      onPlantTypeModalOpen();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                  >
                    Add Plant Type
                  </Button>
                </div>

                <div className="mb-4">
                  <Input
                    placeholder="Search plant types..."
                    value={plantTypeSearch}
                    onChange={(e) => setPlantTypeSearch(e.target.value)}
                    startContent={<Search size={16} />}
                    className="w-full sm:max-w-sm"
                    classNames={{
                      input: "bg-white",
                      inputWrapper:
                        "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
                    }}
                  />
                </div>

                <div className="overflow-x-auto">
                  <Table
                    aria-label="Plant types table"
                    className="min-h-[400px]"
                    classNames={{
                      wrapper: "bg-white rounded-xl border border-zinc-200",
                      th: "bg-zinc-50 text-zinc-700 font-semibold",
                      td: "text-zinc-700",
                    }}
                  >
                    <TableHeader>
                      <TableColumn>PLANT TYPE</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {filteredPlantTypes.map((plantType) => (
                        <TableRow key={plantType.id}>
                          <TableCell className="font-medium">
                            {plantType.name}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="text-blue-600 hover:bg-blue-50"
                                onPress={() => {
                                  setEditingPlantType(plantType);
                                  onPlantTypeModalOpen();
                                }}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="text-rose-600 hover:bg-rose-50"
                                onPress={() =>
                                  handleDeleteConfirmation(
                                    "plantType",
                                    plantType.id,
                                    plantType.name
                                  )
                                }
                              >
                                <Trash2 size={16} />
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
          </Tab>

          <Tab key="plant-sizes" title="Plant Sizes">
            <Card className="mt-4 sm:mt-6 bg-white shadow-lg border border-zinc-200">
              <CardBody className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-zinc-800">
                    Plant Material Sizes
                  </h2>
                  <Button
                    color="primary"
                    startContent={<Plus size={16} />}
                    onPress={() => {
                      setEditingPlantSize(null);
                      onPlantSizeModalOpen();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                  >
                    Add Plant Size
                  </Button>
                </div>

                <div className="mb-4">
                  <Input
                    placeholder="Search plant sizes..."
                    value={plantSizeSearch}
                    onChange={(e) => setPlantSizeSearch(e.target.value)}
                    startContent={<Search size={16} />}
                    className="w-full sm:max-w-sm"
                    classNames={{
                      input: "bg-white",
                      inputWrapper:
                        "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
                    }}
                  />
                </div>

                <div className="overflow-x-auto">
                  {/* Mobile Card Layout */}
                  <div className="block sm:hidden space-y-4">
                    {filteredPlantSizes.map((plantSize) => (
                      <Card
                        key={plantSize.id}
                        className="bg-white border border-zinc-200"
                      >
                        <CardBody className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-zinc-800 text-lg">
                              {plantSize.description}
                            </h3>
                            <div className="flex gap-2">
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="text-blue-600 hover:bg-blue-50"
                                onPress={() => {
                                  setEditingPlantSize(plantSize);
                                  onPlantSizeModalOpen();
                                }}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                className="text-rose-600 hover:bg-rose-50"
                                onPress={() =>
                                  handleDeleteConfirmation(
                                    "plantSize",
                                    plantSize.id,
                                    plantSize.description
                                  )
                                }
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-zinc-500 font-medium">
                                Unit Type:
                              </span>
                              <p className="text-zinc-700 mt-1">
                                {plantSize.unitType}
                              </p>
                            </div>
                            <div>
                              <span className="text-zinc-500 font-medium">
                                Size:
                              </span>
                              <p className="text-zinc-700 mt-1">
                                {plantSize.size}
                              </p>
                            </div>
                            <div>
                              <span className="text-zinc-500 font-medium">
                                Install Hours:
                              </span>
                              <p className="text-zinc-700 mt-1">
                                {plantSize.installLaborHours}
                              </p>
                            </div>
                            <div>
                              <span className="text-zinc-500 font-medium">
                                Watering Hours:
                              </span>
                              <p className="text-zinc-700 mt-1">
                                {plantSize.wateringLaborHours}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <span className="text-zinc-500 font-medium">
                                Tree Stake Kits:
                              </span>
                              <p className="text-zinc-700 mt-1">
                                {plantSize.treeStakeKits}
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                    {filteredPlantSizes.length === 0 && (
                      <div className="text-center py-8 text-zinc-500">
                        No plant sizes found matching your search.
                      </div>
                    )}
                  </div>

                  {/* Desktop Table Layout */}
                  <div className="hidden sm:block">
                    <Table
                      aria-label="Plant sizes table"
                      className="min-h-[400px]"
                      classNames={{
                        wrapper: "bg-white rounded-xl border border-zinc-200",
                        th: "bg-zinc-50 text-zinc-700 font-semibold",
                        td: "text-zinc-700",
                      }}
                    >
                      <TableHeader>
                        <TableColumn>DESCRIPTION</TableColumn>
                        <TableColumn className="hidden sm:table-cell">
                          UNIT TYPE
                        </TableColumn>
                        <TableColumn className="hidden md:table-cell">
                          SIZE
                        </TableColumn>
                        <TableColumn className="hidden lg:table-cell">
                          INSTALL HOURS
                        </TableColumn>
                        <TableColumn className="hidden lg:table-cell">
                          WATERING HOURS
                        </TableColumn>
                        <TableColumn className="hidden xl:table-cell">
                          STAKE KITS
                        </TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {filteredPlantSizes.map((plantSize) => (
                          <TableRow key={plantSize.id}>
                            <TableCell className="font-medium">
                              {plantSize.description}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {plantSize.unitType}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {plantSize.size}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {plantSize.installLaborHours}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {plantSize.wateringLaborHours}
                            </TableCell>
                            <TableCell className="hidden xl:table-cell">
                              {plantSize.treeStakeKits}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  className="text-blue-600 hover:bg-blue-50"
                                  onPress={() => {
                                    setEditingPlantSize(plantSize);
                                    onPlantSizeModalOpen();
                                  }}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  className="text-rose-600 hover:bg-rose-50"
                                  onPress={() =>
                                    handleDeleteConfirmation(
                                      "plantSize",
                                      plantSize.id,
                                      plantSize.description
                                    )
                                  }
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          size="md"
          classNames={{
            backdrop: "bg-zinc-900/50 backdrop-blur-sm",
            base: "bg-white border border-zinc-200 mx-4",
            header: "border-b border-zinc-200",
            footer: "border-t border-zinc-200",
          }}
        >
          <ModalContent>
            <ModalHeader className="flex items-center gap-3">
              <div className="p-2 bg-rose-100 rounded-full">
                <AlertCircle className="w-5 h-5 text-rose-600" />
              </div>
              <span className="text-zinc-800">Confirm Deletion</span>
            </ModalHeader>
            <ModalBody className="py-6">
              <p className="text-zinc-600">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-zinc-800">
                  "{deleteItem?.name}"
                </span>
                ? This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="light"
                onPress={onDeleteModalClose}
                className="text-zinc-600 hover:bg-zinc-100 w-full sm:w-auto"
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

        {/* Work Type Modal */}
        <WorkTypeModal
          isOpen={isWorkTypeModalOpen}
          onClose={onWorkTypeModalClose}
          onSubmit={editingWorkType ? handleEditWorkType : handleAddWorkType}
          editingWorkType={editingWorkType}
          serviceLines={serviceLines}
        />

        {/* Service Line Modal */}
        <ServiceLineModal
          isOpen={isServiceLineModalOpen}
          onClose={onServiceLineModalClose}
          onSubmit={
            editingServiceLine ? handleEditServiceLine : handleAddServiceLine
          }
          editingServiceLine={editingServiceLine}
        />

        {/* Plant Type Modal */}
        <PlantTypeModal
          isOpen={isPlantTypeModalOpen}
          onClose={onPlantTypeModalClose}
          onSubmit={editingPlantType ? handleEditPlantType : handleAddPlantType}
          editingPlantType={editingPlantType}
        />

        {/* Plant Size Modal */}
        <PlantSizeModal
          isOpen={isPlantSizeModalOpen}
          onClose={onPlantSizeModalClose}
          onSubmit={editingPlantSize ? handleEditPlantSize : handleAddPlantSize}
          editingPlantSize={editingPlantSize}
        />
      </div>
    </div>
  );
}

// Work Type Modal Component
function WorkTypeModal({
  isOpen,
  onClose,
  onSubmit,
  editingWorkType,
  serviceLines,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<WorkType, "id">) => void;
  editingWorkType: WorkType | null;
  serviceLines: ServiceLine[];
}) {
  const [workType, setWorkType] = useState("");
  const [serviceLine, setServiceLine] = useState("");

  const hasChanges = editingWorkType
    ? workType !== editingWorkType.workType ||
      serviceLine !== editingWorkType.serviceLine
    : workType.trim() !== "" && serviceLine !== "";

  const handleSubmit = () => {
    if (workType && serviceLine) {
      onSubmit({ workType, serviceLine });
      setWorkType("");
      setServiceLine("");
    }
  };

  const handleClose = () => {
    setWorkType("");
    setServiceLine("");
    onClose();
  };

  // Set form values when editing
  useEffect(() => {
    if (editingWorkType) {
      setWorkType(editingWorkType.workType);
      setServiceLine(editingWorkType.serviceLine);
    } else {
      setWorkType("");
      setServiceLine("");
    }
  }, [editingWorkType]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="md"
      classNames={{
        backdrop: "bg-zinc-900/50 backdrop-blur-sm",
        base: "bg-white border border-zinc-200 mx-4",
        header: "border-b border-zinc-200",
        footer: "border-t border-zinc-200",
      }}
    >
      <ModalContent>
        <ModalHeader className="text-zinc-800">
          {editingWorkType ? "Edit Work Type" : "Add Work Type"}
        </ModalHeader>
        <ModalBody className="py-6 space-y-4">
          <Input
            label="Work Type"
            placeholder="Enter work type"
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            classNames={{
              input: "bg-white",
              inputWrapper:
                "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
            }}
          />
          <Select
            label="Service Line"
            placeholder="Select service line"
            selectedKeys={serviceLine ? [serviceLine] : []}
            onSelectionChange={(keys) =>
              setServiceLine(Array.from(keys)[0] as string)
            }
            classNames={{
              trigger:
                "bg-white border-zinc-200 hover:border-blue-300 focus:border-blue-500",
            }}
          >
            {serviceLines.map((sl) => (
              <SelectItem key={sl.name}>{sl.name}</SelectItem>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="light"
            onPress={handleClose}
            className="text-zinc-600 hover:bg-zinc-100 w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
            isDisabled={!hasChanges}
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-zinc-300 disabled:text-zinc-500 w-full sm:w-auto"
          >
            {editingWorkType ? "Update" : "Add"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Service Line Modal Component
function ServiceLineModal({
  isOpen,
  onClose,
  onSubmit,
  editingServiceLine,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<ServiceLine, "id">) => void;
  editingServiceLine: ServiceLine | null;
}) {
  const [name, setName] = useState("");

  const hasChanges = editingServiceLine
    ? name !== editingServiceLine.name
    : name.trim() !== "";

  const handleSubmit = () => {
    if (name) {
      onSubmit({ name });
      setName("");
    }
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  // Set form values when editing
  useEffect(() => {
    if (editingServiceLine) {
      setName(editingServiceLine.name);
    } else {
      setName("");
    }
  }, [editingServiceLine]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="md"
      classNames={{
        backdrop: "bg-zinc-900/50 backdrop-blur-sm",
        base: "bg-white border border-zinc-200 mx-4",
        header: "border-b border-zinc-200",
        footer: "border-t border-zinc-200",
      }}
    >
      <ModalContent>
        <ModalHeader className="text-zinc-800">
          {editingServiceLine ? "Edit Service Line" : "Add Service Line"}
        </ModalHeader>
        <ModalBody className="py-6">
          <Input
            label="Service Line Name"
            placeholder="Enter service line name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            classNames={{
              input: "bg-white",
              inputWrapper:
                "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
            }}
          />
        </ModalBody>
        <ModalFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="light"
            onPress={handleClose}
            className="text-zinc-600 hover:bg-zinc-100 w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
            isDisabled={!hasChanges}
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-zinc-300 disabled:text-zinc-500 w-full sm:w-auto"
          >
            {editingServiceLine ? "Update" : "Add"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Plant Type Modal Component
function PlantTypeModal({
  isOpen,
  onClose,
  onSubmit,
  editingPlantType,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<PlantType, "id">) => void;
  editingPlantType: PlantType | null;
}) {
  const [name, setName] = useState("");

  const hasChanges = editingPlantType
    ? name !== editingPlantType.name
    : name.trim() !== "";

  const handleSubmit = () => {
    if (name) {
      onSubmit({ name });
      setName("");
    }
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  // Set form values when editing
  useEffect(() => {
    if (editingPlantType) {
      setName(editingPlantType.name);
    } else {
      setName("");
    }
  }, [editingPlantType]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="md"
      classNames={{
        backdrop: "bg-zinc-900/50 backdrop-blur-sm",
        base: "bg-white border border-zinc-200 mx-4",
        header: "border-b border-zinc-200",
        footer: "border-t border-zinc-200",
      }}
    >
      <ModalContent>
        <ModalHeader className="text-zinc-800">
          {editingPlantType ? "Edit Plant Type" : "Add Plant Type"}
        </ModalHeader>
        <ModalBody className="py-6">
          <Input
            label="Plant Type Name"
            placeholder="Enter plant type name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            classNames={{
              input: "bg-white",
              inputWrapper:
                "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
            }}
          />
        </ModalBody>
        <ModalFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="light"
            onPress={handleClose}
            className="text-zinc-600 hover:bg-zinc-100 w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
            isDisabled={!hasChanges}
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-zinc-300 disabled:text-zinc-500 w-full sm:w-auto"
          >
            {editingPlantType ? "Update" : "Add"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Plant Size Modal Component
function PlantSizeModal({
  isOpen,
  onClose,
  onSubmit,
  editingPlantSize,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<PlantSize, "id">) => void;
  editingPlantSize: PlantSize | null;
}) {
  const [description, setDescription] = useState("");
  const [unitType, setUnitType] = useState("");
  const [size, setSize] = useState("");
  const [installLaborHours, setInstallLaborHours] = useState("");
  const [wateringLaborHours, setWateringLaborHours] = useState("");
  const [treeStakeKits, setTreeStakeKits] = useState("");

  const unitTypes = [
    "Container Capacity",
    "Pot Size",
    "Quantity",
    "Shrub Height",
    "Tree Diameter",
    "Tree Height",
  ];

  const hasChanges = editingPlantSize
    ? description !== editingPlantSize.description ||
      unitType !== editingPlantSize.unitType ||
      size !== editingPlantSize.size.toString() ||
      installLaborHours !== editingPlantSize.installLaborHours.toString() ||
      wateringLaborHours !== editingPlantSize.wateringLaborHours.toString() ||
      treeStakeKits !== editingPlantSize.treeStakeKits.toString()
    : description.trim() !== "" &&
      unitType !== "" &&
      size !== "" &&
      installLaborHours !== "" &&
      wateringLaborHours !== "" &&
      treeStakeKits !== "";

  const handleSubmit = () => {
    if (
      description &&
      unitType &&
      size &&
      installLaborHours &&
      wateringLaborHours &&
      treeStakeKits
    ) {
      onSubmit({
        description,
        unitType,
        size: Number.parseFloat(size),
        installLaborHours: Number.parseFloat(installLaborHours),
        wateringLaborHours: Number.parseFloat(wateringLaborHours),
        treeStakeKits: Number.parseInt(treeStakeKits),
      });
      setDescription("");
      setUnitType("");
      setSize("");
      setInstallLaborHours("");
      setWateringLaborHours("");
      setTreeStakeKits("");
    }
  };

  const handleClose = () => {
    setDescription("");
    setUnitType("");
    setSize("");
    setInstallLaborHours("");
    setWateringLaborHours("");
    setTreeStakeKits("");
    onClose();
  };

  // Set form values when editing
  useEffect(() => {
    if (editingPlantSize) {
      setDescription(editingPlantSize.description);
      setUnitType(editingPlantSize.unitType);
      setSize(editingPlantSize.size.toString());
      setInstallLaborHours(editingPlantSize.installLaborHours.toString());
      setWateringLaborHours(editingPlantSize.wateringLaborHours.toString());
      setTreeStakeKits(editingPlantSize.treeStakeKits.toString());
    } else {
      setDescription("");
      setUnitType("");
      setSize("");
      setInstallLaborHours("");
      setWateringLaborHours("");
      setTreeStakeKits("");
    }
  }, [editingPlantSize]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      classNames={{
        backdrop: "bg-zinc-900/50 backdrop-blur-sm",
        base: "bg-white border border-zinc-200 mx-4",
        header: "border-b border-zinc-200",
        footer: "border-t border-zinc-200",
      }}
    >
      <ModalContent>
        <ModalHeader className="text-zinc-800">
          {editingPlantSize ? "Edit Plant Size" : "Add Plant Size"}
        </ModalHeader>
        <ModalBody className="py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              classNames={{
                input: "bg-white",
                inputWrapper:
                  "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
              }}
            />
            <Select
              label="Unit Type"
              placeholder="Select unit type"
              selectedKeys={unitType ? [unitType] : []}
              onSelectionChange={(keys) =>
                setUnitType(Array.from(keys)[0] as string)
              }
              classNames={{
                trigger:
                  "bg-white border-zinc-200 hover:border-blue-300 focus:border-blue-500",
              }}
            >
              {unitTypes.map((type) => (
                <SelectItem key={type}>{type}</SelectItem>
              ))}
            </Select>
            <Input
              label="Size"
              placeholder="Enter size"
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              classNames={{
                input: "bg-white",
                inputWrapper:
                  "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
              }}
            />
            <Input
              label="Install Labor Hours"
              placeholder="Enter install labor hours"
              type="number"
              step="0.01"
              value={installLaborHours}
              onChange={(e) => setInstallLaborHours(e.target.value)}
              classNames={{
                input: "bg-white",
                inputWrapper:
                  "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
              }}
            />
            <Input
              label="Watering Labor Hours"
              placeholder="Enter watering labor hours"
              type="number"
              step="0.0001"
              value={wateringLaborHours}
              onChange={(e) => setWateringLaborHours(e.target.value)}
              classNames={{
                input: "bg-white",
                inputWrapper:
                  "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
              }}
            />
            <Input
              label="Tree Stake Kits"
              placeholder="Enter number of tree stake kits"
              type="number"
              value={treeStakeKits}
              onChange={(e) => setTreeStakeKits(e.target.value)}
              classNames={{
                input: "bg-white",
                inputWrapper:
                  "bg-white border-zinc-200 hover:border-blue-300 focus-within:border-blue-500",
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="light"
            onPress={handleClose}
            className="text-zinc-600 hover:bg-zinc-100 w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
            isDisabled={!hasChanges}
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-zinc-300 disabled:text-zinc-500 w-full sm:w-auto"
          >
            {editingPlantSize ? "Update" : "Add"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
