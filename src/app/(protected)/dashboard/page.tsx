"use client";

import { useAuthStore } from "@/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <main className="p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <section aria-label="User information" className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Name: <span className="font-medium text-foreground">{user?.firstName} {user?.lastName}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Email: <span className="font-medium text-foreground">{user?.email}</span>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
