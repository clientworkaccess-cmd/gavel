import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function DetailDrawer({ open, setOpen, data, type }) {

    if (!data) return null;

    const [width, setWidth] = useState(300);
    const isResizing = useRef(false);

    const startResizing = () => {
        isResizing.current = true;
    };

    const stopResizing = () => {
        isResizing.current = false;
    };

    const handleResizing = (e) => {
        if (!isResizing.current) return;

        const newWidth = window.innerWidth - e.clientX;

        if (newWidth > 300 && newWidth < 900) {
            setWidth(newWidth);
        }
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleResizing);
        window.addEventListener("mouseup", stopResizing);
        return () => {
            window.removeEventListener("mousemove", handleResizing);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [width]);

    // Reusable field renderer
    const DetailItem = ({ label, value }) => (
        <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-foreground">{label}</p>
            <div className="text-foreground/50 editor" dangerouslySetInnerHTML={{ __html: value || "—" }}></div>
        </div>
    );

    return (
        <Sheet open={open} onOpenChange={setOpen} >
            <SheetContent
                side="right"
                style={{ width: `${width}px` }}
                className="border-l border-foreground/60 overflow-y-auto min-h-screen select-none "
            >
                <SheetHeader className="border-b pb-3 mb-4 border-foreground/60">
                    <SheetTitle className="text-2xl font-semibold text-foreground tracking-tight">
                        {type === "company"
                            ? "Company Details"
                            : type === "position"
                                ? "Position Details"
                                : "User Details"}
                    </SheetTitle>
                </SheetHeader>

                <div className="relative h-full px-1 group">
                    <div className="fixed z-10 h-20 w-[5px] top-60 bg-foreground/60 rounded-full cursor-ew-resize hidden group-hover:block" onMouseDown={startResizing} onMouseUp={stopResizing} />
                    <div className="space-y-5 px-4 pb-8">
                        {/* COMPANY DETAILS */}
                        {type === "company" && (
                            <>
                                <DetailItem label="Name" value={data.name} />
                                <DetailItem label="Industry" value={data.industry} />
                                <DetailItem label="Website" value={data.website} />
                                <DetailItem label="Address" value={data.address} />

                                {data?.members?.length > 0 && (
                                    <>
                                        <div className="text-sm font-medium text-foreground">Members</div>
                                        <div className="overflow-hidden border border-foreground/60 rounded-lg">
                                            <Table className="min-w-full text-sm">
                                                <TableHeader className="">
                                                    <TableRow>
                                                        <TableHead className="py-2 px-3 text-left font-semibold">Name</TableHead>
                                                        <TableHead className="py-2 px-3 text-left font-semibold">Role</TableHead>
                                                    </TableRow>
                                                </TableHeader>


                                                <TableBody>
                                                    {data.members.map((member) => (
                                                        <TableRow
                                                            key={member._id}
                                                            className="border-t transition-colors"
                                                        >
                                                            <TableCell className="py-2 px-3">{member.name}</TableCell>
                                                            <TableCell className="py-2 px-3 text-foreground/40">{member.role}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </>
                                )}
                                {data?.positions?.length > 0 && (
                                    <>
                                        <div className="text-sm font-medium text-foreground">Positions</div>
                                        <div className="overflow-hidden border border-foreground/60 rounded-lg">
                                            <Table className="min-w-full text-sm">
                                                <TableHeader className="">
                                                    <TableRow>
                                                        <TableHead className="py-2 px-3 text-left font-semibold">Name</TableHead>
                                                        <TableHead className="py-2 px-3 text-left font-semibold">Status</TableHead>
                                                    </TableRow>
                                                </TableHeader>

                                                <TableBody>
                                                    {data.positions.map((position) => (
                                                        <TableRow
                                                            key={position._id}
                                                            className="border-t transition-colors"
                                                        >
                                                            <TableCell className="py-2 px-3">{position.name}</TableCell>
                                                            <TableCell className="py-2 px-3 text-foreground/40">{position.status}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                        {/* POSITION DETAILS */}
                        {type === "position" && (
                            <>
                                <DetailItem label="Job Title" value={data.name} />
                                <DetailItem
                                    label="JobDescription"
                                    value={data.positionDescription}
                                />
                                <DetailItem label="Category" value={data.category} />
                                <DetailItem label="Status" value={data.status} />
                                <DetailItem label="Red Flag" value={data.redFlag} />
                                {data?.company && <DetailItem label="Company Name" value={data.company.name} />}
                                {data.interview.length > 0 &&
                                    <>
                                        <div className="text-sm font-medium text-foreground/50 mb-3">Interviews</div>
                                        <div className="overflow-hidden border border-foreground/60 rounded-lg">
                                            <Table className="min-w-full text-sm">
                                                <TableHeader className="">
                                                    <TableRow>
                                                        <TableHead className="py-2 px-3 text-left font-semibold">Candidate</TableHead>
                                                        <TableHead className="py-2 px-3 text-left font-semibold">Review Status</TableHead>
                                                    </TableRow>
                                                </TableHeader>


                                                <TableBody>
                                                    {data.interview.map((interview) => (
                                                        <TableRow
                                                            key={interview._id}
                                                            className="border-t transition-colors"
                                                        >
                                                            <TableCell className="py-2 px-3 text-foreground/50">{interview.candidate}</TableCell>
                                                            <TableCell className="py-2 px-3 text-foreground/50">{interview.reviewStatus}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </>
                                }
                            </>
                        )}

                        {/* USER DETAILS */}
                        {type === "user" && (
                            <>
                                <DetailItem label="Name" value={data.name} />
                                <DetailItem label="Email" value={data.email} />
                                <DetailItem label="Phone Number" value={data.phoneNumber} />
                                <DetailItem label="Role" value={data.role} />
                                {data?.company?.length > 0 && (
                                    <DetailItem label="Company" value={data.company[0].name} />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
