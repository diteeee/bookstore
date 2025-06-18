import handler from "../pages/api/news";
import { createNews, getNews } from "@/api/services/News";

jest.mock("@/api/services/News");

function createMockResponse() {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe("/api/news handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("POST - creates a news item", async () => {
    const mockNews = { title: "Breaking News", content: "Some content" };
    (createNews as jest.Mock).mockResolvedValue(mockNews);

    const req = {
      method: "POST",
      body: mockNews,
    } as any;

    const res = createMockResponse();

    await handler(req, res);

    expect(createNews).toHaveBeenCalledWith(mockNews);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockNews);
  });

  it("GET - returns news list", async () => {
    const mockNewsList = [{ title: "News1", content: "Content1" }];
    (getNews as jest.Mock).mockResolvedValue(mockNewsList);

    const req = {
      method: "GET",
    } as any;

    const res = createMockResponse();

    await handler(req, res);

    expect(getNews).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockNewsList);
  });

  it("unsupported method returns 405", async () => {
    const req = { method: "PUT" } as any;
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({
      message: "Metoda e kerkeses nuk eshte e mbeshtetur",
    });
  });
});