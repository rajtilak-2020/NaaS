const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var client = std.http.Client{ .allocator = allocator };
    defer client.deinit();

    const uri = try std.Uri.parse("https://no.krajtilak.in/api/no");
    var req = try client.open(.GET, uri, .{});
    defer req.deinit();

    try req.send();
    try req.wait();

    var buf: [2048]u8 = undefined;
    const read = try req.readAll(&buf);
    std.debug.print("Response: {s}\n", .{buf[0..read]});
}