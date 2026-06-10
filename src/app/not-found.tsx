import Link from "next/link";
import { SearchX, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <h1 className="flex items-center gap-2 text-xl font-semibold">
              <SearchX size={20} />404 — Page not found
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The page you are looking for does not exist.
          </p>
          <Button asChild className="w-full">
            <Link href="/dashboard"><Home size={15} />Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
