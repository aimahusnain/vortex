'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner
} from '@nextui-org/react';
import {
  Plus,
  Building2,
  Edit2,
  Trash2,
  Search,
  Eye,
  EyeOff
} from 'lucide-react';
import TopBar from '@/components/Topbar';

// TypeScript interfaces
interface Bank {
  id: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface BankFormData {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
}

const BankManagementPage: React.FC = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [showAccountNumbers, setShowAccountNumbers] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<BankFormData>({
    bankName: '',
    accountNumber: '',
    routingNumber: ''
  });

  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  // Database operations
  const fetchBanks = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/banks');
      if (response.ok) {
        const data: Bank[] = await response.json();
        setBanks(data);
      } else {
        console.error('Failed to fetch banks:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching banks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBank = async (bankData: BankFormData): Promise<Bank | null> => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/banks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bankData),
      });
      
      if (response.ok) {
        const newBank: Bank = await response.json();
        setBanks(prev => [...prev, newBank]);
        return newBank;
      } else {
        console.error('Failed to create bank:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error creating bank:', error);
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  const updateBank = async (id: string, bankData: BankFormData): Promise<boolean> => {
    setSubmitting(true);
    try {
      const response = await fetch(`/api/banks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bankData),
      });
      
      if (response.ok) {
        const updatedBank: Bank = await response.json();
        setBanks(prev => prev.map(bank => 
          bank.id === id ? updatedBank : bank
        ));
        return true;
      } else {
        console.error('Failed to update bank:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error updating bank:', error);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const deleteBank = async (id: string): Promise<boolean> => {
    setSubmitting(true);
    try {
      const response = await fetch(`/api/banks/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setBanks(prev => prev.filter(bank => bank.id !== id));
        return true;
      } else {
        console.error('Failed to delete bank:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error deleting bank:', error);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleAddBank = async (): Promise<void> => {
    try {
      const result = await createBank(formData);
      if (result) {
        setFormData({ bankName: '', accountNumber: '', routingNumber: '' });
        onAddClose();
      }
    } catch (error) {
      console.error('Error in handleAddBank:', error);
    }
  };

  const handleEditBank = async (): Promise<void> => {
    if (!selectedBank) return;
    
    try {
      const success = await updateBank(selectedBank.id, formData);
      if (success) {
        onEditClose();
      }
    } catch (error) {
      console.error('Error in handleEditBank:', error);
    }
  };

  const handleDeleteBank = async (): Promise<void> => {
    if (!selectedBank) return;
    
    try {
      const success = await deleteBank(selectedBank.id);
      if (success) {
        onDeleteClose();
      }
    } catch (error) {
      console.error('Error in handleDeleteBank:', error);
    }
  };

  const openEditModal = (bank: Bank): void => {
    setSelectedBank(bank);
    setFormData({
      bankName: bank.bankName,
      accountNumber: bank.accountNumber,
      routingNumber: bank.routingNumber
    });
    onEditOpen();
  };

  const toggleAccountVisibility = (bankId: string): void => {
    setShowAccountNumbers(prev => ({
      ...prev,
      [bankId]: !prev[bankId]
    }));
  };

  const maskAccountNumber = (accountNumber: string): string => {
    return `••••${accountNumber.slice(-4)}`;
  };

  const resetForm = (): void => {
    setFormData({ bankName: '', accountNumber: '', routingNumber: '' });
  };

  const filteredBanks = banks.filter(bank =>
    bank.bankName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      
      {/* Main Content - 60-30-10 Color Scheme Implementation */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header - 60% White/Light Gray, 30% Medium Gray, 10% Blue */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Bank Accounts</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your banking accounts</p>
              </div>
              <Button
                onPress={() => {
                  resetForm();
                  onAddOpen();
                }}
                className="bg-blue-600 text-white hover:bg-blue-700 font-medium w-full sm:w-auto shadow-sm"
                size="lg"
                startContent={<Plus size={16} />}
              >
                Add Bank
              </Button>
            </div>
          </div>

          {/* Search - White background (60%) */}
          <div className="mb-6 sm:mb-8">
            <Input
              placeholder="Search banks..."
              startContent={<Search size={16} className="text-gray-500" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md"
              size="lg"
              variant="bordered"
              classNames={{
                inputWrapper: "bg-white border-gray-300 hover:border-blue-400 focus-within:border-blue-600"
              }}
            />
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner size="lg" className="text-blue-600" />
            </div>
          ) : (
            <div className="w-full">
              {filteredBanks.length === 0 ? (
                /* Empty State - Following 60-30-10 rule */
                <div className="flex items-center justify-center min-h-[50vh]">
                  <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 size={32} className="text-gray-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      {searchTerm ? 'No banks found' : 'No bank accounts yet'}
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">
                      {searchTerm 
                        ? 'No banks match your search criteria. Try a different search term.' 
                        : 'Add your first bank account to start managing your finances.'
                      }
                    </p>
                    <Button
                      onPress={() => {
                        resetForm();
                        onAddOpen();
                      }}
                      className="bg-blue-600 text-white hover:bg-blue-700 font-medium w-full sm:w-auto shadow-sm"
                      size="lg"
                      startContent={<Plus size={16} />}
                    >
                      {searchTerm ? 'Add New Bank' : 'Add Your First Bank'}
                    </Button>
                  </div>
                </div>
              ) : (
                /* Banks Grid - White cards (60%), Gray text (30%), Blue accents (10%) */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredBanks.map((bank) => (
                    <Card 
                      key={bank.id} 
                      className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 h-fit"
                    >
                      <CardBody className="p-4 sm:p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4 sm:mb-6">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Building2 size={18} className="text-blue-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                                {bank.bankName}
                              </h3>
                            </div>
                          </div>
                          
                          <div className="flex gap-1 flex-shrink-0 ml-2">
                            <Button
                              isIconOnly
                              variant="light"
                              size="sm"
                              onPress={() => openEditModal(bank)}
                              className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 min-w-0 w-8 h-8 transition-colors"
                            >
                              <Edit2 size={14} />
                            </Button>
                            <Button
                              isIconOnly
                              variant="light"
                              size="sm"
                              onPress={() => {setSelectedBank(bank); onDeleteOpen();}}
                              className="text-gray-500 hover:text-red-600 hover:bg-red-50 min-w-0 w-8 h-8 transition-colors"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>

                        {/* Account Details */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm text-gray-600 font-medium">Account</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs sm:text-sm text-gray-900">
                                {showAccountNumbers[bank.id] ? bank.accountNumber : maskAccountNumber(bank.accountNumber)}
                              </span>
                              <Button
                                isIconOnly
                                variant="light"
                                size="sm"
                                onPress={() => toggleAccountVisibility(bank.id)}
                                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 min-w-0 w-6 h-6 transition-colors"
                              >
                                {showAccountNumbers[bank.id] ? <EyeOff size={12} /> : <Eye size={12} />}
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm text-gray-600 font-medium">Routing</span>
                            <span className="font-mono text-xs sm:text-sm text-gray-900">{bank.routingNumber}</span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                          <span className="text-xs text-gray-500">
                            Added {new Date(bank.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Add Bank Modal */}
          <Modal 
            isOpen={isAddOpen} 
            onClose={onAddClose} 
            size="lg" 
            classNames={{
              base: "bg-white mx-4 my-4 sm:mx-0 sm:my-0",
              backdrop: "bg-gray-900/50"
            }}
            scrollBehavior="inside"
          >
            <ModalContent>
              <ModalHeader className="pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Add Bank Account</h3>
              </ModalHeader>
              <ModalBody className="py-6 space-y-4">
                <Input
                  label="Bank Name"
                  placeholder="e.g., Chase Bank"
                  value={formData.bankName}
                  onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                  variant="bordered"
                  classNames={{
                    inputWrapper: "bg-gray-50 border-gray-300 hover:border-blue-400 focus-within:border-blue-600",
                    label: "text-gray-700 font-medium"
                  }}
                  isRequired
                />
                <Input
                  label="Account Number"
                  placeholder="Enter account number"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                  variant="bordered"
                  classNames={{
                    inputWrapper: "bg-gray-50 border-gray-300 hover:border-blue-400 focus-within:border-blue-600",
                    label: "text-gray-700 font-medium"
                  }}
                  isRequired
                />
                <Input
                  label="Routing Number"
                  placeholder="Enter routing number"
                  value={formData.routingNumber}
                  onChange={(e) => setFormData({...formData, routingNumber: e.target.value})}
                  variant="bordered"
                  classNames={{
                    inputWrapper: "bg-gray-50 border-gray-300 hover:border-blue-400 focus-within:border-blue-600",
                    label: "text-gray-700 font-medium"
                  }}
                  isRequired
                />
              </ModalBody>
              <ModalFooter className="pt-4 border-t border-gray-200 flex-col sm:flex-row gap-2">
                <Button 
                  variant="light" 
                  onPress={onAddClose} 
                  disabled={submitting} 
                  className="text-gray-600 hover:bg-gray-100 w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  onPress={handleAddBank}
                  className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto shadow-sm"
                  isLoading={submitting}
                  disabled={!formData.bankName || !formData.accountNumber || !formData.routingNumber}
                >
                  Add Bank
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Edit Bank Modal */}
          <Modal 
            isOpen={isEditOpen} 
            onClose={onEditClose} 
            size="lg" 
            classNames={{
              base: "bg-white mx-4 my-4 sm:mx-0 sm:my-0",
              backdrop: "bg-gray-900/50"
            }}
            scrollBehavior="inside"
          >
            <ModalContent>
              <ModalHeader className="pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Edit Bank Account</h3>
              </ModalHeader>
              <ModalBody className="py-6 space-y-4">
                <Input
                  label="Bank Name"
                  placeholder="e.g., Chase Bank"
                  value={formData.bankName}
                  onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                  variant="bordered"
                  classNames={{
                    inputWrapper: "bg-gray-50 border-gray-300 hover:border-blue-400 focus-within:border-blue-600",
                    label: "text-gray-700 font-medium"
                  }}
                  isRequired
                />
                <Input
                  label="Account Number"
                  placeholder="Enter account number"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                  variant="bordered"
                  classNames={{
                    inputWrapper: "bg-gray-50 border-gray-300 hover:border-blue-400 focus-within:border-blue-600",
                    label: "text-gray-700 font-medium"
                  }}
                  isRequired
                />
                <Input
                  label="Routing Number"
                  placeholder="Enter routing number"
                  value={formData.routingNumber}
                  onChange={(e) => setFormData({...formData, routingNumber: e.target.value})}
                  variant="bordered"
                  classNames={{
                    inputWrapper: "bg-gray-50 border-gray-300 hover:border-blue-400 focus-within:border-blue-600",
                    label: "text-gray-700 font-medium"
                  }}
                  isRequired
                />
              </ModalBody>
              <ModalFooter className="pt-4 border-t border-gray-200 flex-col sm:flex-row gap-2">
                <Button 
                  variant="light" 
                  onPress={onEditClose} 
                  disabled={submitting} 
                  className="text-gray-600 hover:bg-gray-100 w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  onPress={handleEditBank}
                  className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto shadow-sm"
                  isLoading={submitting}
                  disabled={!formData.bankName || !formData.accountNumber || !formData.routingNumber}
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Delete Modal */}
          <Modal 
            isOpen={isDeleteOpen} 
            onClose={onDeleteClose} 
            size="md" 
            classNames={{
              base: "bg-white mx-4 my-4 sm:mx-0 sm:my-0",
              backdrop: "bg-gray-900/50"
            }}
          >
            <ModalContent>
              <ModalHeader className="pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-red-600">Delete Bank Account</h3>
              </ModalHeader>
              <ModalBody className="py-6">
                <p className="text-gray-600">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">{selectedBank?.bankName}</span>? 
                  This action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter className="pt-4 border-t border-gray-200 flex-col sm:flex-row gap-2">
                <Button 
                  variant="light" 
                  onPress={onDeleteClose} 
                  disabled={submitting} 
                  className="text-gray-600 hover:bg-gray-100 w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  onPress={handleDeleteBank}
                  className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto shadow-sm"
                  isLoading={submitting}
                >
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default BankManagementPage;