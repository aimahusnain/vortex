// app/dashboard/layout.tsx

import TopBar from '@/components/Topbar';

export default function DashboardLayout() {
  return (
    <div>
      <TopBar />
      <main className="p-6">I&apos;m Dashbaord.</main>
    </div>
  );
}
