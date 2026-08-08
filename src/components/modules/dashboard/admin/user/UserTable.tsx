"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    MoreHorizontal,
    Ban,
    Unlock,
    UserCircle,
    Search,
    Filter,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminUser } from "@/types/admin.type";
import { format } from "date-fns";
import { adminService } from "@/services/admin.service";
import { toast } from "sonner";

interface UserTableProps {
    users: AdminUser[];
    token: string;
}

export function UserTable({ users, token }: UserTableProps) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                !searchQuery ||
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesRole =
                roleFilter === "ALL" || user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [users, searchQuery, roleFilter]);

    const handleToggleBan = async (user: AdminUser) => {
        setLoadingId(user.id);
        const { error } = user.isBanned
            ? await adminService.unbanUser(token, user.id)
            : await adminService.banUser(token, user.id);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success(user.isBanned ? "User unbanned successfully" : "User banned successfully");
            router.refresh();
        }
        setLoadingId(null);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border-3 border-black dark:border-zinc-300 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d]">
                <div className="relative w-full md:max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black dark:text-white stroke-[2.5]" />
                    <Input
                        placeholder="Search by name or email..."
                        className="pl-9 rounded-lg border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Filter className="h-4 w-4 text-black dark:text-white stroke-[2.5]" />
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-40 rounded-lg border-2 border-black font-bold text-xs bg-zinc-50 dark:bg-zinc-950 shadow-[2px_2px_0px_0px_#000]">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_#000]" position="popper">
                            <SelectItem value="ALL" className="font-bold text-xs uppercase cursor-pointer">ALL USERS</SelectItem>
                            <SelectItem value="USER" className="font-bold text-xs uppercase cursor-pointer">USER</SelectItem>
                            <SelectItem value="ADMIN" className="font-bold text-xs uppercase cursor-pointer">ADMIN</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-2xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d] overflow-hidden">
                <Table>
                    <TableHeader className="bg-[#FFFDF5] dark:bg-zinc-950 border-b-2 border-black">
                        <TableRow className="border-b-2 border-black">
                            <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">USER</TableHead>
                            <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">ROLE</TableHead>
                            <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">STATUS</TableHead>
                            <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white">JOINED</TableHead>
                            <TableHead className="font-clash font-black uppercase text-xs text-black dark:text-white text-right">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y-2 divide-black/10 dark:divide-zinc-800">
                        {filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center font-bold text-xs text-zinc-500">
                                    {searchQuery || roleFilter !== "ALL"
                                        ? "NO USERS MATCHING YOUR FILTERS"
                                        : "NO USERS FOUND"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user.id} className="hover:bg-[#00f0ff]/10 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                                                <AvatarImage src={user.image || ""} />
                                                <AvatarFallback className="bg-[#00f0ff] text-black font-black text-xs">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-black text-xs uppercase text-black dark:text-white">{user.name}</span>
                                                <span className="text-[11px] font-mono font-bold text-zinc-500">{user.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-[#00f0ff] text-black border-2 border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000]">
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {user.isBanned ? (
                                            <Badge className="bg-[#ff597b] text-black border-2 border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000] flex w-fit items-center gap-1">
                                                <Ban className="h-3 w-3 stroke-[2.5]" /> BANNED
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-[#b5ff6d] text-black border-2 border-black font-mono font-black text-[10px] uppercase shadow-[1px_1px_0px_0px_#000] flex w-fit items-center gap-1">
                                                ACTIVE ★
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400">
                                        {format(new Date(user.createdAt), "dd MMM, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 border-2 border-black rounded-lg shadow-[1px_1px_0px_0px_#000] cursor-pointer" disabled={loadingId === user.id}>
                                                    <MoreHorizontal className="h-4 w-4 stroke-[2.5]" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-xl shadow-[4px_4px_0px_0px_#000]">
                                                <DropdownMenuItem
                                                    onClick={() => handleToggleBan(user)}
                                                    className={`font-black uppercase text-xs cursor-pointer ${user.isBanned ? "text-green-600" : "text-red-600"}`}
                                                >
                                                    {user.isBanned ? (
                                                        <>
                                                            <Unlock className="mr-2 h-4 w-4 stroke-[2.5]" /> UNBAN USER ★
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Ban className="mr-2 h-4 w-4 stroke-[2.5]" /> BAN USER
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
