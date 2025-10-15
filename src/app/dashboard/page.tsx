// app/dashboard/layout.tsx

import TopBar from '@/components/Topbar';

export default function DashboardLayout() {
  return (
    <div>
      <TopBar />
      <main className="p-6">I'm Dashbaord. </main>
    </div>
  );
}
