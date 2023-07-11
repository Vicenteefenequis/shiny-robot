export const categoryResponse = {
  data: [
    {
      id: "7e924ac9-5818-4d85-8e17-84b750d4a061",
      name: "Plum",
      description: "Ratione repellat harum illum qui optio quaerat.",
      is_active: true,
      deleted_at: null,
      created_at: "2023-07-11T17:43:25+0000",
      updated_at: "2023-07-11T17:43:25+0000",
    },
  ],
  links: {
    first: "http://localhost:8000/api/categories?page=1",
    last: "http://localhost:8000/api/categories?page=7",
    prev: null,
    next: "http://localhost:8000/api/categories?page=2",
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 7,
    path: "http://localhost:8000/api/categories",
    per_page: 15,
    to: 15,
    total: 100,
  },
};

export const categoryResponsePage2 = {
  data: [
    {
      id: "7e924ac9-5818-4d85-8e17-84b750d4a061",
      name: "SeaGreen",
      description: "Ratione repellat harum illum qui optio quaerat.",
      is_active: true,
      deleted_at: null,
      created_at: "2023-07-11T17:43:25+0000",
      updated_at: "2023-07-11T17:43:25+0000",
    },
  ],
  links: {
    first: "http://localhost:8000/api/categories?page=1",
    last: "http://localhost:8000/api/categories?page=7",
    prev: "http://localhost:8000/api/categories?page=1",
    next: "http://localhost:8000/api/categories?page=3",
  },
  meta: {
    current_page: 2,
    from: 1,
    last_page: 7,
    path: "http://localhost:8000/api/categories",
    per_page: 15,
    to: 15,
    total: 100,
  },
};
