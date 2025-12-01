/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Columns,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* === API imports === */
import { getReq, deletReq } from "../../axios/axios";
import API_ENDPOINTS from "../../config/api";

/* === ShadCN UI Components === */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

/* === TanStack Table === */
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import Modal from "@/components/common/Modal";
import DetailDrawer from "@/components/common/DetailDrawer";

/* ============================= */

const PAGE_SIZE_OPTIONS = [5, 10, 20];

const Data = () => {
  const pathname = useLocation().pathname;
  const entity = pathname.split("/")[2] || "items";

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // dialogs
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // editing / viewing
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);

  // table state
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0)

  // form
  const { reset } = useForm();

  /* ----------------------- fetch data ----------------------- */
  const fetchData = async () => {
    setLoading(true);
    let res;
    if (pathname === "/admin/candidates") {
      res = await getReq(API_ENDPOINTS.CANDIDATES);
      setRows(res?.candidates || []);
    } else if (pathname === "/admin/admins") {
      res = await getReq(API_ENDPOINTS.ADMINS);
      setRows(res?.admins || []);
    } else {
      res = await getReq(API_ENDPOINTS.CLIENTS);
      setRows(res?.clients || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    setGlobalFilter("");
  }, [pathname, addOpen, editOpen]);

  const handleDelete = async () => {
    await deletReq(`${API_ENDPOINTS.USERS}/${deleteId}`);
    setDeleteId(null);
    fetchData();
  };

  /* ----------------------- columns ----------------------- */
  const columns = useMemo(() => {
    const base = [
      { accessorKey: "_id", header: "ID", cell: (info) => info.getValue() },
      { accessorKey: "name", header: "Name", cell: (info) => info.getValue() || "—" },
      { accessorKey: "email", header: "Email", cell: (info) => info.getValue() || "—" },
      { accessorKey: "phoneNumber", header: "Phone", cell: (info) => info.getValue() || "—" },
    ];

    if (pathname !== "/admin/candidate" || pathname !== "/admin/admins") {
      base.push({
        accessorKey: "company",
        header: "Company",
        cell: (info) => {
          const v = info.row.original.company;
          if (!v) return "—";
          if (Array.isArray(v)) return v[0]?.name || "—";
          return v?.name || v || "—";
        },
      });
    }

    base.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex justify-center gap-2">
            <Button size="icon" variant="outline" onClick={() => { setViewData(item); setViewOpen(true); }}>
              <Eye className="w-4 h-4" />
            </Button>
            {pathname !== "/admin/candidates" && (
              <Button size="icon" variant="outline" onClick={() => { setEditData(item); setEditOpen(true); }}>
                <Edit className="w-4 h-4" />
              </Button>
            )}
            <Button size="icon" variant="destructive" onClick={() => setDeleteId(item._id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    });

    return base;
  }, [pathname, reset]);

  /* ----------------------- table instance ----------------------- */
  const table = useReactTable({
    data: rows,
    columns,
    state: {
      globalFilter,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPagination = updater({ pageIndex, pageSize });
        setPageIndex(newPagination.pageIndex);
        setPageSize(newPagination.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    pageCount: Math.ceil(rows.length / pageSize) || 1,
  });

  const totalPages = table.getPageCount();
  /* ----------------------- render ----------------------- */
  return (
    <div className="p-6 ">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="border rounded-2xl shadow-sm p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-semibold capitalize">{entity} Management</h2>
            <p className="text-sm text-foreground/50">Manage {entity} — add, edit, view, or delete records.</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-between">
            <div className="relative max-lg:w-full w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-foreground/50" />
              <Input
                placeholder={`Search ${entity}...`}
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8 border-foreground/60"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild className="">
                <Button variant="outline" className="flex items-center gap-2 border-foreground/60 bg-transparent">
                  <Columns className="w-4 h-4" /> Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table.getAllLeafColumns().map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={col.getIsVisible()}
                    onCheckedChange={(v) => col.toggleVisibility(!!v)}
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {pathname !== "/admin/candidates" && (
              <Button onClick={() => { reset(); setAddOpen(true); }} variant="secondary">
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            )}
          </div>
        </div>

        <Separator className="my-3" />

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead key={header.id} className="text-foreground text-center font-extrabold">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-6">Loading...</TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-6 text-foreground/50">No records found.</TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="text-center">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-between items-center mt-4 gap-3">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Prev
            </Button>

            <span className="text-sm text-foreground/60">
              Page <Badge variant="outline">{Number(pageIndex) + 1}</Badge> of <Badge variant="outline">{totalPages}</Badge>
            </span>

            <Button
              size="sm"
              variant="outline"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span>Rows per page:</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => {
                const newSize = Number(v);
                setPageSize(newSize);
                table.setPageSize(newSize);
                setPageIndex(0);
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={String(opt)}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ========================= MODALS ========================= */}

      {/* Add Modal */}
      <Modal type="add" show={addOpen} setShow={setAddOpen} variant="user" entity={entity}/>

      {/* Edit Modal */}
      <Modal type="edit" show={editOpen} setShow={setEditOpen} variant="user" data={editData} />

      {/* View Modal */}
      <DetailDrawer type="user" open={viewOpen} setOpen={setViewOpen} data={viewData} />

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this record?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Data;
