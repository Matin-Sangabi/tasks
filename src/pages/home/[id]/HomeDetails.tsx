// pages/UserSinglePage.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { userDetails } from "@/service/users.service";

export default function UserSinglePage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => userDetails(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto mt-10 space-y-4">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error on get user details
      </div>
    );
  }

  const user = data.data;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.first_name[0]}
              {user.last_name[0]}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-xl font-bold">
            {user.first_name} {user.last_name}
          </h2>
        </CardHeader>

        <CardContent className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">Email :  {user.email}</p>
          <p className="text-xs text-muted-foreground">ID: {user.id}</p>
        </CardContent>
      </Card>
    </div>
  );
}
