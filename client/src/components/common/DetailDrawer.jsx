import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function DetailDrawer({ open, setOpen, data, type }) {

    if (!data) return null;

    // Reusable field renderer
    const DetailItem = ({ label, value }) => (
        <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">{label}</span>
            <span className="text-gray-900">{value || "—"}</span>
        </div>
    );

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent
                side="right"
                className="w-[340px] sm:w-[600px] bg-white border-l border-gray-200 shadow-xl overflow-y-auto min-h-screen"
            >
                <SheetHeader className="border-b pb-3 mb-4">
                    <SheetTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
                        {type === "company"
                            ? "Company Details"
                            : type === "position"
                                ? "Position Details"
                                : "User Details"}
                    </SheetTitle>
                </SheetHeader>

                {/* Content */}
                <div className="space-y-5 px-5 pb-8">
                    {/* COMPANY DETAILS */}
                    {type === "company" && (
                        <>
                            <DetailItem label="Name" value={data.name} />
                            <DetailItem label="Industry" value={data.industry} />
                            <DetailItem label="Website" value={data.website} />
                            <DetailItem label="Address" value={data.address} />

                            {data?.members?.length > 0 && (
                                <>
                                    <div className="text-sm font-medium text-gray-500">Members</div>
                                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                                        <Table className="min-w-full text-sm">
                                            <TableHeader className="bg-gray-50">
                                                <TableRow>
                                                    <TableHead className="py-2 px-3 text-left font-semibold">Name</TableHead>
                                                    <TableHead className="py-2 px-3 text-left font-semibold">Role</TableHead>
                                                </TableRow>
                                            </TableHeader>


                                            <TableBody>
                                                {data.members.map((member) => (
                                                    <TableRow
                                                        key={member._id}
                                                        className="border-t hover:bg-gray-50 transition-colors"
                                                    >
                                                        <TableCell className="py-2 px-3">{member.name}</TableCell>
                                                        <TableCell className="py-2 px-3 text-gray-700">{member.role}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </>
                            )}
                            {data?.positions?.length > 0 && (
                                <>
                                <div className="text-sm font-medium text-gray-500">Positions</div>
                                <div className="overflow-hidden border border-gray-200 rounded-lg">
                                    <Table className="min-w-full text-sm">
                                        <TableHeader className="bg-gray-50">
                                            <TableRow>
                                                <TableHead className="py-2 px-3 text-left font-semibold">Name</TableHead>
                                                <TableHead className="py-2 px-3 text-left font-semibold">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {data.positions.map((position) => (
                                                <TableRow
                                                    key={position._id}
                                                    className="border-t hover:bg-gray-50 transition-colors"
                                                >
                                                    <TableCell className="py-2 px-3">{position.name}</TableCell>
                                                    <TableCell className="py-2 px-3 text-gray-700">{position.status}</TableCell>
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
                            <DetailItem label="Name" value={data.name} />
                            <DetailItem
                                label="Description"
                                value={data.positionDescription}
                            />
                            <DetailItem label="Category" value={data.category} />
                            <DetailItem label="Status" value={data.status} />
                            <DetailItem label="Red Flag" value={data.redFlag} />
                            {data?.company && <DetailItem label="Company Name" value={data.company.name} />}
                            {data.interview.length > 0 &&
                                <>
                                    <div className="text-sm font-medium text-gray-500 mb-3">Interviews</div>
                                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                                        <Table className="min-w-full text-sm">
                                            <TableHeader className="bg-gray-50">
                                                <TableRow>
                                                    <TableHead className="py-2 px-3 text-left font-semibold">InterviewId</TableHead>
                                                    <TableHead className="py-2 px-3 text-left font-semibold">Name</TableHead>
                                                    <TableHead className="py-2 px-3 text-left font-semibold">Review Status</TableHead>
                                                </TableRow>
                                            </TableHeader>


                                            <TableBody>
                                                {data.interview.map((interview) => (
                                                    <TableRow
                                                        key={interview._id}
                                                        className="border-t hover:bg-gray-50 transition-colors"
                                                    >
                                                        <TableCell className="py-2 px-3">{interview.interviewID}</TableCell>
                                                        <TableCell className="py-2 px-3 text-gray-700">{interview.name}</TableCell>
                                                        <TableCell className="py-2 px-3 text-gray-700">{interview.reviewStatus}</TableCell>
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
            </SheetContent>
        </Sheet>
    );
}
