jest.mock("mongodb", () => {
  return {
    MongoClient: jest.fn().mockImplementation(() => ({
      connect: jest.fn().mockResolvedValue(true),
      db: jest.fn().mockReturnThis(),
      collection: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue([]) }),
      insertOne: jest.fn().mockResolvedValue({ insertedId: "mockId" }),
      close: jest.fn().mockResolvedValue(true),
    })),
  };
});

import handler from "../pages/api/blogs"; // adjust path if needed
import { createBlog, getBlogs } from "@/api/services/Blog";

jest.mock("@/api/services/Blog");

describe("API /api/blog handler", () => {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));

  const mockRes = {
    status,
    json,
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle POST requests", async () => {
    const mockReq = {
      method: "POST",
      body: { title: "Test blog", cover: "some-image.jpg" }, // added 'cover' here
    } as any;

    (createBlog as jest.Mock).mockResolvedValue({ id: 1, title: "Test blog", cover: "some-image.jpg" });

    await handler(mockReq, mockRes);

    expect(createBlog).toHaveBeenCalledWith({ title: "Test blog", cover: "some-image.jpg" });
    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({ id: 1, title: "Test blog", cover: "some-image.jpg" });
  });

  it("should handle GET requests", async () => {
    const mockReq = {
      method: "GET",
    } as any;

    (getBlogs as jest.Mock).mockResolvedValue([
      { id: 1, title: "Blog 1" },
      { id: 2, title: "Blog 2" },
    ]);

    await handler(mockReq, mockRes);

    expect(getBlogs).toHaveBeenCalled();
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith([
      { id: 1, title: "Blog 1" },
      { id: 2, title: "Blog 2" },
    ]);
  });

  it("should return 405 for unsupported method", async () => {
    const mockReq = {
      method: "PUT",
    } as any;

    await handler(mockReq, mockRes);

    expect(status).toHaveBeenCalledWith(405);
    expect(json).toHaveBeenCalledWith({
      message: "Method not supported",  // fixed expected message here
    });
  });

  it("should handle errors gracefully", async () => {
    const mockReq = {
      method: "POST",
      body: { title: "Fail blog", cover: "some-image.jpg" }, // added 'cover' here
    } as any;

    (createBlog as jest.Mock).mockRejectedValue(new Error("fail"));

    await handler(mockReq, mockRes);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith(expect.objectContaining({
      message: "Failed to create blog",
      error: expect.any(Error),
    }));
  });
});
