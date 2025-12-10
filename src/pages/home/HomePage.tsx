"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usersLists } from "@/service/users.service";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import DeleteModal from "@/components/custom/DeleteModal";
import UpdateModal from "@/components/custom/UpdateModal";

interface OpenModal {
  itemName: string;
  itemId: string;
  open: boolean;
}

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState<OpenModal | null>(
    null
  );
  const [openEditModal, setOpenEditModal] = useState<OpenModal | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: () => usersLists(page),
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      )}

      {/* Cards */}
      {!isLoading && data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.data.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.first_name[0]}
                      {user.last_name[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-semibold">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  User ID: {user.id}
                </span>

                <div className="flex gap-2">
                  {/* View */}
                  <Button size="icon" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>

                  {/* Edit */}
                  <Button
                    onClick={() => {
                      setOpenEditModal({
                        itemId: user?.id?.toString(),
                        itemName: user?.first_name + " " + user?.last_name,
                        open: true,
                      });
                    }}
                    size="icon"
                    variant="secondary"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  {/* Delete */}
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => {
                      setOpenDeleteModal({
                        itemId: user?.id?.toString(),
                        itemName: user?.first_name + " " + user?.last_name,
                        open: true,
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: data.total_pages }).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={page === pageNumber}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < data.total_pages) setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      <DeleteModal
        open={!!openDeleteModal?.open}
        itemId={openDeleteModal?.itemId}
        itemName={openDeleteModal?.itemName}
        onClose={() => setOpenDeleteModal(null)}
      />
      <UpdateModal
        open={!!openEditModal?.open}
        itemId={openEditModal?.itemId}
        itemName={openEditModal?.itemName}
        onClose={() => setOpenEditModal(null)}
      />
    </div>
  );
}
