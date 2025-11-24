import { useEffect, useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Columns,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getReq, deletReq } from "../../axios/axios";
import API_ENDPOINTS from "../../config/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Modal from "@/components/common/Modal";
import DetailDrawer from "@/components/common/DetailDrawer";

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const Position = () => {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);

  // ✅ Pagination state
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // ✅ Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const positions = await getReq(API_ENDPOINTS.POSITION);
      setData(positions || []);
    } catch (err) {
      console.error("Error fetching positions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showAdd, showEdit]);

  // ✅ Columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => row.original.name,
      },
      {
        accessorKey: "positionDescription",
        header: "Description",
        cell: ({ row }) => row.original.positionDescription.slice(0,50)+"..." || "—",
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => row.original.category || "—",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => row.original.status || "—",
      },
      {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => row.original?.company?.name || "—",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => openEdit(row.original)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setDeleteId(row.original._id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => openView(row.original)}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // ✅ React Table setup (now stable)
  const table = useReactTable({
    data,
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
    pageCount: Math.ceil(data.length / pageSize) || 1,
  });

  // ✅ Handlers
  const openEdit = (item) => {
    setEditData(item);
    setShowEdit(true);
  };

  const openView = (item) => {
    setViewData(item);
    setShowView(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deletReq(`${API_ENDPOINTS.POSITION}/${deleteId}`);
    setDeleteId(null);
    fetchData();
  };

  const totalPages = table.getPageCount();

  return (
    <div className="flex-1 p-4 sm:p-6 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="border rounded-2xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Position Management</h2>
            <p className="text-sm text-foreground/50">
              Manage position — add, edit, or view records.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-between">
            <div className="relative max-lg:w-full w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-foreground/50" />
              <Input
                placeholder="Search position..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-8 border-foreground/60"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
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

            <Button variant="secondary" onClick={() => setShowAdd(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-foreground text-center font-extrabold"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-6">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-6 text-foreground/50"
                  >
                    No records found.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="text-center">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
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

            <span className="text-sm text-gray-700">
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

      {/* Add/Edit/View/Delete Modals */}
      <Modal type="add" show={showAdd} setShow={setShowAdd} variant="position" />
      <Modal type="edit" show={showEdit} setShow={setShowEdit} data={editData} variant="position" />
      <DetailDrawer type="position" open={showView} setOpen={setShowView} data={viewData} />

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this position?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Position;
